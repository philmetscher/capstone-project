import styled from "styled-components";
import { useStore } from "../../useStore";

export default function CategoryListItemHeadline({ id, children }) {
  const toggleListItemDisabled = useStore(
    (state) => state.toggleListItemDisabled
  );

  const handleListItem = (event) => {
    event.preventDefault();

    toggleListItemDisabled(id);
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
