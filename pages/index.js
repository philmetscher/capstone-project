import styled from "styled-components";
import Head from "next/head";

import Header from "../components/Header/Header";
import CategoryHeadline from "../components/CategoryHeadline/CategoryHeadline";
import CategoryListItem from "../components/CategoryListItem/CategoryListItem";

import { exampleCategories, exampleListItems } from "../lib/db";

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
        <section>
          {exampleCategories.map((category) => (
            <article key={category.id}>
              <CategoryHeadline>{category.name}</CategoryHeadline>
              <CategoryList>
                {exampleListItems.map((listItem) =>
                  listItem.categoryId === category.id ? (
                    <CategoryListItem key={listItem.categoryId}>
                      {listItem.name}
                    </CategoryListItem>
                  ) : (
                    ""
                  )
                )}
              </CategoryList>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

const CategoryList = styled.ul`
  list-style-type: none;
`;
