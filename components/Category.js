import styled from "styled-components";
import { useState } from "react";

import CategoryHeadline from "./CategoryHeadline";
import CategoryListItem from "./CategoryListItem";

import { exampleListItems } from "../lib/db";

export default function Category({ category }) {
  const [isExtended, setIsExtended] = useState(true);

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
          {exampleListItems.map((listItem) =>
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
