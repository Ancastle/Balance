import { CategoryType } from "./types";

export const LANGUAGES = {
  cancel: ["Cancel", "Cancelar"],
  add: ["Add", "Agregar"],
  delete: ["Delete", "Eliminar"],
  save: ["Save", "Guardar"],
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
  balance: {
    tabs: {
      balance: ["Balance", "Balance"],
    },
  },
  settings: {
    tabs: {
      categories: {
        tabLabel: ["Categories", "Categorias"],
        label: ["Manage categories", "Administrar categorias"],
        manageEntries: [
          "Manage entry categories",
          "Administrar categorias de ingresos",
        ],
        manageExpences: [
          "Manage expence categories",
          "Administrar categorias de egresos",
        ],
        expencesNote: [
          "Note: Transactions that belong to deleted categories will be assigned to 'Other expences'",
          "Nota: Los registros que pertenezcan a las categorias eliminadas serán asignados a la categoría 'Otros egresos'",
        ],
        entryNote: [
          "Note: Transactions that belong to deleted categories will be assigned to 'Other entries'",
          "Nota: Los registros que pertenezcan a las categorias eliminadas serán asignados a la categoría 'Otros ingresos'",
        ],
        deleteLabel: ["Delete category", "Eliminar categoría"],
        confirmDelete: [
          "This action will delete the category",
          "Esta acción eliminará la categoría",
        ],
        addCategory: ["Adding category", ["Agregar categoría"]],
        editCategory: ["Editing category", ["Editar categoría"]],
        categoryNameExists: [
          "A category with this name already exists",
          "Ya existe una categoría con este nombre",
        ],
        expenceCategories: ["Expence Categories", "Categorias de egreso"],
        entryCategories: ["Entry Categories", "Categorias de ingreso"],
        categoryName: ["Category name", "Nombre de la categoría"],
        categoryNameEmpty: [
          "Please enter a category name",
          "Se debe ingresar un nombre para la categoria",
        ],
      },
      preferences: ["Preferences", "Preferencias"],
    },
  },
};

export const STORAGE = {
  transactions: "FAppTransactions",
  categories: "FAppCategories",
};

export const INITIAL_CATEGORIES: CategoryType[] = [
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
