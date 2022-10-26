import styled from "styled-components";
import Head from "next/head";
import { useCategoriesStore } from "../useStore";

// Components
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Category from "../components/category/Category";

export default function Home() {
  const categories = useCategoriesStore((state) => state.categories);

  return (
    <>
      <Head>
        <title>JustList</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Todos</Header>
      <ListMain>
        <CategoriesSection>
          {!categories && <p>Loading...</p>}
          {categories &&
            categories.map((category) => (
              // <h4>{category.name}</h4>
              <Category key={category.id} category={category} />
            ))}
        </CategoriesSection>
      </ListMain>
      <Navigation />
    </>
  );
}

const ListMain = styled.main`
  height: calc(100vh - 182px);
  overflow-y: auto;
`;
const CategoriesSection = styled.section`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding-bottom: 40px;
`;
