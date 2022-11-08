import styled from "styled-components";
import { useListsStore } from "../useStore";
import dynamic from "next/dynamic";

//Components
import Layout from "../components/Layout";
const DynamicOverviewListEntry = dynamic(
  () => import("../components/OverviewListEntry"),
  {
    ssr: false,
  }
);
const DynamicNavigation = dynamic(() => import("../components/Navigation"), {
  ssr: false,
});

export default function Home() {
  //GET THINGS FROM STORE
  const lists = useListsStore((state) => state.lists);

  return (
    <>
      <Layout>deine Listen</Layout>
      <ListMain>
        <OverviewList>
          {lists.map((list) => (
            <DynamicOverviewListEntry key={list.id} id={list.id}>
              {list.name}
            </DynamicOverviewListEntry>
          ))}
        </OverviewList>
      </ListMain>
      <DynamicNavigation isHome />
    </>
  );
}

const ListMain = styled.main`
  height: calc(100vh - 182px);
  overflow-y: auto;
`;
const OverviewList = styled.ul`
  list-style-type: none;
  padding-bottom: 40px;
`;
