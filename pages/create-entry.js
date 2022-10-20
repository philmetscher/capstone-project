import Head from "next/head";
import styled from "styled-components";

import { nanoid } from "nanoid";

import Header from "../components/Header";
import { Input, Select } from "../components/FormComponents";
import { ButtonIcon, ButtonSmall } from "../components/Button";
import { IconChevronLeft, IconChevronRight } from "../components/Icons";

import { exampleCategories, exampleListItems } from "../lib/db";

import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function CreateEntry() {
  const router = useRouter();

  //check if list item name has value to activate the button
  const [submitReady, setSubmitReady] = useState(false);

  //variable to check if Input Field with new category has value
  const [categorySelectionAvailable, setCategorySelectionAvailable] =
    useState(true);

  //variable to set error (category is in categories)
  const [categoryExists, setCategoryExists] = useState(false);

  const [categories, setCategories] = useLocalStorage(
    "categories",
    exampleCategories
  );
  const [listItems, setListItems] = useLocalStorage(
    "listItems",
    exampleListItems
  );
  const [enterInInput, setEnterInInput] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //check if user has not pressed enter on input field
    // (for mobile check purposes "Go" or "Enter")
    if (!enterInInput) {
      //new category
      if (data.newCategory) {
        // check if new category name exists in old categories names
        let newCategoryinCategories = false;

        categories.forEach((category) => {
          if (category.name == data.newCategory) {
            newCategoryinCategories = true;
            return;
          }
        });

        if (!newCategoryinCategories) {
          const newCategoryId = nanoid();

          addNewCategory(newCategoryId, data.newCategory);
          addListItem(data.itemName, newCategoryId);
          router.push(`/`);
        } else {
          setCategoryExists(true);
        }
      }
      //old category
      else {
        addListItem(data.itemName, data.itemCategory);
        router.push(`/`);
      }
    } else {
      setEnterInInput(false);
    }

    function addNewCategory(newCategoryId, name) {
      setCategories((oldCategories) => [
        ...oldCategories,
        {
          id: newCategoryId,
          name: name,
        },
      ]);
    }
    function addListItem(name, categoryId) {
      setListItems((oldListItems) => [
        ...oldListItems,
        {
          id: nanoid(),
          name: name,
          categoryId: categoryId,
        },
      ]);
    }
  }

  function handleGoBack(event) {
    event.preventDefault();
    if (!enterInInput) {
      router.push(`/`);
    } else {
      setEnterInInput(false);
    }
  }
  function handleInput(event) {
    const value = event.target.value;
    value.length > 2 ? setSubmitReady(true) : setSubmitReady(false);
  }
  function handleCategoryInput(event) {
    const value = event.target.value;
    value.length >= 1
      ? setCategorySelectionAvailable(false)
      : setCategorySelectionAvailable(true);

    setCategoryExists(false);
  }

  function handlePressEnter(event) {
    if (event.keyCode == 13) setEnterInInput(true);
  }

  return (
    <>
      <Head>
        <title>Create new list-item</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>neuer Eintrag</Header>
      <Main>
        <CreateEntryForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="itemName"
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={(event) => handleInput(event)}
            handleKeyPress={(event) => handlePressEnter(event)}
          >
            Name...
          </Input>
          <Select
            name="itemCategory"
            labelText="Kategorie auswählen"
            inputIcon="chevronDown"
            options={categories}
            disabled={!categorySelectionAvailable}
          />
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
            <ButtonIcon alt={"zurück"} onClick={(event) => handleGoBack(event)}>
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall
              isPrimary
              disabled={!submitReady}
              onClick={(event) => {
                return submitReady;
              }}
            >
              erstellen
              <IconChevronRight />
            </ButtonSmall>
          </ButtonGroup>
        </CreateEntryForm>
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: 0 20px;
`;
const CreateEntryForm = styled.form`
  display: flex;
  flex-flow: column;
  gap: 10px;
`;
const ButtonGroup = styled.fieldset`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;
