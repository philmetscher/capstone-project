const exampleLists = [
  {
    id: "TODOS8ji5eb211edbdc30242ac120002",
    name: "Todos",
  },
  {
    id: "URLAUBji5eb211edbdc30242ac120002",
    name: "Urlaub",
  },
  {
    id: "TEILNEHMERLISTEdbdc30242ac120002",
    name: "Teilnehmerliste",
  },
];
const exampleCategories = [
  {
    id: "HAUSHALT4eb211edbdc30242ac120002",
    name: "Haushalt",
    default: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
  },
  {
    id: "HAUSTIEREeb211edbdc30242ac120002",
    name: "Haustiere",
    default: false,
    listId: "TODOS8ji5eb211edbdc30242ac120002",
  },
];
const exampleListItems = [
  {
    id: "431d25ee4eb211edbdc30242ac120002",
    name: "Zimmer aufräumen",
    categoryId: "HAUSHALT4eb211edbdc30242ac120002",
    checked: false,
  },
  {
    id: "431d27564eb211edbdc30242ac120002",
    name: "Zimmer wischen",
    categoryId: "HAUSHALT4eb211edbdc30242ac120002",
    checked: false,
  },
  {
    id: "431d28824eb211edbdc30242ac120002",
    name: "Wäsche waschen",
    categoryId: "HAUSHALT4eb211edbdc30242ac120002",
    checked: false,
  },
  {
    id: "431d29a44eb211edbdc30242ac120002",
    name: "Mein Hund nicht verhungern lassen",
    categoryId: "HAUSTIEREeb211edbdc30242ac120002",
    checked: false,
  },
  {
    id: "431d2d8c4eb211edbdc30242ac120002",
    name: "Mit meinem Hund spazieren gehen",
    categoryId: "HAUSTIEREeb211edbdc30242ac120002",
    checked: false,
  },
];

export { exampleLists, exampleCategories, exampleListItems };
