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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonSmall = styled(Button)`
  display: inline-flex;
  width: auto;
`;

const ButtonIcon = styled(ButtonSmall)`
  padding: 14px;
`;

export { Button, ButtonSmall, ButtonIcon };
