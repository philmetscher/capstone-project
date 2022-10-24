import styled from "styled-components";
import Link from "next/link";

//Components
import { IconEdit } from "../Icons";
import { PTag } from "./../HtmlComponents";

export default function CategoryListItem({ children, id }) {
  return (
    <CategoryListItemWrapper>
      <PTag>{children}</PTag>
      <Link href={"/edit-entry/" + id} passHref>
        <EditAnchor>
          <IconEdit />
        </EditAnchor>
      </Link>
    </CategoryListItemWrapper>
  );
}

const CategoryListItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 10px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--gray);
  &:last-child {
    border-bottom: 1px solid var(--card-bg);
  }
`;

const EditAnchor = styled.a`
  width: 24px;
  height: 24px;
`;
