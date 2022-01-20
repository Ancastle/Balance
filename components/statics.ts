import { Category } from "./types";

export const LANGUAGES = {
  footer: {
    home: ["Home", "Inicio"],
    expences: ["Expences", "Egresos"],
    entries: ["Entries", "Ingresos"],
    balance: ["Balance", "Balance"],
    settings: ["Settings", "Opciones"],
  },
  expence: {
    tabs: {
      debit: ["Debits", "Débitos"],
      debt: ["Pending debts", "Deudas pendientes"],
    },
    debitLabels: ["Debit Expences", "Egresos a Débito"],
  },
  entry: {
    tabs: {
      debit: ["Debits", "Débitos"],
      loans: ["Pending loans", "Prestamos pendientes"],
    },
    debitLabels: ["Debit Entries", "Ingresos a Débito"],
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
