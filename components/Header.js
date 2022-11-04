import Image from "next/image";
import styled from "styled-components";

export default function Header({ children }) {
  return (
    <PageHeader>
      <Image src={"/icons/logo-white.svg"} width="24px" height="24px" />
      <HeaderTitle>{children}</HeaderTitle>
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
  font-size: 1.5rem;
  line-height: 2.0625rem;
  color: var(--white-07);
`;
