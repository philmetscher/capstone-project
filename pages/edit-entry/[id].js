import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCategoriesStore, useListItemsStore } from "../../useStore";
import { nanoid } from "nanoid";

// Components
import Layout from "../../components/Layout";
import {
  FormMain,
  StyledForm,
  Input,
  Select,
} from "../../components/FormComponents";
import ModalDeleteBox from "../../components/ModalDeleteBox";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../../components/Button";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDelete,
} from "react-icons/md"; //Icons
import Info from "../../components/Info";

export default function EditEntry() {
  const router = useRouter();
  const { id, listId } = router.query;

  const routerReturnPath = "/list/" + listId;

  const testHasChar = new RegExp("[\\w]");

  //GET THINGS FROM STORE
  const categories = useCategoriesStore((state) => state.categories);
  const listItems = useListItemsStore((state) => state.listItems);
  const addCategory = useCategoriesStore((state) => state.addCategory);
  const editListItem = useListItemsStore((state) => state.editListItem);
  const deleteListItem = useListItemsStore((state) => state.deleteListItem);

  let filteredCategories;
  if (categories) {
    filteredCategories = categories.filter((category) =>
      category.listId === listId ? category : ""
    );
  }

  //GET CURRENT LIST ITEM & LIST ITEM CATEGORY
  let listItem = {};
  if (listItems) listItem = listItems.find((listItem) => listItem.id == id);

  let listItemCategory = {};
  if (filteredCategories) {
    listItemCategory = filteredCategories.find(
      (category) => category.id === listItem.categoryId
    );
  }

  //STATES
  const [itemNameValidated, setItemNameValidated] = useState(true);
  const [categoryValidated, setCategoryValidated] = useState(false);
  const [categoryDropdownUsed, setCategoryDropdownUsed] = useState(true);
  const [submitButtonReady, setSubmitButtonReady] = useState(false);
  const [deleteModalBoxOpen, setDeleteModalBoxOpen] = useState(false);

  const [currentInfo, setCurrentInfo] = useState(["", ""]);

  //HANDLE FUNCTIONS
  function handleItemInput(event) {
    const value = event.target.value;
    const inListItems = itemInListItems(value.trim());

    if (!testHasChar.test(value)) {
      setItemNameValidated(false);
      setSubmitButtonReady(false);
      setCurrentInfo([
        "listItem",
        "Ein Eintrag muss mind. ein Zeichen enthalten",
      ]);
      return;
    }

    if (!inListItems) {
      setItemNameValidated(true);
      if (currentInfo[0] === "listItem") setCurrentInfo(["", ""]);
      setSubmitButtonReady(categoryDropdownUsed || categoryValidated);
      return;
    }

    setCurrentInfo(["listItem", "Dieser Eintrag existiert bereits"]);
    setItemNameValidated(false);
    setSubmitButtonReady(false);
  }

  function handleCategoryInput(event) {
    const value = event.target.value;
    const inCategories = categoryInCategories(value.trim());

    if (!testHasChar.test(value)) {
      setCategoryValidated(false);

      if (value.length > 0) {
        setCurrentInfo([
          "category",
          "Eine Kategorie muss mind. ein Zeichen enthalten",
        ]);
        setCategoryDropdownUsed(false);
        setSubmitButtonReady(false);
        return;
      }

      if (currentInfo[0] === "category") setCurrentInfo(["", ""]);
      setCategoryDropdownUsed(true);
      setSubmitButtonReady(itemNameValidated && categoryDropdownUsed);
      return;
    }

    setCategoryDropdownUsed(false);

    if (!inCategories) {
      setCategoryValidated(true);
      if (currentInfo[0] === "category") setCurrentInfo(["", ""]);
      setSubmitButtonReady(itemNameValidated);
      return;
    }

    setCurrentInfo(["category", "Diese Kategorie existiert bereits"]);
    setCategoryValidated(false);
    setSubmitButtonReady(false);
  }

  function handleDelete() {
    deleteListItem(listItem.id);
    router.push(routerReturnPath);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let id = listItem.id,
      name = data.itemName,
      categoryId = listItem.categoryId;

    if (categoryId != data.itemCategory) {
      categoryId = data.itemCategory;
    }
    if (data.newCategory) {
      const newCategoryId = nanoid();
      addCategory(newCategoryId, data.newCategory, listId);
      categoryId = newCategoryId;
    }

    console.log(categoryId);

    editListItem(id, name, categoryId);
    router.push(routerReturnPath);
  }

  //HELPER FUNCTIONS
  const itemInListItems = (name) =>
    listItems.some((item) => item.name === name && item.id != listItem.id);
  const categoryInCategories = (name) =>
    categories.some((category) => category.name === name);

  if (!categories || !listItem) {
    return <p>Loading...</p>;
  }

  const options = [
    listItemCategory,
    ...filteredCategories.filter(
      (category) => category.id !== listItem.categoryId
    ),
  ];

  return (
    <>
      <Layout>Bearbeiten</Layout>
      {currentInfo[1] && <Info>{currentInfo[1]}</Info>}
      <FormMain>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="itemName"
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={(event) => handleItemInput(event)}
            value={listItem.name}
            error={!itemNameValidated}
          >
            Name...
          </Input>
          {options && (
            <Select
              name="itemCategory"
              labelText="Kategorie auswählen"
              inputIcon="chevronDown"
              options={options}
              disabled={!categoryDropdownUsed}
            />
          )}
          <Input
            name="newCategory"
            labelText="oder neue Kateg. erstellen"
            inputIcon="plus"
            iconBefore={false}
            handleChange={(event) => handleCategoryInput(event)}
            error={!categoryValidated && !categoryDropdownUsed}
          >
            Kategorie-Name...
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
              <MdKeyboardArrowLeft />
            </ButtonIcon>
            <ButtonSmall
              color="error"
              onClick={(event) => {
                event.preventDefault();
                setDeleteModalBoxOpen(true);
                return false;
              }}
            >
              <MdDelete />
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
              <MdKeyboardArrowRight />
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
