import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { id } = router.query;

  //get categories and events for categories & listItems
  const categories = useCategoriesStore((state) => state.categories);
  const editListItem = useListItemsStore((state) => state.editListItem);
  //check if user has not pressed enter on input field
  // (for mobile check purposes "Go" or "Enter")
  const [enterInInput, setEnterInInput] = useState(false);

  const listItems = useListItemsStore((state) => state.listItems);
  const listItem = listItems.find((listItem) => listItem.id == id) || {
    name: "",
  };
  const listItemCategory = categories.find(
    (category) => category.id === listItem.categoryId
  );

  function handleGoBack(event) {
    event.preventDefault();
    if (!enterInInput) {
      router.push(`/`);
    } else {
      setEnterInInput(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //check if user has not pressed enter on input field
    // (for mobile check purposes "Go" or "Enter")
    if (!enterInInput) {
      //check if something has changed
      if (
        listItem.name !== data.itemName ||
        listItem.categoryId !== data.itemCategory
      ) {
        editListItem(listItem.id, data.itemName, data.itemCategory);
      }
      router.push(`/`);
    } else {
      setEnterInInput(false);
    }
  }

  const handlePressEnter = (event) =>
    event.keyCode == 13 ? setEnterInInput(true) : "";

  if (!categories || !listItems) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Bearbeite list-item</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Bearbeiten</Header>
      <FormMain>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="itemName"
            labelText="Name des Eintrags"
            inputIcon="list"
            handleChange={() => {}}
            handleKeyPress={(event) => handlePressEnter(event)}
            value={listItem.name}
          >
            Name...
          </Input>
          {listItemCategory && (
            <Select
              name="itemCategory"
              labelText="Kategorie auswählen"
              inputIcon="chevronDown"
              options={[
                listItemCategory,
                ...categories.filter(
                  (category) => category.id !== listItem.categoryId
                ),
              ]}
            />
          )}
          <ButtonGroup>
            <ButtonIcon
              aria-label={"zurück"}
              onClick={(event) => handleGoBack(event)}
            >
              <IconChevronLeft />
            </ButtonIcon>
            <ButtonSmall isPrimary>
              speichern
              <IconChevronRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
