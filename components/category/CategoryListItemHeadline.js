import styled from "styled-components";
import { useCategoriesStore } from "../../useStore";

export default function CategoryListItemHeadline({ children }) {
  //GET THINGS FROM STORE
  const addCategory = useCategoriesStore((state) => state.addCategory);

  const handleListItem = (event) => {
    event.preventDefault();
    console.log("test");
  };

  return <HeadlineButton onClick={handleListItem}>{children}</HeadlineButton>;
}

const HeadlineButton = styled.button`
  border: none;
  background: none;
  margin-right: auto;
  color: var(--white);
  line-height: 1.5rem;
  cursor: pointer;
`;
