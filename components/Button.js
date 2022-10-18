import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 52px;
  gap: 12px;
  border: none;
  border-radius: 55px;
  width: 100%;
  color: var(--white);
  background: var(
    ${({ isPrimary }) =>
      isPrimary ? "--primary-gradient" : "--secondary-gradient"}
  );

  &:hover {
    background: var(
      ${({ isPrimary }) => (isPrimary ? "--primary" : "--secondary")}
    );
  }
`;

const ButtonSmall = styled(Button)`
  width: auto;
`;

const ButtonIcon = styled(Button)`
  padding: 14px;
`;

export { ButtonSmall };
