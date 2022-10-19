import styled from "styled-components";
import { IconList } from "./Icons";

const Group = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
  position: relative;
`;
const Label = styled.label`
  font-size: 1rem;
  line-height: 1.375rem;
  padding: 0 12px;
`;
const InputIcon = styled.span`
  position: absolute;
  left: ${({ iconBefore }) => (iconBefore ? "12px" : "unset")};
  right: ${({ iconBefore }) => (iconBefore ? "unset" : "12px")};
  bottom: 14px;
  width: 24px;
  height: 24px;
  opacity: 0.5;
`;

function Input({
  children,
  name,
  labelText,
  inputIcon,
  iconBefore = true,
  handleChange,
}) {
  return (
    <Group>
      <Label>{labelText}</Label>
      <StyledInput
        name={name}
        iconBefore={iconBefore}
        placeholder={children}
        onChange={(event) => handleChange(event)}
      />
      <InputIcon iconBefore={iconBefore}>
        {inputIcon === "list" && <IconList />}
      </InputIcon>
    </Group>
  );
}

const StyledInput = styled.input`
  padding: 14px 12px;
  background: var(--card-bg);
  border: none;
  border-radius: 13px;
  padding: ${({ iconBefore }) =>
    iconBefore ? "14px 12px 14px 46px" : "14px 46px 14px 12px"};
  color: var(--white);

  &::placeholder {
    color: var(--white-05);
  }
`;

function Select({
  children,
  name,
  labelText,
  inputIcon,
  iconBefore = true,
  options,
  handleChange,
}) {
  return (
    <Group>
      <Label>{labelText}</Label>
      <select
        name={name}
        defaultValue={children}
        onChange={(event) => handleChange(event)}
      >
        <option disabled>{children}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </Group>
  );
}

export { Input, Select };
