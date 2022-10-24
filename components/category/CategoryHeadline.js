import styled from "styled-components";

import { IconChevronDown, IconChevronUp } from "./../Icons";
import { PTagBold } from "./../HtmlComponents";

export default function CategoryHeadline(props) {
  return (
    <CategoryHeadlineWrapper onClick={props.handleClick}>
      <PTagBold>{props.children}</PTagBold>
      {props.extended ? <IconChevronDown /> : <IconChevronUp />}
    </CategoryHeadlineWrapper>
  );
}

const CategoryHeadlineWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  width: 100%;
  background: var(--primary-gradient);
  border: none;
  color: var(--white);
  cursor: pointer;
`;
