const exampleLists = [
  {
    id: "TODOS8ji5eb211edbdc30242ac120002",
    name: "Todos",
    itemCount: [1, 5],
  },
  {
    id: "URLAUBji5eb211edbdc30242ac120002",
    name: "Urlaub",
    itemCount: [0, 0],
  },
  {
    id: "TEILNEHMERLISTEdbdc30242ac120002",
    name: "Teilnehmerliste",
    itemCount: [0, 0],
  },
  {
    id: "EINKAUFi5eb211edbdc30242ac120002",
    name: "Filme",
    itemCount: [0, 0],
  },
  {
    id: "SHOPPING5eb211edbdc30242ac120002",
    name: "Shopping",
    itemCount: [0, 0],
  },
  {
    id: "WEIHNACHTEN211edbdc30242ac120002",
    name: "Weihnachten",
    itemCount: [0, 0],
  },
];
const exampleCategories = [
  {
    id: "HAUSHALT4eb211edbdc30242ac120002",
    name: "Haushalt",
    default: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
    hasDisabledItems: true,
  },
  {
    id: "HAUSTIEREeb211edbdc30242ac120002",
    name: "Haustiere",
    default: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
    hasDisabledItems: false,
  },
];
const exampleListItems = [
  {
    id: "431d25ee4eb211edbdc30242ac120002",
    name: "Zimmer aufräumen",
    categoryId: "HAUSHALT4eb211edbdc30242ac120002",
    checked: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
    disabled: true,
  },
  {
    id: "431d27564eb211edbdc30242ac120002",
    name: "Zimmer wischen",
    categoryId: "HAUSHALT4eb211edbdc30242ac120002",
    checked: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
    disabled: false,
  },
  {
    id: "431d28824eb211edbdc30242ac120002",
    name: "Wäsche waschen",
    categoryId: "HAUSHALT4eb211edbdc30242ac120002",
    checked: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
    disabled: false,
  },
  {
    id: "431d29a44eb211edbdc30242ac120002",
    name: "Mein Hund nicht verhungern lassen",
    categoryId: "HAUSTIEREeb211edbdc30242ac120002",
    checked: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
    disabled: false,
  },
  {
    id: "431d2d8c4eb211edbdc30242ac120002",
    name: "Mit meinem Hund spazieren gehen",
    categoryId: "HAUSTIEREeb211edbdc30242ac120002",
    checked: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
    disabled: false,
  },
];

export { exampleLists, exampleCategories, exampleListItems };
