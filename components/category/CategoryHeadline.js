import styled from "styled-components";
import Link from "next/link";

//Components
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdEdit } from "react-icons/md"; //Icons
import { PTagBold } from "./../HtmlComponents";

export default function CategoryHeadline({
  children,
  id,
  extended,
  handleClick,
  listId = { listId },
  disabled,
}) {
  return (
    <CategoryHeadlineWrapper onClick={handleClick} isDisabled={disabled}>
      {!disabled ? (
        <Link
          href={{
            pathname: "/edit-category/" + id,
            query: {
              id: id,
              listId: listId,
            },
          }}
          passHref
        >
          <EditAnchor onClick={(event) => event.stopPropagation()}>
            <PTagBold>{children}</PTagBold>
            <MdEdit size="24px" />
          </EditAnchor>
        </Link>
      ) : (
        <PTagBold>{children}</PTagBold>
      )}
      {extended ? (
        <MdKeyboardArrowDown size="24px" />
      ) : (
        <MdKeyboardArrowUp size="24px" />
      )}
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
  background: var(
    ${({ isDisabled }) => (isDisabled ? "--gray" : "--primary-gradient")}
  );
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
