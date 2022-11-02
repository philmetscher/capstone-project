import styled from "styled-components";
import Link from "next/link";
import { Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useListItemsStore } from "../../useStore";

//Components
import { IconDrag, IconEdit } from "../Icons";
import { PTag } from "../HtmlComponents";
import Checkbox from "../Checkbox";

export default function CategoryListItem({ children, id, index, checked }) {
  const toggleCheck = useListItemsStore((state) => state.toggleCheck);
  const updateAnyListItemChecked = useListItemsStore(
    (state) => state.updateAnyListItemChecked
  );

  useEffect(() => {
    updateAnyListItemChecked();
  }, []);
  const handleCheckboxChange = () => {
    toggleCheck(id);
    updateAnyListItemChecked();
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <CategoryListItemWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DragWrapper>
            <IconDrag />
          </DragWrapper>
          <Checkbox id={id} onChange={handleCheckboxChange} checked={checked} />
          <ListItemName>{children}</ListItemName>
          <Link href={"/edit-entry/" + id} passHref>
            <EditAnchor>
              <IconEdit />
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
const ListItemName = styled(PTag)`
  margin-right: auto;
`;
const EditAnchor = styled.a`
  width: 24px;
  height: 24px;
`;
