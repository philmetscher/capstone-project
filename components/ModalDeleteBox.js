import styled from "styled-components";

//Components
import { ButtonGroup, ButtonSmall } from "./Button";
import { IconChevronLeft, IconDelete } from "./Icons";
import { PTag, PTagBold, PTagSmall } from "./HtmlComponents";

export default function ModalDeleteBox({
  infoText,
  extraInfoText = "",
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
            {extraInfoText && <ErrorInfo>{extraInfoText}</ErrorInfo>}

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
const ErrorInfo = styled(PTagSmall)`
  color: var(--error);
`;
