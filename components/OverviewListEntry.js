import Link from "next/link";
import styled from "styled-components";

//Components
import { PTag } from "./HtmlComponents";

export default function OverviewListEntry({ id, children }) {
  return (
    <ListEntry>
      <Link href={"/list/" + id} passHref>
        <ListEntryLink>
          <PTag>{children}</PTag>
        </ListEntryLink>
      </Link>
    </ListEntry>
  );
}

const ListEntry = styled.li`
  width: 100%;
  background: var(--card-bg);
  border-bottom: 1px solid var(--white);

  &:last-child {
    border-bottom-color: var(--card-bg);
  }
`;
const ListEntryLink = styled.a`
  display: block;
  width: 100%;
  padding: 20px 20px 19px 20px;
`;
