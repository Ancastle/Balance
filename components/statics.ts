import { Category } from "./types";

export const LANGUAGES = {
  footer: {
    home: ["Home", "Inicio"],
    expences: ["Expences", "Egresos"],
    entries: ["Entries", "Ingresos"],
    balance: ["Balance", "Balance"],
    settings: ["Settings", "Opciones"],
  },
  expences: {
    tabs: {
      debit: ["Debit", "Débito"],
      debt: ["Debts", "Deudas"],
    },
    debitLabels: ["Debit Expences", "Egresos a Débito"],
  },
};

export const STORAGE = {
  transactions: "FAppTransactions",
  categories: "FAppCategories",
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "entry0",
    name: "Otros ingresos",
    type: "entry",
  },
  {
    id: "expence0",
    name: "Otros egresos",
    type: "expence",
  },
];
