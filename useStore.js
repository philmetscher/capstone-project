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
    }),
    {
      name: "listItems",
    }
  )
);
