import styled from "styled-components";

//Components
import { PTag } from "./HtmlComponents";

export default function OverviewListEntry({ children }) {
  return (
    <ListEntry>
      <PTag>{children}</PTag>
    </ListEntry>
  );
}

const ListEntry = styled.li`
  width: 100%;
  padding: 20px 20px 19px 20px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--white);

  &:last-child {
    border-bottom-color: var(--card-bg);
  }
`;
