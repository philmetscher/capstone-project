import styled from "styled-components";
import dynamic from "next/dynamic";
import { useListsStore } from "../../useStore";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

//Components
const DynamicEntry = dynamic(() => import("./Entry"), {
  ssr: false,
});

export default function OverviewList() {
  //GET THINGS FROM STORE
  const lists = useListsStore((state) => state.lists);
  const updateListIndex = useListsStore((state) => state.updateListIndex);

  const handleOnDragEnd = ({ destination, source }) => {
    //check if destination is not the same index as before & the destination is not in another category
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    updateListIndex(destination.index, source.index);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="overviewList">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {lists.map((list, index) => (
              <DynamicEntry key={list.id} id={list.id} index={index}>
                {list.name}
              </DynamicEntry>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const List = styled.ul`
  list-style-type: none;
  padding-bottom: 40px;
`;
