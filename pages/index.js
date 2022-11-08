import styled from "styled-components";
import dynamic from "next/dynamic";

//Components
import Layout from "../components/Layout";
import OverviewList from "../components/lists/list";
const DynamicNavigation = dynamic(() => import("../components/Navigation"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Layout>deine Listen</Layout>
      <ListMain>
        <OverviewList />
      </ListMain>
      <DynamicNavigation isHome />
    </>
  );
}

const ListMain = styled.main`
  height: calc(100vh - 182px);
  overflow-y: auto;
`;
