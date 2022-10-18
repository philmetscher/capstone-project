import styled from "styled-components";
import { IconChevronDown, IconChevronUp } from "./Icons";

export default function CategoryHeadline(props) {
  return (
    <CategoryHeadlineWrapper onClick={props.handleClick}>
      <h3>{props.children}</h3>
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

  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
  }
`;
