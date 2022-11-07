import { PTag } from "./HtmlComponents";

export default function OverviewListEntry({ children }) {
  return (
    <li>
      <PTag>{children}</PTag>
    </li>
  );
}
