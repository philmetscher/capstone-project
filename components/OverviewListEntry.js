import Link from "next/link";
import styled from "styled-components";

//Components
import { PTag } from "./HtmlComponents";
import { MdEdit } from "react-icons/md"; //Icons

export default function OverviewListEntry({ id, children }) {
  return (
    <ListEntry>
      <Link href={"/list/" + id} passHref>
        <ListEntryLink>
          <PTag>{children}</PTag>
        </ListEntryLink>
      </Link>
      <Link href={"/edit-list/" + id} passHref>
        <EditAnchor>
          <MdEdit size="24px" />
        </EditAnchor>
      </Link>
    </ListEntry>
  );
}

const ListEntry = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--card-bg);
  border-bottom: 1px solid var(--white);

  &:last-child {
    border-bottom-color: var(--card-bg);
  }
`;
const ListEntryLink = styled.a`
  display: inline-block;
  width: calc(100% - 64px);
  padding: 20px 0 19px 20px;
`;
const EditAnchor = styled.a`
  display: inline-block;
  width: 64px;
  height: 64px;
  padding: 20px 20px 19px 20px;
`;
