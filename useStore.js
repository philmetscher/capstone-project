import create from "zustand";
import { persist } from "zustand/middleware";

import { nanoid } from "nanoid";

import { exampleCategories, exampleListItems } from "./lib/db";

export const useCategoriesStore = create(
  persist(
    (set, get) => ({
      categories: exampleCategories,

      addCategory: (newCategoryId, newCategoryName) => {
        set({
          categories: [
            ...get().categories,
            {
              id: newCategoryId,
              name: newCategoryName,
            },
          ],
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
          };
          set({
            listItems: get().listItems.map((listItem) =>
              listItem.id === listItemId ? newListItem : listItem
            ),
          });
        }
      },
    }),
    {
      name: "listItems",
    }
  )
);
