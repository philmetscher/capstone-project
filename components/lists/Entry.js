import Link from "next/link";
import styled from "styled-components";

//Components
import { PTag } from "../HtmlComponents";
import { MdOutlineDragHandle, MdEdit } from "react-icons/md"; //Icons

export default function OverviewListEntry({ id, children }) {
  return (
    <ListEntry>
      <DragWrapper>
        <MdOutlineDragHandle size="24px" />
      </DragWrapper>
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
  gap: 10px;
  width: 100%;
  background: var(--card-bg);
  border-bottom: 1px solid var(--white);
  padding: 0 20px;

  &:last-child {
    border-bottom-color: var(--card-bg);
  }

  > * {
    padding: 20px 0;
  }
`;
const DragWrapper = styled.div`
  width: 24px;
  height: 64px;
`;
const ListEntryLink = styled.a`
  display: inline-block;
  width: calc(100% - 48px);
`;
const EditAnchor = styled.a`
  display: inline-block;
  width: 24px;
  height: 64px;
`;
