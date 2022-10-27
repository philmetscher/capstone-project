import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCategoriesStore, useListItemsStore } from "../../useStore";
import { nanoid } from "nanoid";

// Components
import Header from "../../components/Header";
import {
  FormMain,
  StyledForm,
  Input,
  Select,
} from "../../components/FormComponents";
import ModalDeleteBox from "../../components/ModalDeleteBox";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../../components/Button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDelete,
} from "../../components/Icons";

export default function EditEntry() {
  const router = useRouter();
  const { id } = router.query;

  //######################
  //GET THINGS FROM STORE
  //######################
  const categories = useCategoriesStore((state) => state.categories);
  const listItems = useListItemsStore((state) => state.listItems);

  const addCategory = useCategoriesStore((state) => state.addCategory);
  const editListItem = useListItemsStore((state) => state.editListItem);
  const deleteListItem = useListItemsStore((state) => state.deleteListItem);

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
  //variable to check if the "list item name" exists in the already existing "list item names"
  const [listItemExistsInListItems, setListItemExistsInListItems] =
    useState(false);
  //variable to check if Modal Box for deletion is open
  const [deleteModalBoxOpen, setDeleteModalBoxOpen] = useState(false);

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
        checkHandling(event);
        break;
    }

    function checkHandling(event) {
      if (event.target.name === "newCategory") {
        handleCategoryInput(event);
      } else if (event.target.name === "itemName") {
        handleListItemInput(event);
      }
    }
  }

  function handleListItemInput(event) {
    checkListItemInput();

    function checkListItemInput() {
      let value = event.target.value;

      if (!value.startsWith(" ") && value.length > 0) {
        const inListItems = listItemInListItems(value);

        setListItemExistsInListItems(inListItems);
        setSubmitButtonReady(!inListItems);
      } else if (value.length > 0) {
        value = value.trim();
        event.target.value = value;
        checkListItemInput();
      } else {
        setSubmitButtonReady(false);
        setListItemExistsInListItems(false);
      }
    }
  }

  function handleCategoryInput(event) {
    checkCategoryInput();

    function checkCategoryInput() {
      let value = event.target.value;

      if (!value.startsWith(" ") && value.length > 0) {
        const inCategories = categoryInCategories(value);

        setCategoriesSelectionAvailable(false);
        setCategoryExistsInCategories(inCategories);
      } else if (value.length > 0) {
        value = value.trim();
        event.target.value = value;
        checkCategoryInput();
      } else {
        setCategoryExistsInCategories(false);
        setCategoriesSelectionAvailable(true);
      }
    }
  }

  function handleDelete() {
    deleteListItem(listItem.id);
    router.push("/");
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
  function categoryInCategories(newCategoryName) {
    return categories.find((category) => category.name === newCategoryName)
      ? true
      : false;
  }
  function listItemInListItems(newListItemName) {
    return listItems.find(
      (item) => item.name === newListItemName && item.id != listItem.id
    )
      ? true
      : false;
  }

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
            error={listItemExistsInListItems}
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
          <EditButtonGroup>
            <ButtonIcon
              color="secondary"
              aria-label={"zurück"}
              onClick={(event) => handleGoBack(event)}
            >
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall
              color="error"
              onClick={(event) => {
                event.preventDefault();
                setDeleteModalBoxOpen(true);
                return false;
              }}
            >
              <IconDelete />
              löschen
            </ButtonSmall>
            <ButtonSmall
              color="primary"
              disabled={!submitButtonReady || categoryExistsInCategories}
              onClick={() => {
                return submitButtonReady && categoryExistsInCategories;
              }}
            >
              speichern
              <IconChevronRight />
            </ButtonSmall>
          </EditButtonGroup>
        </StyledForm>
      </FormMain>
      <ModalDeleteBox
        infoText="Bist du dir sicher, dass du diesen Eintrag löschen willst?"
        onClickDelete={() => handleDelete()}
        deleteModalBoxOpen={deleteModalBoxOpen}
        setDeleteModalBoxOpen={setDeleteModalBoxOpen}
      />
    </>
  );
}

const EditButtonGroup = styled(ButtonGroup)`
  gap: 20px 0;

  @media screen and (min-width: 650px) {
    justify-content: start;
    gap: 20px;
  }
  button[color="primary"] {
    width: 100%;

    @media screen and (min-width: 650px) {
      width: auto;
      margin-left: auto;
    }
  }
`;
