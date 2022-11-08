import styled from "styled-components";
import dynamic from "next/dynamic";
import { useListsStore } from "../../useStore";

//Components
const DynamicEntry = dynamic(() => import("./entry"), {
  ssr: false,
});

export default function OverviewList() {
  //GET THINGS FROM STORE
  const lists = useListsStore((state) => state.lists);

  return (
    <List>
      {lists.map((list) => (
        <DynamicEntry key={list.id} id={list.id}>
          {list.name}
        </DynamicEntry>
      ))}
    </List>
  );
}

const List = styled.ul`
  list-style-type: none;
  padding-bottom: 40px;
`;
