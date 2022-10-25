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

  //get categories and events for categories & listItems
  const categories = useCategoriesStore((state) => state.categories);
  const addCategory = useCategoriesStore((state) => state.addCategory);
  const editListItem = useListItemsStore((state) => state.editListItem);
  //set error (category is in categories)
  const [categoryExists, setCategoryExists] = useState(false);
  //check if input-field with new category has value
  const [categorySelectionAvailable, setCategorySelectionAvailable] =
    useState(true);
  //check if user has not pressed enter on input field
  // (for mobile check purposes "Go" or "Enter")
  const [enterInInput, setEnterInInput] = useState(false);

  const listItems = useListItemsStore((state) => state.listItems);
  const listItem = listItems.find((listItem) => listItem.id == id) || {
    name: "",
  };
  const listItemCategory = categories.find(
    (category) => category.id === listItem.categoryId
  );

  function handleGoBack(event) {
    event.preventDefault();
    if (!enterInInput) {
      router.push(`/`);
    } else {
      setEnterInInput(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //check if user has not pressed enter on input field
    // (for mobile check purposes "Go" or "Enter")
    if (!enterInInput) {
      let id = listItem.id,
        name = listItem.name,
        categoryId = listItem.categoryId,
        somethingChanged = false;

      if (name !== data.itemName) {
        name = data.itemName;
        somethingChanged = true;
      }

      if (data.newCategory) {
        // check if new category name exists in old categories names
        if (
          !categories.find((category) => category.name === data.newCategory)
        ) {
          const newCategoryId = nanoid();

          addCategory(newCategoryId, data.newCategory);
          categoryId = newCategoryId;
          somethingChanged = true;
        } else {
          setCategoryExists(true);
        }
      } else {
        if (categoryId !== data.itemCategory) {
          categoryId = data.itemCategory;
          somethingChanged = true;
        }
      }

      if (somethingChanged) {
        editListItem(id, name, categoryId);
        router.push(`/`);
      }
    } else {
      setEnterInInput(false);
    }
  }

  function handleCategoryInput(event) {
    const value = event.target.value;
    value.length >= 1
      ? setCategorySelectionAvailable(false)
      : setCategorySelectionAvailable(true);

    setCategoryExists(false);
  }

  const handlePressEnter = (event) =>
    event.keyCode == 13 ? setEnterInInput(true) : "";

  if (!categories || !listItems) {
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
            handleChange={() => {}}
            handleKeyPress={(event) => handlePressEnter(event)}
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
              disabled={!categorySelectionAvailable}
            />
          )}
          <Input
            name="newCategory"
            labelText="oder neue Kateg. erstellen"
            inputIcon="plus"
            iconBefore={false}
            handleChange={(event) => handleCategoryInput(event)}
            handleKeyPress={(event) => handlePressEnter(event)}
            error={categoryExists}
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
            <ButtonSmall isPrimary>
              speichern
              <IconChevronRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
