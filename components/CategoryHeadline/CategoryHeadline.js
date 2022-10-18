import styled from "styled-components";
import { IconChevronDown } from "../Icons/Icons";

export default function CategoryHeadline() {
  return (
    <CategoryHeadlineWrapper>
      <h3>Kategorie</h3>
      <IconChevronDown />
    </CategoryHeadlineWrapper>
  );
}

const CategoryHeadlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  width: 100%;
  background: var(--primary-gradient);
`;
