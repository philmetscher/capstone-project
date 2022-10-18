import styled from "styled-components";

import { IconLogo } from "../Icons/Icons";

export default function Header() {
  return (
    <PageHeader>
      <IconLogo />
      <HeaderTitle>Todo</HeaderTitle>
    </PageHeader>
  );
}

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;

  [class*="icon"] {
    color: var(--primary);
  }
`;
const HeaderTitle = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  color: var(--white-07);
`;
