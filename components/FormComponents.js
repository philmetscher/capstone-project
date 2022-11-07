import styled from "styled-components";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdList,
  MdAdd,
} from "react-icons/md"; //Icons

import { PTag } from "./HtmlComponents";
import { useEffect, useState } from "react";

const FormMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 81px);
  padding: 0 20px;
  position: relative;
`;

const StyledForm = styled.form`
  margin-top: -81px;
  display: flex;
  flex-flow: column;
  gap: 10px;
  width: 100%;
`;

const Group = styled.fieldset`
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
  error = false,
  value = "",
}) {
  return (
    <Group>
      <Label htmlFor={name}>{labelText}</Label>
      <StyledInput
        className={error ? "error" : ""}
        name={name}
        inputIcon={inputIcon}
        iconBefore={iconBefore}
        placeholder={children}
        error={error}
        onKeyPress={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
        onKeyUp={(event) => handleChange(event)}
        onInput={(event) => handleChange(event)}
        onChange={(event) => handleChange(event)}
        defaultValue={value || ""}
      />
      <InputIcon iconBefore={iconBefore}>
        {inputIcon === "list" && <MdList size="24px" />}
        {inputIcon === "plus" && <MdAdd size="24px" />}
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
  outline: none;

  &:focus {
    padding: ${({ inputIcon, iconBefore }) =>
      inputIcon && iconBefore ? "13px 11px 13px 45px" : "13px 45px 13px 11px"};
    border: 1px solid var(--primary);
  }
  &::placeholder {
    color: var(--white-05);
  }

  &.error {
    padding: ${({ inputIcon, iconBefore }) =>
      inputIcon && iconBefore ? "13px 11px 13px 45px" : "13px 45px 13px 11px"};
    border: 1px solid var(--error);
  }
`;

function Select({
  children,
  name,
  labelText,
  inputIcon,
  iconBefore = true,
  options,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0] || {});

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  if (options.length === 0) return;

  return (
    <Group>
      <Label htmlFor={name}>{labelText}</Label>
      <Selection className="noselect" disabled={disabled}>
        <SelectionHeader
          className="noselect"
          onClick={disabled ? () => setIsOpen(false) : toggling}
          inputIcon={inputIcon}
          iconBefore={iconBefore}
          isOpen={isOpen}
          disabled={disabled}
        >
          <InputIcon iconBefore={iconBefore}>
            {inputIcon === "chevronDown" &&
              (!isOpen ? (
                <MdKeyboardArrowDown size="24px" />
              ) : (
                <MdKeyboardArrowUp size="24px" />
              ))}
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
  opacity: ${({ disabled }) => disabled && ".5"};
`;
const SelectionHeader = styled.div`
  background: var(--primary-gradient);
  color: var(--white);
  padding: ${({ inputIcon, iconBefore }) =>
    inputIcon && iconBefore ? "14px 12px 14px 46px" : "14px 46px 14px 12px"};
  position: relative;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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

export { FormMain, StyledForm, Input, Select };
