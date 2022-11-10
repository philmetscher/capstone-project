import styled from "styled-components";
import Link from "next/link";
import { Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useStore } from "../../useStore";

//Components
import { MdOutlineDragHandle, MdEdit } from "react-icons/md"; //Icons
import { PTag } from "../HtmlComponents";
import Checkbox from "../Checkbox";
import CategoryListItemHeadline from "./CategoryListItemHeadline";

export default function CategoryListItem({ children, listItem, index }) {
  const toggleListItemCheck = useStore((state) => state.toggleListItemCheck);
  const updateAnyListItemChecked = useStore(
    (state) => state.updateAnyListItemChecked
  );

  useEffect(() => {
    updateAnyListItemChecked();
  }, []);
  const handleCheckboxChange = () => {
    toggleListItemCheck(listItem.id);
    updateAnyListItemChecked();
  };
  return (
    <Draggable draggableId={listItem.id} index={index}>
      {(provided) => (
        <CategoryListItemWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DragWrapper>
            <MdOutlineDragHandle size="24px" />
          </DragWrapper>
          <Checkbox
            id={listItem.id}
            onChange={handleCheckboxChange}
            checked={listItem.checked}
          />
          <CategoryListItemHeadline listItem={listItem}>
            {children}
          </CategoryListItemHeadline>
          <Link
            href={{
              pathname: "/edit-entry/" + listItem.id,
              query: {
                id: listItem.id,
                listId: listItem.listId,
              },
            }}
            passHref
          >
            <EditAnchor>
              <MdEdit size="24px" />
            </EditAnchor>
          </Link>
        </CategoryListItemWrapper>
      )}
    </Draggable>
  );
}

const CategoryListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--gray);
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  &:last-child {
    border-bottom: 1px solid var(--card-bg);
  }
`;
const DragWrapper = styled.div`
  height: 24px;
`;
const EditAnchor = styled.a`
  width: 24px;
  height: 24px;
`;
