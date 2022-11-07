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
      <OverviewList>
        {lists.map((list) => (
          <DynamicOverviewListEntry key={list.id} id={list.id}>
            {list.name}
          </DynamicOverviewListEntry>
        ))}
      </OverviewList>
      <DynamicNavigation isHome />
    </>
  );
}

const OverviewList = styled.ul`
  list-style-type: none;
`;
