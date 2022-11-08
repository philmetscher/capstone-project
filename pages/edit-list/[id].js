import { useState } from "react";
import { useRouter } from "next/router";
import { useListsStore } from "../../useStore";

//Components
import Layout from "../../components/Layout";
import { FormMain, StyledForm, Input } from "../../components/FormComponents";
import { ButtonGroup, ButtonIcon, ButtonSmall } from "../../components/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"; //Icons
import Info from "../../components/Info";

export default function EditList() {
  const router = useRouter();
  const { id } = router.query;

  const testHasChar = new RegExp("[\\w]");

  //GET THINGS FROM STORE
  const lists = useListsStore((state) => state.lists);
  const editList = useListsStore((state) => state.editList);

  //GET CURRENT LIST
  let list;
  if (lists) list = lists.find((list) => list.id === id);

  //STATES
  const [listValidated, setListValidated] = useState(true);
  const [submitButtonReady, setSubmitButtonReady] = useState(true);

  const [currentInfo, setCurrentInfo] = useState(["", ""]);

  //HANDLE FUNCTIONS
  function handleListInput(event) {
    const value = event.target.value;
    const inLists = listInLists(value.trim());

    if (!testHasChar.test(value)) {
      setListValidated(false);
      setSubmitButtonReady(false);
      setCurrentInfo(["lists", "Eine Liste muss mind. ein Zeichen enthalten"]);
      return;
    }

    if (!inLists) {
      setListValidated(true);
      setSubmitButtonReady(true);
      setCurrentInfo(["", ""]);
      return;
    }

    setListValidated(false);
    setSubmitButtonReady(false);
    setCurrentInfo(["lists", "Diese Liste existiert bereits"]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    editList(id, data.listName);
    router.push("/");
  }

  //HELPER FUNCTIONS
  const listInLists = (name) => lists.some((list) => list.name === name);

  if (!list) return;

  return (
    <>
      <Layout>Liste erstellen</Layout>
      {currentInfo[1] && <Info>{currentInfo[1]}</Info>}
      <FormMain>
        <StyledForm
          onSubmit={(event) => handleSubmit(event)}
          autoComplete="off"
        >
          <Input
            name="listName"
            labelText="Name der Liste"
            inputIcon="list"
            handleChange={(event) => handleListInput(event)}
            value={list.name}
            error={!listValidated}
          >
            Listenname...
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
              speichern
              <MdKeyboardArrowRight />
            </ButtonSmall>
          </ButtonGroup>
        </StyledForm>
      </FormMain>
    </>
  );
}
