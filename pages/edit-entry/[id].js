import Head from "next/head";
import { useCategoriesStore, useListItemsStore } from "../../useStore";

// Components
import Header from "../../components/Header";
import {
  FormMain,
  StyledForm,
  Input,
  Select,
} from "../../components/FormComponents";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../../components/Button";
import { IconChevronLeft, IconChevronRight } from "../../components/Icons";

export default function EditEntry() {
  //get categories and events for categories & listItems
  const categories = useCategoriesStore((state) => state.categories) || [];

  return (
    <>
      <Head>
        <title>Create new list-item</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Bearbeiten</Header>
      <FormMain>
        <StyledForm onSubmit={() => {}}>
          <Input
            name="itemName"
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={() => {}}
            handleKeyPress={() => {}}
          >
            Name...
          </Input>
          <Select
            name="itemCategory"
            labelText="Kategorie auswählen"
            inputIcon="chevronDown"
            options={categories}
          />
          <ButtonGroup>
            <ButtonIcon alt={"zurück"} onClick={() => {}}>
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall isPrimary>
              erstellen
              <IconChevronRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
