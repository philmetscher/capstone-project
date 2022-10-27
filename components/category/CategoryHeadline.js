import styled from "styled-components";
import Link from "next/link";

import { IconChevronDown, IconChevronUp, IconEdit } from "./../Icons";
import { PTagBold } from "./../HtmlComponents";

export default function CategoryHeadline({
  children,
  id,
  extended,
  handleClick,
}) {
  return (
    <CategoryHeadlineWrapper onClick={handleClick}>
      <Link href={"/edit-category/" + id} passHref>
        <EditAnchor onClick={(event) => event.stopPropagation()}>
          <PTagBold>{children}</PTagBold>
          <IconEdit />
        </EditAnchor>
      </Link>
      {extended ? <IconChevronDown /> : <IconChevronUp />}
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
const EditAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;

  i {
    width: 20px;
    height: 20px;

    &:before {
      width: 20px;
      height: 20px;
    }
  }

  &:hover {
    > * {
      color: var(--secondary);
    }
  }
`;
