import styled from "styled-components";
import Head from "next/head";

import Header from "../components/Header";
import Category from "../components/category/Category";
import Navigation from "../components/Navigation";

import { exampleCategories } from "../lib/db";

import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

export default function Home() {
  const [categories, setCategories] = useLocalStorage(
    "categories",
    exampleCategories
  );

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
          {categories.map((category) => (
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
