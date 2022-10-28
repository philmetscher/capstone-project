import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCategoriesStore, useListItemsStore } from "../../useStore";
import { nanoid } from "nanoid";

// Components
import Header from "../../components/Header";
import { FormMain, StyledForm, Input } from "../../components/FormComponents";
import ModalDeleteBox from "../../components/ModalDeleteBox";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../../components/Button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDelete,
} from "../../components/Icons";

export default function EditCategory() {
  const router = useRouter();
  const { id } = router.query;

  //GET THINGS FROM STORE

  const categories = useCategoriesStore((state) => state.categories);
  const listItems = useListItemsStore((state) => state.listItems);

  const addCategory = useCategoriesStore((state) => state.addCategory);
  const editCategory = useCategoriesStore((state) => state.editCategory);
  const deleteCategory = useCategoriesStore((state) => state.deleteCategory);

  const editListItem = useListItemsStore((state) => state.editListItem);

  //GET CURRENT CATEGORY

  let category = {};
  if (categories) category = categories.find((category) => category.id == id);

  //SOME STATES

  //variable to check if user has pressed enter on input field
  const [pressedEnter, setPressedEnter] = useState(false);
  //variable to validate the "list item name" input field (not empty)
  const [submitButtonReady, setSubmitButtonReady] = useState(true);
  //variable to check if the new category exists in the already existing categories
  const [categoryExistsInCategories, setCategoryExistsInCategories] =
    useState(false);
  //variable to check if Modal Box for deletion is open
  const [deleteModalBoxOpen, setDeleteModalBoxOpen] = useState(false);

  //HANDLING FUNCTIONS

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
        handleInput(event);
        break;
    }
  }

  function handleInput(event) {
    checkInput();

    function checkInput() {
      let value = event.target.value;

      if (!value.startsWith(" ") && value.length > 0) {
        const inCategories = categoryInCategories(value);

        setCategoryExistsInCategories(inCategories);
        setSubmitButtonReady(!inCategories);
      } else if (value.length > 0) {
        value = value.trim();
        event.target.value = value;
        checkInput();
      } else {
        setSubmitButtonReady(false);
        setCategoryExistsInCategories(false);
      }
    }
  }

  function handleDelete() {
    checkDelete();

    function checkDelete() {
      let standardCategory = categories.find(
        (category) => category.default === true
      );
      let standardCategoryId = standardCategory ? standardCategory.id : null;

      //no default category exist
      if (!standardCategoryId) {
        standardCategoryId = nanoid();
        addCategory(standardCategoryId, "Standard Kategorie", true);
      }

      listItems.forEach((item) => {
        if (item.categoryId === category.id)
          editListItem(item.id, item.name, standardCategoryId); //checks if any listItem is part of the deleted category
      });

      deleteCategory(category.id);
      router.push("/");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let id = category.id,
      name = data.categoryName;

    if (!pressedEnter) {
      editCategory(id, name);
      router.push("/");
    }
  }

  //HELPER FUNCTIONS
  const categoryInCategories = (newCategoryName) =>
    categories.some(
      (item) => item.name === newCategoryName && item.id != category.id
    );

  if (!category) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Bearbeite Kategorie</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Kateg. Bearbeiten</Header>
      <FormMain>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="categoryName"
            labelText="Name der Kategorie"
            inputIcon="list"
            handleChange={(event) => handleInput(event)}
            handleKeyPress={(event) => handleKeyPress(event)}
            value={category.name}
            error={categoryExistsInCategories}
          >
            Name...
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
        infoText="Bist du dir sicher, dass du diese Kategorie löschen willst?"
        extraInfoText="(Alle dazu gehörenden Einträge werden einer Standard-Kategorie zugewiesen)"
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
