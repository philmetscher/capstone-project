import styled from "styled-components";
import { IconChevronDown, IconChevronUp, IconList } from "./Icons";

import { PTag } from "./HtmlComponents";
import { useState } from "react";

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
  bottom: 0.96875rem;
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
        inputIcon={inputIcon}
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
  padding: ${({ inputIcon, iconBefore }) =>
    inputIcon && iconBefore ? "14px 12px 14px 46px" : "14px 46px 14px 12px"};
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <Group>
      <Label>{labelText}</Label>
      <Selection className="noselect">
        <SelectionHeader
          className="noselect"
          onClick={toggling}
          inputIcon={inputIcon}
          iconBefore={iconBefore}
          isOpen={isOpen}
        >
          <InputIcon iconBefore={iconBefore}>
            {inputIcon === "chevronDown" &&
              (!isOpen ? <IconChevronDown /> : <IconChevronUp />)}
          </InputIcon>
          {selectedOption.name}
        </SelectionHeader>
        {isOpen && (
          <SelectionList>
            {options.map((option) => (
              <SelectionOption
                className="noselect"
                key={option.id}
                onClick={onOptionClicked(option)}
                inputIcon={inputIcon}
                iconBefore={iconBefore}
              >
                {option.name}
              </SelectionOption>
            ))}
          </SelectionList>
        )}
      </Selection>
      <input
        name={name}
        style={{ display: "none" }}
        value={selectedOption.id}
        readOnly
      />
    </Group>
  );
}

const Selection = styled.div`
  position: relative;
  z-index: 1000;
`;
const SelectionHeader = styled.div`
  background: var(--primary-gradient);
  color: var(--white);
  padding: ${({ inputIcon, iconBefore }) =>
    inputIcon && iconBefore ? "14px 12px 14px 46px" : "14px 46px 14px 12px"};
  position: relative;
  cursor: pointer;
  border-radius: ${({ isOpen }) => (isOpen ? "13px 13px 0 0" : "13px")};
`;
const SelectionList = styled.ul`
  list-style-type: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
`;
const SelectionOption = styled.li`
  background: var(--card-bg);
  color: var(--white);
  padding: ${({ inputIcon, iconBefore }) =>
    inputIcon && iconBefore ? "14px 12px 14px 46px" : "14px 46px 14px 12px"};
  cursor: pointer;

  &:last-child {
    border-radius: 0 0 13px 13px;
  }
`;

export { Input, Select };
