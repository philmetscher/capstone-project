import styled from "styled-components";
import { useCategoriesStore } from "../../useStore";
import dynamic from "next/dynamic";

// Components
import Layout from "../../components/Layout";
const DynamicNavigation = dynamic(() => import("../../components/Navigation"), {
  ssr: false,
});

const DynamicCategory = dynamic(
  () => import("../../components/category/Category"),
  {
    ssr: false,
  }
);

export default function List() {
  const categories = useCategoriesStore((state) => state.categories);

  return (
    <>
      <Layout>Todos</Layout>
      <ListMain>
        <CategoriesSection>
          {!categories && <p>Loading...</p>}
          {categories &&
            categories.map((category) => (
              <DynamicCategory key={category.id} category={category} />
            ))}
        </CategoriesSection>
      </ListMain>
      <DynamicNavigation />
    </>
  );
}

const ListMain = styled.main`
  height: calc(100vh - 182px);
  overflow-y: auto;
`;
const CategoriesSection = styled.section`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding-bottom: 40px;
`;
