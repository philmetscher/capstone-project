import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCategoriesStore, useListItemsStore } from "../../useStore";

// Components
import Header from "../../components/Header";
import {
  FormMain,
  StyledForm,
  Input,
  Select,
} from "../../components/FormComponents";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../../components/Button";
import { IconChevronLeft, IconChevronRight } from "../../components/Icons";
import { nanoid } from "nanoid";

export default function EditEntry() {
  const router = useRouter();
  const { id } = router.query;

  const startsWith = new RegExp("^[0-9a-zA-Z]");

  //######################
  //GET THINGS FROM STORE
  //######################
  const categories = useCategoriesStore((state) => state.categories);
  const listItems = useListItemsStore((state) => state.listItems);

  const addCategory = useCategoriesStore((state) => state.addCategory);
  const editListItem = useListItemsStore((state) => state.editListItem);

  //######################
  //GET CURRENT LIST ITEM
  //GET LIST ITEM CATEGORY
  //######################
  let listItem = {};
  if (listItems) listItem = listItems.find((listItem) => listItem.id == id);

  let listItemCategory = {};
  if (listItem)
    listItemCategory = categories.find(
      (category) => category.id === listItem.categoryId
    );

  //######################
  //SOME STATES
  //######################
  //variable to check if user has pressed enter on input field
  const [pressedEnter, setPressedEnter] = useState(false);
  //variable to check if input-field with new category has value
  const [categoriesSelectionAvailable, setCategoriesSelectionAvailable] =
    useState(true);
  //variable to validate the "list item name" input field (not empty)
  const [submitButtonReady, setSubmitButtonReady] = useState(true);
  //variable to check if the new category exists in the already existing categories
  const [categoryExistsInCategories, setCategoryExistsInCategories] =
    useState(false);

  //######################
  //HANDLING FUNCTIONS
  //######################
  function handleGoBack(event) {
    event.preventDefault();
    if (!pressedEnter) {
      router.push(`/`);
    } else {
      setPressedEnter(false);
    }
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case "Enter": //check if user has not pressed enter on input field (for mobile check purposes "Go" or "Enter")
        setPressedEnter(true);
        break;
      case "Backspace": //check if user has pressed backspace on input field (onChange won't work on backspace)
        if (event.target.name === "newCategory") {
          handleCategoryInput(event);
        } else if (event.target.name === "itemName") {
          handleListItemInput(event);
        }
        break;
    }
  }

  function handleListItemInput(event) {
    checkListItemInput();

    function checkListItemInput() {
      if (!event.target.value.startsWith(" ")) {
        setSubmitButtonReady(true);
      } else {
        const value = event.target.value.substring(
          1,
          event.target.value.length
        );
        event.target.value = value;
        checkListItemInput();
        setSubmitButtonReady(false);
      }
    }
  }

  function handleCategoryInput(event) {
    checkCategoryInput();

    function checkCategoryInput() {
      if (!event.target.value.startsWith(" ")) {
        setCategoriesSelectionAvailable(false);

        if (categoryInCategories(event.target.value)) {
          setCategoryExistsInCategories(true);
        } else {
          setCategoryExistsInCategories(false);
        }
      } else {
        const value = event.target.value.substring(
          1,
          event.target.value.length
        );
        event.target.value = value;
        checkCategoryInput();
        setCategoryExistsInCategories(false);
        setCategoriesSelectionAvailable(true);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let id = listItem.id,
      name = listItem.name,
      categoryId = listItem.categoryId,
      somethingChanged = false;

    if (!pressedEnter) {
      if (name !== data.itemName) {
        name = data.itemName;
        somethingChanged = true;
      }
      if (data.newCategory) {
        const newCategoryId = nanoid();

        addCategory(newCategoryId, data.newCategory);
        categoryId = newCategoryId;

        somethingChanged = true;
      } else if (categoryId !== data.itemCategory) {
        categoryId = data.itemCategory;

        somethingChanged = true;
      }

      //check if something has changed. if so redirect to list
      if (somethingChanged) {
        editListItem(id, name, categoryId);
        router.push(`/`);
      }
    } else {
      setPressedEnter(false);
    }
  }

  //######################
  //HELPER FUNCTIONS
  //######################
  const categoryInCategories = (newCategoryName) =>
    categories.find((category) => category.name === newCategoryName);

  if (!categories || !listItem) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Bearbeite list-item</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Bearbeiten</Header>
      <FormMain>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="itemName"
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={(event) => handleListItemInput(event)}
            handleKeyPress={(event) => handleKeyPress(event)}
            value={listItem.name}
          >
            Name...
          </Input>
          {listItemCategory && (
            <Select
              name="itemCategory"
              labelText="Kategorie auswählen"
              inputIcon="chevronDown"
              options={[
                listItemCategory,
                ...categories.filter(
                  (category) => category.id !== listItem.categoryId
                ),
              ]}
              disabled={!categoriesSelectionAvailable}
            />
          )}
          <Input
            name="newCategory"
            labelText="oder neue Kateg. erstellen"
            inputIcon="plus"
            iconBefore={false}
            handleChange={(event) => handleCategoryInput(event)}
            handleKeyPress={(event) => handleKeyPress(event)}
            error={categoryExistsInCategories}
          >
            Kategorie-Name...
          </Input>
          <ButtonGroup>
            <ButtonIcon
              aria-label={"zurück"}
              onClick={(event) => handleGoBack(event)}
            >
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall
              isPrimary
              disabled={!submitButtonReady || categoryExistsInCategories}
              onClick={() => {
                return submitButtonReady && categoryExistsInCategories;
              }}
            >
              speichern
              <IconChevronRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
