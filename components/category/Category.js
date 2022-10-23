import styled from "styled-components";
import { useState, useEffect } from "react";
import { useListItemsStore } from "../../useStore";

// Components
import CategoryHeadline from "./CategoryHeadline";
import CategoryListItem from "./CategoryListItem";

export default function Category({ category }) {
  const [isExtended, setIsExtended] = useState(true);
  const listItems = useListItemsStore((state) => state.listItems);

  return (
    <article>
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
