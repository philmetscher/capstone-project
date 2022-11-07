import Link from "next/link";
import styled from "styled-components";
import { useListItemsStore } from "../useStore";
import { useState } from "react";
import { useRouter } from "next/router";

//Components
import { MdClear, MdDelete, MdAdd, MdKeyboardArrowLeft } from "react-icons/md"; //Icons
import ModalDeleteBox from "./ModalDeleteBox";

export default function Navigation({ listId }) {
  //SOME STATES
  //variable to check if Modal Box for deletion is open
  const [deleteModalBoxOpen, setDeleteModalBoxOpen] = useState(false);

  //GET THINGS FROM STORE
  const listItems = useListItemsStore((state) => state.listItems);
  const anyListItemChecked = useListItemsStore(
    (state) => state.anyListItemChecked
  );
  const toggleCheck = useListItemsStore((state) => state.toggleCheck);
  const deleteListItem = useListItemsStore((state) => state.deleteListItem);
  const updateAnyListItemChecked = useListItemsStore(
    (state) => state.updateAnyListItemChecked
  );

  const handleUnselect = () => {
    listItems.forEach((item) => {
      if (item.checked) {
        toggleCheck(item.id);
      }
    });
  };
  const handleDeleteSelected = () => {
    listItems.forEach((item) => {
      if (item.checked) deleteListItem(item.id);
    });

    setDeleteModalBoxOpen(false);
    updateAnyListItemChecked(false);
  };

  return (
    <>
      <NavigationWrapper>
        <NavList>
          {anyListItemChecked ? (
            <>
              <NavEntry width="50%">
                <NavButton onClick={handleUnselect}>
                  <MdClear size="24px" />
                  <NavDesc>alles abwählen</NavDesc>
                </NavButton>
              </NavEntry>
              <NavEntry width="50%">
                <NavButton onClick={() => setDeleteModalBoxOpen(true)}>
                  <MdDelete size="24px" />
                  <NavDesc>markierte löschen</NavDesc>
                </NavButton>
              </NavEntry>
            </>
          ) : (
            <>
              <NavEntry width="50%">
                <Link href="/" passHref>
                  <NavLink width="100%">
                    <MdKeyboardArrowLeft size="24px" />
                    <NavDesc>zu Listen</NavDesc>
                  </NavLink>
                </Link>
              </NavEntry>
              <NavEntry width="50%">
                <Link
                  href={{
                    pathname: "/create-entry",
                    query: { listId: listId },
                  }}
                  passHref
                >
                  <NavLink width="100%">
                    <MdAdd size="24px" />
                    <NavDesc>neuer Eintrag</NavDesc>
                  </NavLink>
                </Link>
              </NavEntry>
            </>
          )}
        </NavList>
      </NavigationWrapper>
      <ModalDeleteBox
        infoText="Bist du dir sicher, dass du die selektierten Einträge löschen willst?"
        onClickDelete={() => handleDeleteSelected()}
        deleteModalBoxOpen={deleteModalBoxOpen}
        setDeleteModalBoxOpen={setDeleteModalBoxOpen}
      />
    </>
  );
}

const NavigationWrapper = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: var(--main-bg);
  padding: 0 20px 40px;
  margin-top: 20px;

  &:before {
    display: table;
    content: "";
    background: var(--overlap-bg);
    width: 100%;
    height: 50px;
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
  }
`;
const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  background: var(--secondary);
  border-radius: 13px;
  list-style: none;
`;
const NavEntry = styled.li`
  width: ${({ width }) => (width ? width : "auto")};
  height: 40px;
`;

const NavLink = styled.a`
  display: inline-flex;
  align-items: center;
  flex-flow: column;
  width: 100%;
`;
const NavButton = styled.button`
  display: flex;
  flex-flow: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--white);
  width: 100%;
`;
const NavDesc = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
`;
