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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"; //Icons
import Info from "../components/Info";

export default function CreateEntry() {
  const router = useRouter();

  const testHasChar = new RegExp("[\\w]");

  //GET THINGS FROM STORE
  const categories = useCategoriesStore((state) => state.categories);
  const listItems = useListItemsStore((state) => state.listItems);
  const addCategory = useCategoriesStore((state) => state.addCategory);
  const addListItem = useListItemsStore((state) => state.addListItem);

  //STATES
  const [itemNameValidated, setItemNameValidated] = useState(true);
  const [categoryValidated, setCategoryValidated] = useState(false);
  const [categoryDropdownUsed, setCategoryDropdownUsed] = useState(true);
  const [submitButtonReady, setSubmitButtonReady] = useState(false);

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

      if (value.length === 0) {
        if (currentInfo[0] === "category") setCurrentInfo(["", ""]);
        setCategoryDropdownUsed(true);
        setSubmitButtonReady(itemNameValidated && categoryDropdownUsed);
        return;
      }

      setCurrentInfo([
        "category",
        "Eine Kategorie muss mind. ein Zeichen enthalten",
      ]);
      setCategoryDropdownUsed(false);
      setSubmitButtonReady(false);
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

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const name = data.itemName;
    let categoryId = data.itemCategory;

    if (data.newCategory) {
      const newCategoryId = nanoid();
      addCategory(newCategoryId, data.newCategory);
      categoryId = newCategoryId;
    }

    addListItem(name, categoryId);
    router.push("/");
  }

  //HELPER FUNCTIONS
  const itemInListItems = (name) =>
    listItems.some((listItem) => listItem.name === name);
  const categoryInCategories = (name) =>
    categories.some((category) => category.name === name);

  if (!categories || !listItems) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>neuer Eintrag</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>neuer Eintrag</Header>
      {currentInfo[1] && <Info>{currentInfo[1]}</Info>}
      <FormMain>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="itemName"
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={(event) => handleItemInput(event)}
            error={!itemNameValidated}
          >
            Name...
          </Input>
          <Select
            name="itemCategory"
            labelText="Kategorie auswählen"
            inputIcon="chevronDown"
            options={categories}
            disabled={!categoryDropdownUsed}
          />
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
          <ButtonGroup>
            <ButtonIcon
              color="secondary"
              aria-label={"zurück"}
              onClick={(event) => {
                event.preventDefault();
                router.push("/");
              }}
            >
              <MdKeyboardArrowLeft />
            </ButtonIcon>
            <ButtonSmall
              color="primary"
              disabled={!submitButtonReady}
              onClick={() => {
                return submitButtonReady;
              }}
            >
              erstellen
              <MdKeyboardArrowRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
