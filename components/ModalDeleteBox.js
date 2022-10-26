import styled from "styled-components";
import { useState } from "react";

//Components
import { ButtonGroup, ButtonSmall } from "./Button";
import { IconChevronLeft, IconDelete } from "./Icons";
import { PTagBold } from "./HtmlComponents";

export default function ModalDeleteBox({
  infoText,
  onClickDelete,
  deleteModalBoxOpen,
  setDeleteModalBoxOpen,
}) {
  return (
    <>
      {deleteModalBoxOpen && (
        <Modal>
          <ModalInner>
            <PTagBold>{infoText}</PTagBold>
            <ModalButtonGroup>
              <ButtonSmall
                color="secondary"
                onClick={() => setDeleteModalBoxOpen(false)}
              >
                <IconChevronLeft />
                zurück
              </ButtonSmall>
              <ButtonSmall color="error" onClick={() => onClickDelete()}>
                <IconDelete />
                ja löschen
              </ButtonSmall>
            </ModalButtonGroup>
          </ModalInner>
        </Modal>
      )}
    </>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--secondary-05);
  backdrop-filter: blur(2px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const ModalInner = styled.section`
  background: var(--card-bg);
  padding: 20px;
  border-radius: 13px;
  text-align: center;
`;
const ModalButtonGroup = styled(ButtonGroup)`
  flex-flow: column;
  gap: 20px;
`;
