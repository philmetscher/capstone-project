import Link from "next/link";
import styled from "styled-components";

import { IconPlus } from "./Icons";

export default function Navigation() {
  return (
    <NavigationWrapper>
      <NavList>
        <NavEntry width="100%">
          <Link href={"/create-entry"} passHref>
            <NavLink width="100%">
              <IconPlus />
              <p>neuer Eintrag</p>
            </NavLink>
          </Link>
        </NavEntry>
      </NavList>
    </NavigationWrapper>
  );
}

const NavigationWrapper = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: var(--main-bg);
  padding: 0 20px 40px;
  margin-top: 20px;

  &:before {
    display: table;
    content: "";
    background: var(--overlap-bg);
    width: 100%;
    height: 50px;
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
  }
`;
const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  background: var(--secondary);
  border-radius: 13px;
  list-style: none;
`;
const NavEntry = styled.li`
  width: ${({ width }) => (width ? width : "auto")};
`;

const NavLink = styled.a`
  display: inline-flex;
  align-items: center;
  flex-flow: column;
  width: 100%;
`;
