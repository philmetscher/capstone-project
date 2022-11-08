import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCategoriesStore, useListItemsStore } from "../../useStore";
import { nanoid } from "nanoid";

// Components
import Layout from "../../components/Layout";
import { FormMain, StyledForm, Input } from "../../components/FormComponents";
import ModalDeleteBox from "../../components/ModalDeleteBox";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../../components/Button";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDelete,
} from "react-icons/md"; //Icons
import Info from "../../components/Info";

export default function EditCategory() {
  const router = useRouter();
  const { id, listId } = router.query;

  const routerReturnPath = "/list/" + listId;

  const testHasChar = new RegExp("[\\w]");

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

  //STATES
  const [categoryValidated, setCategoryValidated] = useState(true);
  const [submitButtonReady, setSubmitButtonReady] = useState(true);
  const [deleteModalBoxOpen, setDeleteModalBoxOpen] = useState(false);

  const [currentInfo, setCurrentInfo] = useState(["", ""]);

  //HANDLING FUNCTIONS
  function handleInput(event) {
    const value = event.target.value;
    const inCategories = categoryInCategories(value.trim());

    if (!testHasChar.test(value)) {
      setCategoryValidated(false);
      setCurrentInfo([
        "category",
        "Eine Kategorie muss mind. ein Zeichen enthalten",
      ]);
      setSubmitButtonReady(false);
      return;
    }

    if (!inCategories) {
      setCategoryValidated(true);
      setCurrentInfo(["", ""]);
      setSubmitButtonReady(true);
      return;
    }

    setCurrentInfo(["category", "Diese Kategorie existiert bereits"]);
    setCategoryValidated(false);
    setSubmitButtonReady(false);
  }

  function handleDelete() {
    let standardCategory = categories.find(
      (category) => category.default === true
    );
    let standardCategoryId = standardCategory ? standardCategory.id : null;

    const listItemsInCategory = listItems.some(
      (listItem) => listItem.categoryId === category.id
    );

    if (listItemsInCategory) {
      //listItems are in the deleted category
      if (!standardCategory) {
        //no default category exist
        standardCategoryId = nanoid();
        addCategory(standardCategoryId, "Verschiedenes", listId, true);
      }

      listItems.forEach((item) => {
        if (item.categoryId === category.id)
          editListItem(item.id, item.name, standardCategoryId); //checks if any listItem is part of the deleted category
      });
    }

    if (category === standardCategory) {
      setDeleteModalBoxOpen(false);
      setCurrentInfo([
        "category",
        "Die Standard-Kategorie kann nicht gelöscht werden!",
      ]);

      setTimeout(() => setCurrentInfo(["", ""]), 3500);
    } else {
      deleteCategory(category.id);
      router.push(routerReturnPath);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let id = category.id,
      name = data.categoryName;

    editCategory(id, name);
    router.push(routerReturnPath);
  }

  //HELPER FUNCTIONS
  const categoryInCategories = (newCategoryName) =>
    categories.some(
      (item) =>
        item.name === newCategoryName &&
        item.id != category.id &&
        item.listId === listId
    );

  if (!category) {
    setTimeout(() => {
      if (!category) {
        router.push(routerReturnPath);
      }
    }, 3000);
    return;
  }

  return (
    <>
      <Layout>Kateg. Bearbeiten</Layout>
      {currentInfo[1] && <Info>{currentInfo[1]}</Info>}
      <FormMain>
        <StyledForm
          onSubmit={(event) => handleSubmit(event)}
          autoComplete="off"
        >
          <Input
            name="categoryName"
            labelText="Name der Kategorie"
            inputIcon="list"
            handleChange={(event) => handleInput(event)}
            value={category.name}
            error={!categoryValidated}
          >
            Name...
          </Input>
          <EditButtonGroup>
            <ButtonIcon
              color="secondary"
              aria-label={"zurück"}
              onClick={(event) => {
                event.preventDefault();
                router.push(routerReturnPath);
              }}
            >
              <MdKeyboardArrowLeft size="24px" />
            </ButtonIcon>
            <ButtonSmall
              color="error"
              onClick={(event) => {
                event.preventDefault();
                setDeleteModalBoxOpen(true);
                return false;
              }}
            >
              <MdDelete size="24px" />
              löschen
            </ButtonSmall>
            <ButtonSmall
              color="primary"
              disabled={!submitButtonReady}
              onClick={() => {
                return submitButtonReady;
              }}
            >
              speichern
              <MdKeyboardArrowRight size="24px" />
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
