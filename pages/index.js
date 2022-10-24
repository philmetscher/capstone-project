import styled from "styled-components";
import Head from "next/head";
import { useCategoriesStore } from "../useStore";

// Components
import Header from "../components/Header";
import Category from "../components/category/Category";
import Navigation from "../components/Navigation";

export default function Home() {
  const categories = useCategoriesStore((state) => state.categories) || [];

  return (
    <>
      <Head>
        <title>JustList</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>Todos</Header>
      <main>
        <CategoriesSection>
          {categories &&
            categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
        </CategoriesSection>
      </main>
      <Navigation />
    </>
  );
}

const CategoriesSection = styled.section`
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-bottom: 126px;
`;
