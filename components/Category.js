import styled from "styled-components";

import CategoryHeadline from "./CategoryHeadline";
import CategoryListItem from "./CategoryListItem";

import { exampleListItems } from "../lib/db";

import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Category({ category }) {
  const [isExtended, setIsExtended] = useState(true);
  const [listItems, setListItems] = useLocalStorage("listItems", []);
  useEffect(() => {
    setListItems(
      JSON.parse(localStorage.getItem("listItems")) || exampleListItems
    );
  }, []);

  return (
    <article key={category.id}>
      <CategoryHeadline
        extended={isExtended}
        handleClick={() => setIsExtended((oldIsExtended) => !oldIsExtended)}
      >
        {category.name}
      </CategoryHeadline>
      {isExtended && (
        <CategoryList>
          {listItems.map((listItem) =>
            listItem.categoryId === category.id ? (
              <CategoryListItem key={listItem.id}>
                {listItem.name}
              </CategoryListItem>
            ) : (
              ""
            )
          )}
        </CategoryList>
      )}
    </article>
  );
}

const CategoryList = styled.ul`
  list-style-type: none;
`;
