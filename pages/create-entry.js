import Head from "next/head";
import styled from "styled-components";

import { nanoid } from "nanoid";

import Header from "../components/Header";
import { Input, Select } from "../components/FormComponents";
import { ButtonIcon, ButtonSmall } from "../components/Button";
import { IconChevronLeft, IconChevronRight } from "../components/Icons";

import { exampleCategories } from "../lib/db";

import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function CreateEntry() {
  const router = useRouter();

  const [submitReady, setSubmitReady] = useState(false);
  const [categories, setCategories] = useLocalStorage(
    "categories",
    exampleCategories
  );
  const [listItems, setListItems] = useLocalStorage("listItems", []);
  const [enterInInput, setEnterInInput] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //check if user has not pressed enter on input field
    if (!enterInInput) {
      if (data.itemName.length > 2) {
        if (data.newCategory) {
          let newCategory = { id: nanoid(), name: data.newCategory };
          setCategories((oldCategories) => [...oldCategories, newCategory]);

          setListItems((oldListItems) => [
            ...oldListItems,
            { id: nanoid(), name: data.itemName, categoryId: newCategory.id },
          ]);
        } else {
          setListItems((oldListItems) => [
            ...oldListItems,
            {
              id: nanoid(),
              name: data.itemName,
              categoryId: data.itemCategory,
            },
          ]);
        }
      }
      // router.push(`/`);
    } else {
      setEnterInInput(false);
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
            options={exampleCategories}
          />
          <Input
            name="newCategory"
            labelText="oder neue Kateg. erstellen"
            inputIcon="plus"
            iconBefore={false}
            handleChange={() => {}}
            handleKeyPress={(event) => handlePressEnter(event)}
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
