import Head from "next/head";
import styled from "styled-components";

import Header from "../components/Header";
import { Input, Select } from "../components/FormComponents";
import { ButtonIcon, ButtonSmall } from "../components/Button";
import { IconChevronLeft, IconChevronRight } from "../components/Icons";

import { exampleCategories } from "../lib/db";

import useLocalStorage from "../hooks/useLocalStorage";
import { useState, useEffect } from "react";

export default function CreateEntry() {
  const [inputTextFilled, setInputTextFilled] = useState(false);
  const [selectionSelected, setSelectionSelected] = useState(false);
  const [categories, setCategories] = useLocalStorage("categories", []);
  useEffect(() => {
    setCategories(
      localStorage.getItem("categories") || JSON.stringify(exampleCategories)
    );
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleInput(event) {
    const value = event.target.value;
    value.length > 2 ? setInputTextFilled(true) : setInputTextFilled(false);
  }
  function handleSelection(event) {
    const value = event.target.value;
    value != "- auswählen -"
      ? setSelectionSelected(true)
      : setSelectionSelected(false);
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
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={(event) => handleInput(event)}
          >
            Name...
          </Input>
          <Select
            labelText="Kategorie auswählen"
            options={exampleCategories}
            handleChange={(event) => handleSelection(event)}
          >
            - auswählen -
          </Select>
          <ButtonGroup>
            <ButtonIcon alt={"zurück"}>
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall
              isPrimary
              disabled={!inputTextFilled || !selectionSelected}
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
