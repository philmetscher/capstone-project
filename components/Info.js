import styled from "styled-components";
import { MdInfo } from "react-icons/md"; //Icons

export default function Info({ children }) {
  return (
    <InfoWrapper>
      <MdInfo size="24px" />
      <InfoText>{children}</InfoText>
    </InfoWrapper>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card-bg);
  padding: 13px 19px 13px 32px;
  border-radius: 0 13px 13px 0;
  border: 1px solid var(--error);
  border-left: none;
  z-index: 4000;
  max-width: 400px;
  position: absolute;
  left: 0;
  right: 50px;
  top: 24px;

  [class*="icon-"] {
    color: var(--error);
  }
`;
const InfoText = styled.p`
  font-size: 0.875rem;
  line-height: 1.1875rem;
`;
