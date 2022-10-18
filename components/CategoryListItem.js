import styled from "styled-components";
import { PTag } from "./HtmlComponents";

export default function CategoryListItem(props) {
  return (
    <CategoryListItemWrapper>
      <PTag>{props.children}</PTag>
    </CategoryListItemWrapper>
  );
}

const CategoryListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--gray);
  &:last-child {
    border-bottom: 1px solid var(--card-bg);
  }
`;
