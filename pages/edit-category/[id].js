import Head from "next/head";

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

export default function EditCategory() {
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
            handleChange={(event) => handleCategoryInput(event)}
            handleKeyPress={(event) => handleKeyPress(event)}
          >
            Name...
          </Input>
          <ButtonGroup>
            <ButtonSmall
              color="secondary"
              aria-label={"zurück"}
              onClick={(event) => handleGoBack(event)}
            >
              <IconChevronLeft />
              zurück
            </ButtonSmall>
            <ButtonSmall color="primary">
              speichern
              <IconChevronRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
