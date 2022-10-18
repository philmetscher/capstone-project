import Head from "next/head";

import Header from "../components/Header";
import Category from "../components/Category";

import { exampleCategories } from "../lib/db";
import styled from "styled-components";

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>JustList</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <CategoriesSection>
          {exampleCategories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </CategoriesSection>
      </main>
    </>
  );
}

const CategoriesSection = styled.section`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;
