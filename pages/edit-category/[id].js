import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCategoriesStore } from "../../useStore";

// Components
import Header from "../../components/Header";
import { FormMain, StyledForm, Input } from "../../components/FormComponents";
import { ButtonGroup, ButtonSmall } from "../../components/Button";
import { IconChevronLeft, IconChevronRight } from "../../components/Icons";

export default function EditCategory() {
  const router = useRouter();
  const { id } = router.query;

  //GET THINGS FROM STORE

  const categories = useCategoriesStore((state) => state.categories);
  const editCategory = useCategoriesStore((state) => state.editCategory);

  //GET CURRENT CATEGORY

  let category = {};
  if (categories) category = categories.find((category) => category.id == id);

  //SOME STATES

  //variable to check if user has pressed enter on input field
  const [pressedEnter, setPressedEnter] = useState(false);
  //variable to validate the "list item name" input field (not empty)
  const [submitButtonReady, setSubmitButtonReady] = useState(true);
  //variable to check if the new category exists in the already existing categories
  const [categoryExistsInCategories, setCategoryExistsInCategories] =
    useState(false);

  //HANDLING FUNCTIONS

  function handleGoBack(event) {
    event.preventDefault();
    if (!pressedEnter) {
      router.push(`/`);
    } else {
      setPressedEnter(false);
    }
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case "Enter": //check if user has not pressed enter on input field (for mobile check purposes "Go" or "Enter")
        setPressedEnter(true);
        break;
      case "Backspace": //check if user has pressed backspace on input field (onChange won't work on backspace)
        handleInput(event);
        break;
    }
  }

  function handleInput(event) {
    checkInput();

    function checkInput() {
      let value = event.target.value;

      if (!value.startsWith(" ") && value.length > 0) {
        const inCategories = categoryInCategories(value);

        setCategoryExistsInCategories(inCategories);
        setSubmitButtonReady(!inCategories);
      } else if (value.length > 0) {
        value = value.trim();
        event.target.value = value;
        checkInput();
      } else {
        setSubmitButtonReady(false);
        setCategoryExistsInCategories(false);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let id = category.id,
      name = data.categoryName;

    if (!pressedEnter) {
      editCategory(id, name);
      router.push("/");
    }
  }

  //HELPER FUNCTIONS

  function categoryInCategories(newCategoryName) {
    return categories.find(
      (item) => item.name === newCategoryName && item.id != category.id
    )
      ? true
      : false;
  }

  if (!category) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Bearbeite Kategorie</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Kateg. Bearbeiten</Header>
      <FormMain>
        <StyledForm onSubmit={(event) => handleSubmit(event)}>
          <Input
            name="categoryName"
            labelText="Name der Kategorie"
            inputIcon="list"
            handleChange={(event) => handleInput(event)}
            handleKeyPress={(event) => handleKeyPress(event)}
            value={category.name}
            error={categoryExistsInCategories}
          >
            Name...
          </Input>
          <EditButtonGroup>
            <ButtonSmall
              color="secondary"
              aria-label={"zurück"}
              onClick={(event) => handleGoBack(event)}
            >
              <IconChevronLeft />
              zurück
            </ButtonSmall>
            <ButtonSmall
              color="primary"
              disabled={!submitButtonReady || categoryExistsInCategories}
              onClick={() => {
                return submitButtonReady && categoryExistsInCategories;
              }}
            >
              speichern
              <IconChevronRight />
            </ButtonSmall>
          </EditButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}

const EditButtonGroup = styled(ButtonGroup)`
  flex-flow: column;
  gap: 20px;
`;
