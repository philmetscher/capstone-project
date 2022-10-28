import styled from "styled-components";

const PTag = styled.p`
  font-style: normal;
`;

const PTagBold = styled(PTag)`
  font-weight: 700;
`;

const PTagSmall = styled.p`
  font-size: 0.85rem;
  line-height: 1rem;
`;

export { PTag, PTagBold, PTagSmall };
