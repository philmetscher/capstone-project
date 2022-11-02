import { useState } from "react";
import styled from "styled-components";
import { IconCheck } from "./Icons";

export default function Checkbox({ id, onChange, checked }) {
  if (id) {
    return (
      <CheckboxGroup>
        <Input name={"checkbox" + id} type="checkbox" onChange={onChange} />
        <Label checked={checked} htmlFor={"checkbox" + id}>
          {checked && <IconCheck />}
        </Label>
      </CheckboxGroup>
    );
  }
}

const CheckboxGroup = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;
const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
`;
const Label = styled.label`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid var(--white);
  border-radius: 6px;
  background: ${({ checked }) => (checked ? "var(--white)" : "none")};

  [class*="icon-"] {
    position: relative;
    top: -1px;
    left: -2px;
    color: var(--card-bg);
  }
`;
