import create from "zustand";
import { persist } from "zustand/middleware";

import { nanoid } from "nanoid";

import { exampleLists, exampleCategories, exampleListItems } from "./lib/db";

export const useStore = create(
  persist(
    (set, get) => ({
      lists: exampleLists,
      categories: exampleCategories,
      listItems: exampleListItems,

      /* 'lists' functions */
      addList: (newListName) => {
        set({
          lists: [
            ...get().lists,
            {
              id: nanoid(),
              name: newListName,
            },
          ],
        });
      },
      editList: (id, newListName) => {
        const newLists = get().lists.map((list) =>
          list.id === id ? { ...list, name: newListName } : list
        );

        set({
          lists: newLists,
        });
      },
      updateListIndex: (destination, source) => {
        const swappedList = get().lists[destination];
        const draggedList = get().lists[source];

        const newSortedLists = get().lists.map((item) => {
          switch (item) {
            case swappedList:
              return draggedList;
            case draggedList:
              return swappedList;
            default:
              return item;
          }
        });

        set({
          lists: newSortedLists,
        });
      },

      /* 'categories' functions */
      addCategory: (
        newCategoryId,
        newCategoryName,
        listId,
        isDefault = false
      ) => {
        set({
          categories: [
            ...get().categories,
            {
              id: newCategoryId,
              name: newCategoryName,
              default: isDefault,
              listId: listId,
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
            listId: currentCategory.listId,
            hasDisabledItems: currentCategory.disabled,
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

      /* 'listItems' functions */
      addListItem: (newListItemName, categoryId) => {
        set({
          listItems: [
            ...get().listItems,
            {
              id: nanoid(),
              name: newListItemName,
              categoryId: categoryId,
              checked: false,
              disabled: false,
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
            disabled: currentListItem.disabled,
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
      toggleListItemCheck: (listItemId) => {
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

        get().updateAnyListItemChecked();
      },
      updateAnyListItemChecked: (state = false) => {
        let anyChecked = state;
        if (!state) anyChecked = get().listItems.some((item) => item.checked);

        set({
          anyListItemChecked: anyChecked,
        });
      },
      toggleListItemDisabled: (listItemId) => {
        const currentListItem = get().listItems.find(
          (listItem) => listItem.id === listItemId
        );
        const newListItems = get().listItems.map((item) =>
          item.id === listItemId ? { ...item, disabled: !item.disabled } : item
        );

        let categoriesDisablingList = [];
        newListItems.forEach((listItem) =>
          listItem.disabled
            ? categoriesDisablingList.push(listItem.categoryId)
            : ""
        );

        let newCategories = get().categories;
        newCategories = newCategories.map((category) => {
          if (!categoriesDisablingList.length) {
            return {
              ...category,
              hasDisabledItems: false,
            };
          }

          return {
            ...category,
            hasDisabledItems: categoriesDisablingList.includes(category.id),
          };
        });

        set({
          listItems: newListItems,
          categories: newCategories,
        });
      },
    }),
    {
      name: "store",
    }
  )
);
