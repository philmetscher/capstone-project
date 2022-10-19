import Head from "next/head";
import styled from "styled-components";

import Header from "../components/Header";
import { Input, Select } from "../components/FormComponents";
import { ButtonIcon, ButtonSmall } from "../components/Button";
import { IconChevronLeft, IconChevronRight } from "../components/Icons";

import { exampleCategories } from "../lib/db";

import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

export default function CreateEntry() {
  const [categories, setCategories] = useLocalStorage("categories", []);
  useEffect(() => {
    setCategories(
      localStorage.getItem("categories") || JSON.stringify(exampleCategories)
    );
  }, []);

  return (
    <>
      <Head>
        <title>Create new list-item</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>neuer Eintrag</Header>
      <Main>
        <CreateEntryForm>
          <Input labelText="Name des Eintrags" inputIcon="list">
            Name...
          </Input>
          <Select labelText="Kategorie auswählen" options={exampleCategories}>
            - auswählen -
          </Select>
          <ButtonGroup>
            <ButtonIcon alt={"zurück"}>
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall isPrimary>
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
