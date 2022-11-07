import styled from "styled-components";
import { useCategoriesStore, useListsStore } from "../../useStore";
import dynamic from "next/dynamic";

// Components
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Info from "../../components/Info";
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
  const router = useRouter();
  const { id } = router.query;

  const lists = useListsStore((state) => state.lists);
  const categories = useCategoriesStore((state) => state.categories);

  let list;
  if (lists) {
    list = lists.find((list) => list.id === id);
  }

  let filteredCategories;
  if (list) {
    filteredCategories = categories.filter((category) =>
      category.listId === list.id ? category : ""
    );
  }

  if (!list) return;

  console.log(filteredCategories);

  return (
    <>
      <Layout>{list.name}</Layout>
      <ListMain>
        <CategoriesSection>
          {!filteredCategories.length && (
            <Info>Derzeit noch keine Einträge oder Kategorien vorhanden</Info>
          )}
          {filteredCategories &&
            filteredCategories.map((category) => (
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
