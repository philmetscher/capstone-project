import styled from "styled-components";

const ButtonGroup = styled.fieldset`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

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

  &:not(:disabled):hover {
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

export { ButtonGroup, Button, ButtonSmall, ButtonIcon };
