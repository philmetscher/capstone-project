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

  const [inputTextFilled, setInputTextFilled] = useState(false);
  const [categories, setCategories] = useLocalStorage("categories", []);
  const [listItems, setListItems] = useLocalStorage("listItems", []);

  useEffect(() => {
    if (!localStorage.getItem("categories")) {
      setCategories(JSON.stringify(exampleCategories));
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (data.itemName.length > 2 && data.itemCategory) {
      setListItems((oldListItems) => [
        ...oldListItems,
        { id: nanoid(), name: data.itemName, categoryId: data.itemCategory },
      ]);
      router.push(`/`);
    }
  }
  function handleInput(event) {
    const value = event.target.value;
    value.length > 2 ? setInputTextFilled(true) : setInputTextFilled(false);
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
          >
            Name...
          </Input>
          <Select
            name="itemCategory"
            labelText="Kategorie auswählen"
            inputIcon="chevronDown"
            options={exampleCategories}
          />
          <ButtonGroup>
            <ButtonIcon
              alt={"zurück"}
              onClick={(event) => {
                event.preventDefault();
                router.push(`/`);
              }}
            >
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall
              isPrimary
              disabled={!inputTextFilled}
              onClick={(event) => {
                return inputTextFilled;
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
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;
