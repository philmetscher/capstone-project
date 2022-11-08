import styled from "styled-components";
import { useState } from "react";
import { useListItemsStore } from "../../useStore";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// Components
import CategoryHeadline from "./CategoryHeadline";
import CategoryListItem from "./CategoryListItem";

export default function Category({ category, listId, hasDisabledItems }) {
  const [isExtended, setIsExtended] = useState(true);

  //GET THINGS FROM STORE
  const listItems = useListItemsStore((state) => state.listItems);
  const updateListItemIndex = useListItemsStore(
    (state) => state.updateListItemIndex
  );

  const handleOnDragEnd = ({ destination, source }) => {
    //check if destination is not the same index as before & the destination is not in another category
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    updateListItemIndex(destination.index, source.index);
  };

  //activeListItems
  const activeListItems = listItems.filter(
    (listItem) => listItem.categoryId === category.id && !listItem.disabled
  );
  //inactiveListItems
  const inactiveListItems = listItems.filter(
    (listItem) => listItem.categoryId === category.id && listItem.disabled
  );

  return (
    <CategoryWrapper disabled={hasDisabledItems}>
      <CategoryHeadline
        id={category.id}
        extended={isExtended}
        handleClick={() => setIsExtended((oldIsExtended) => !oldIsExtended)}
        listId={listId}
        disabled={hasDisabledItems}
      >
        {category.name}
      </CategoryHeadline>
      {isExtended && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={category.id}>
            {(provided) => (
              <CategoryList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {hasDisabledItems ? (
                  <>
                    {inactiveListItems.map((listItem, index) => (
                      <CategoryListItem
                        key={listItem.id}
                        id={listItem.id}
                        index={index}
                        checked={listItem.checked}
                        listId={listId}
                      >
                        {listItem.name}
                      </CategoryListItem>
                    ))}
                  </>
                ) : (
                  <>
                    {activeListItems.map((listItem, index) => (
                      <CategoryListItem
                        key={listItem.id}
                        id={listItem.id}
                        index={index}
                        checked={listItem.checked}
                        listId={listId}
                      >
                        {listItem.name}
                      </CategoryListItem>
                    ))}
                  </>
                )}

                {provided.placeholder}
              </CategoryList>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </CategoryWrapper>
  );
}

const CategoryWrapper = styled.article`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const CategoryList = styled.ul`
  list-style-type: none;
`;
