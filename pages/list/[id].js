import styled from "styled-components";
import { useStore } from "../../useStore";
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

  const lists = useStore((state) => state.lists);
  const categories = useStore((state) => state.categories);

  let list;
  if (lists) {
    list = lists.find((list) => list.id === id);
  }

  let activeCategories = null;
  let inactiveCategories = null;
  if (list) {
    activeCategories = categories.filter(
      (category) => category.listId === list.id
    );
    inactiveCategories = categories.filter(
      (category) => category.listId === list.id && category.hasDisabledItems
    );
  }

  if (activeCategories === null) return;

  return (
    <>
      <Layout>{list.name}</Layout>
      <ListMain>
        <CategoriesSection>
          {!activeCategories.length && (
            <Info>Derzeit noch keine Einträge oder Kategorien vorhanden</Info>
          )}
          {activeCategories.map((category) => (
            <DynamicCategory
              key={category.id}
              category={category}
              listId={id}
            />
          ))}
          {inactiveCategories &&
            inactiveCategories.map((category) => (
              <DynamicCategory
                key={category.id}
                category={category}
                listId={id}
                hasDisabledItems
              />
            ))}
        </CategoriesSection>
      </ListMain>
      <DynamicNavigation listId={id} />
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
