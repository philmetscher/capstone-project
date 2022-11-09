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
      updateItemCount: (listId, itemsCompleted, itemsUncompleted) => {
        const newLists = get().lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              itemCount: [itemsCompleted, itemsUncompleted],
            };
          }
          return list;
        });

        set({
          lists: newLists,
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
            hasDisabledItems: currentCategory.hasDisabledItems,
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
      updateListItemIndex: (destination, source, onlyDisabledItems) => {
        let destinationDroppableId = destination.droppableId;

        const destinationListItems = get().listItems.filter(
          (item) =>
            item.categoryId === destinationDroppableId &&
            item.disabled === onlyDisabledItems
        );

        const destinationListItem = destinationListItems[destination.index];
        const sourceListItem = destinationListItems[source.index];

        const newSortedListItems = get().listItems.map((item) => {
          switch (item) {
            case destinationListItem:
              return sourceListItem;
            case sourceListItem:
              return destinationListItem;
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
      toggleListItemDisabled: (listItem) => {
        const newLists = get().lists.map((list) =>
          list.id === listItem.listId
            ? {
                ...list,
                itemCount: [
                  (list.itemCount[0] += listItem.disabled ? -1 : 1),
                  list.itemCount[1],
                ],
              }
            : list
        );

        const newListItems = get().listItems.map((item) =>
          item.id === listItem.id ? { ...item, disabled: !item.disabled } : item
        );

        let categoriesDisablingList = [];
        newListItems.forEach((listItem) =>
          listItem.disabled
            ? categoriesDisablingList.push(listItem.categoryId)
            : ""
        );

        get().updateCategoryHasDisabledItems(categoriesDisablingList);

        set({
          listItems: newListItems,
          lists: newLists,
        });
      },
      updateCategoryHasDisabledItems: (categoriesDisablingList) => {
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
          categories: newCategories,
        });
      },
    }),
    {
      name: "store",
    }
  )
);
