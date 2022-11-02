import create from "zustand";
import { persist } from "zustand/middleware";

import { nanoid } from "nanoid";

import { exampleCategories, exampleListItems } from "./lib/db";

export const useCategoriesStore = create(
  persist(
    (set, get) => ({
      categories: exampleCategories,

      addCategory: (newCategoryId, newCategoryName, isDefault = false) => {
        set({
          categories: [
            ...get().categories,
            {
              id: newCategoryId,
              name: newCategoryName,
              default: isDefault,
            },
          ],
        });
      },
      editCategory: (categoryId, newName) => {
        const currentCategory = get().categories.find(
          (category) => category.id === categoryId
        );
        if (currentCategory) {
          const newCategory = {
            id: currentCategory.id,
            name: newName,
            default: currentCategory.default,
          };
          set({
            categories: get().categories.map((category) =>
              category.id === categoryId ? newCategory : category
            ),
          });
        }
      },
      deleteCategory: (categoryId) => {
        const newCategories = get().categories.filter(
          (category) => category.id != categoryId
        );

        set({
          categories: newCategories,
        });
      },
    }),
    {
      name: "categories",
    }
  )
);

export const useListItemsStore = create(
  persist(
    (set, get) => ({
      listItems: exampleListItems,

      addListItem: (newListItemName, categoryId) => {
        set({
          listItems: [
            ...get().listItems,
            {
              id: nanoid(),
              name: newListItemName,
              categoryId: categoryId,
              checked: false,
            },
          ],
        });
      },
      editListItem: (listItemId, newName, newCategoryId) => {
        const currentListItem = get().listItems.find(
          (listItem) => listItem.id === listItemId
        );
        if (currentListItem) {
          const newListItem = {
            id: currentListItem.id,
            name: newName,
            categoryId: newCategoryId,
            checked: currentListItem.checked,
          };
          set({
            listItems: get().listItems.map((listItem) =>
              listItem.id === listItemId ? newListItem : listItem
            ),
          });
        }
      },
      deleteListItem: (listItemId) => {
        const newListItems = get().listItems.filter(
          (listItem) => listItem.id != listItemId
        );

        set({
          listItems: newListItems,
        });
      },
      updateListItemIndex: (destination, source) => {
        const swappedListItem = get().listItems[destination];
        const draggedListItem = get().listItems[source];

        const newSortedListItems = get().listItems.map((item) => {
          switch (item) {
            case swappedListItem:
              return draggedListItem;
            case draggedListItem:
              return swappedListItem;
            default:
              return item;
          }
        });

        set({
          listItems: newSortedListItems,
        });
      },
      updateCheck: (listItemId) => {
        const newListItems = get().listItems.map((item) => {
          if (item.id === listItemId) {
            return {
              ...item,
              checked: !item.checked,
            };
          }
          return item;
        });

        set({
          listItems: newListItems,
        });

        get().checkAnyListItemChecked();
      },

      anyListItemChecked: false,
      checkAnyListItemChecked: () => {
        const state = get().listItems.some((item) => item.checked);

        set({
          anyListItemChecked: state,
        });
      },
    }),
    {
      name: "listItems",
    }
  )
);
