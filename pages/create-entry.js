import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCategoriesStore, useListItemsStore } from "../useStore";

import { nanoid } from "nanoid";

// Components
import Header from "../components/Header";
import {
  FormMain,
  StyledForm,
  Input,
  Select,
} from "../components/FormComponents";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../components/Button";
import { IconChevronLeft, IconChevronRight } from "../components/Icons";

export default function CreateEntry() {
  const router = useRouter();

  const startsWith = new RegExp("^[a-zA-Z]");

  //######################
  //GET THINGS FROM STORE
  //######################
  const categories = useCategoriesStore((state) => state.categories);

  const addCategory = useCategoriesStore((state) => state.addCategory);
  const addListItem = useListItemsStore((state) => state.addListItem);

  //######################
  //SOME STATES
  //######################
  //variable to check if user has pressed enter on input field
  const [pressedEnter, setPressedEnter] = useState(false);
  //variable to check if input-field with new category has value
  const [categoriesSelectionAvailable, setCategoriesSelectionAvailable] =
    useState(true);
  //variable to validate the "list item name" input field (not empty)
  const [submitButtonReady, setSubmitButtonReady] = useState(false);
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
  const handlePressEnter = (event) => {
    //check if user has not pressed enter on input field (for mobile check purposes "Go" or "Enter")
    event.keyCode == 13 ? setPressedEnter(true) : "";
  };

  function handleListItemInput(event) {
    const value = event.target.value;

    if (startsWith.test(value)) {
      setSubmitButtonReady(true);
    } else if ((value.length > 0) & value.startsWith(" ")) {
      event.target.value = "";
    } else {
      setSubmitButtonReady(false);
    }
  }

  function handleCategoryInput(event) {
    const value = event.target.value;

    if (startsWith.test(value)) {
      setCategoriesSelectionAvailable(false);

      if (categoryInCategories(event.target.value)) {
        setCategoryExistsInCategories(true);
      } else {
        setCategoryExistsInCategories(false);
      }
    } else if ((value.length > 0) & value.startsWith(" ")) {
      event.target.value = "";
      setCategoriesSelectionAvailable(true);
    } else {
      setCategoryExistsInCategories(false);
      setCategoriesSelectionAvailable(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let name = data.itemName,
      categoryId = listItem.categoryId;

    if (!pressedEnter) {
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
        addListItem(name, categoryId);
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

  if (!categories) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Create new list-item</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>neuer Eintrag</Header>
      <FormMain>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="itemName"
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={(event) => handleListItemInput(event)}
            handleKeyPress={(event) => handlePressEnter(event)}
          >
            Name...
          </Input>
          <Select
            name="itemCategory"
            labelText="Kategorie auswählen"
            inputIcon="chevronDown"
            options={categories}
            disabled={!categoriesSelectionAvailable}
          />
          <Input
            name="newCategory"
            labelText="oder neue Kateg. erstellen"
            inputIcon="plus"
            iconBefore={false}
            handleChange={(event) => handleCategoryInput(event)}
            handleKeyPress={(event) => handlePressEnter(event)}
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
              erstellen
              <IconChevronRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
