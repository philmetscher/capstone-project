import styled from "styled-components";
import { useListsStore } from "../useStore";

//Components
import Layout from "../components/Layout";
import OverviewListEntry from "../components/OverviewListEntry";

export default function Home() {
  //GET THINGS FROM STORE
  const lists = useListsStore((state) => state.lists);

  return (
    <>
      <Layout>deine Listen</Layout>
      <OverviewList>
        {lists.map((list) => (
          <OverviewListEntry key={list.id} id={list.id}>
            {list.name}
          </OverviewListEntry>
        ))}
      </OverviewList>
    </>
  );
}

const OverviewList = styled.ul`
  list-style-type: none;
`;
