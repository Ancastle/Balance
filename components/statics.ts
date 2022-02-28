import { CategoryType, Preferences } from "./types";

export const LANGUAGES = {
  date: ["Date", "Fecha"],
  hour: ["Hour", "Hora"],
  cancel: ["Cancel", "Cancelar"],
  add: ["Add", "Agregar"],
  delete: ["Delete", "Eliminar"],
  save: ["Save", "Guardar"],
  name: ["Name", "Nombre"],
  value: ["Value", "Valor"],
  edit: ["Edit", "Editar"],
  pay: ["Pay", "Pagar"],
  selectCategory: ["Select a category", "Elige una categoria"],
  editingTransaction: ["Editing transaction", "Editando transacción"],
  otherExpences: ["Other expences", "Otros egresos"],
  otherEntries: ["Other entries", "Otros ingresos"],
  footer: {
    home: ["Home", "Inicio"],
    expences: ["Expences", "Egresos"],
    entries: ["Entries", "Ingresos"],
    balance: ["Balance", "Balance"],
    settings: ["Settings", "Opciones"],
  },
  home: {
    tabs: { home: ["Home", "Inicio"], history: ["History", "Historial"] },
  },
  expence: {
    tabs: {
      debit: ["Debits", "Débitos"],
      debt: ["Pending debts", "Deudas"],
      creditCard: {
        tabLabel: ["Credit Card", "Tarjeta Crédito"],
        debt: ["Total debt", "Deuda total"],
        remaining: ["Remaining balance", "Saldo restante"],
        addTransaction: ["Add expence", "Agregar egreso"],
        payTotal: ["Pay total", "Pagar el total"],
        otherValue: ["Other value", "Otro valor"],
        payingCard: ["Paying Credit Card", "Pagando Tarjeta de Crédito"],
      },
    },
    debitLabels: ["Debit Expences", "Egresos a Débito"],
    adding: ["Adding expence", "Agregando egreso"],
  },
  entry: {
    tabs: {
      debit: ["Entries", "Ingresos"],
    },
    debitLabels: ["Entries", "Ingresos"],
    adding: ["Adding entry", "Agregando ingreso"],
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
        addEntries: ["Add entry categories", "Agregar categorias de ingresos"],
        addExpences: [
          "Add expence categories",
          "Agregar categorias de egresos",
        ],
        editEntries: ["Edit entry categories", "Editar categorias de ingresos"],
        editExpences: [
          "Edit expence categories",
          "Editar categorias de egresos",
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
      preferences: {
        tabLabel: ["Preferences", "Preferencias"],
        label: ["Manage preferences", "Administrar preferencias"],
        changeLanguage: ["Change language", "Cambiar idioma"],
        changeLanguageModalTitle: ["Change language", "Cambiar idioma"],
        changeLanguagePlaceholder: [
          "Select a language",
          "Selecciona un idioma",
        ],
      },
    },
  },
};

export const STORAGE = {
  transactions: "FAppTransactions",
  categories: "FAppCategories",
  preferences: "FAppPreferences",
  ccTransactions: "FAppCCTransactions",
  people: "FAppPeople",
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

export const INITIAL_PREFERENCES: Preferences = {
  appLanguage: 1,
};
