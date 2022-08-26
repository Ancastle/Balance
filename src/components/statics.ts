import { CategoryType, Preferences, Transaction } from "./types";
import { formatISO, sub } from "date-fns";

export const LANGUAGES = {
  helpers: {
    homeScreen: [
      "Expences are shown as Total (necessary, unnecessary)\nCredit card expences are included even before you pay them",
      "Los egresos se muestran como Total (necesarios, innecesarios)\nLos gastos de tarjeta de crédito estan incluidos, incluso antes de pagarlos",
    ],
  },
  payedCreditCard: ["payed your CC", "pagó su TC"],
  cantEditDebtLoans: [
    "Note: Can not edit debt/loan transactions",
    "Nota: No se pueden editar transacciones de prestamo o deuda",
  ],
  personPays: ["pays", "paga"],
  createsADebt: [
    "Note: this will create a debt with",
    "Nota: Esto creará una deuda con",
  ],
  unnamed: ["No reason", "Sin razon"],
  alreadyInDebt: [
    "Note: this will incrase your debt with",
    "Nota: Esto incrementará tu deuda con",
  ],
  isAnotherPerson: ["Is another person paying?", "Pagará otra persona?"],
  isThisALoan: ["Is this a loan?", "Es un prestamo?"],
  isThisNecesary: ["Is this expence necesary?", "Es un egreso necesario?"],
  loanToPerson: ["Select to who", "Selecciona a quien"],
  noLastAction: ["There's no last action", "No hay última acción"],
  lastAction: ["Last action", "Última acción"],
  timeOn: ["on", "el"],
  timeAt: ["at", "a las"],
  entries: ["Entries", "Ingresos"],
  expences: ["Expences", "Egresos"],
  lastDays1: ["Last ", "Resumen de los últimos "],
  lastDays2: ["days summary", "días"],
  welcome: ["Welcome", "Bienvenido/a"],
  lastMonthSummary: ["Last month summary", "Resumen del mes pasado"],
  currentMonthSummary: ["Current month summary", "Resumen del mes presente"],
  selectTransactionType: [
    "Select a transaction type",
    "Selecciona el tipo de transacción",
  ],
  payCreditCard: ["Credit card payment for", "Pago tarjeta de crédito por"],
  history: ["History", "Historial"],
  historyWith: ["History with", "Historial con"],
  createCategory: ["Create category", "Crear categoría"],
  editCategory: ["Edit category", "Editar categoría"],
  deleteCategory: ["Delete category", "Eliminar categoría"],
  addCCTransaction: ["Add CC expence", "Agregar egreso a TC"],
  addCCPayment: ["Add CC payment", "Agregar pago de TC"],
  editCCTransaction: ["Edit CC expence", "Editar egreso de TC"],
  addPerson: ["Add person", "Agregar persona"],
  editPerson: ["Edit person", "Editar persona"],
  deletePerson: ["Delete person", "Eliminar persona"],
  addPersonTransaction: [
    "Add person transaction",
    "Agregar transaccion a persona",
  ],
  addTransaction: ["Add transaction", "Agregar transacción"],
  editTransaction: ["Edit transaction", "Editar transacción"],
  numbersByMonth: [
    (typeOfTransactions: string) => `Total of ${typeOfTransactions}s by month`,
    (typeOfTransactions: string) =>
      `Total de ${
        typeOfTransactions === "expence" ? "egreso" : "ingreso"
      }s por mes`,
  ],
  numbersByCategory: [
    (typeOfTransactions: string, name: string) =>
      `Total of ${typeOfTransactions}s of ${name}`,
    (typeOfTransactions: string, name: string) =>
      `Total de ${
        typeOfTransactions === "expence" ? "egreso" : "ingreso"
      }s de ${name}`,
  ],
  currentMonthModalTitle: [
    (monthName: string) => `Totals by category in ${monthName}`,
    (monthName: string) => `Total por categoría en ${monthName}`,
  ],
  currentCategoryCurrentMonthTitle: [
    (monthName: string, categoryName: string) =>
      `${categoryName} in ${monthName}`,
    (monthName: string, categoryName: string) =>
      `${categoryName} en ${monthName}`,
  ],
  selectMonth: ["Select a month", "Selecciona un mes"],
  lineChart: ["Line chart", "Diagrama de lineas"],
  plainNumbers: ["Plain numbers", "Números"],
  pieChart: ["Pie chart", "Diagrama de torta"],
  selectARange: ["Select a period of time", "Selecciona un período de tiempo"],
  expenceWord: ["Expence", "Egreso"],
  entryWord: ["Entry", "Ingreso"],
  graphType: ["Select a type of analysis", "Selecciona un tipo de análisis"],
  graphWord: [
    "Select a filter for the analysis",
    "Selecciona un filtro para el análisis",
  ],
  lineChartTitle: [
    (typeOfTransactions: string, cat: string) =>
      `History of ${typeOfTransactions}s of type '${cat}'`,
    (typeOfTransactions: string, cat: string) =>
      `Historial de ${
        typeOfTransactions === "expence" ? "egreso" : "ingreso"
      }s para la categoria seleccionada`,
  ],
  monthLineChartTitle: [
    (typeOfTransactions: string) => `History of ${typeOfTransactions}s`,
    (typeOfTransactions: string) =>
      `Historial de ${
        typeOfTransactions === "expence" ? "egreso" : "ingreso"
      }s`,
  ],
  pieChartTitle: [
    (typeOfTransactions: string) => `Diagram of ${typeOfTransactions}s `,
    (typeOfTransactions: string) =>
      `Historial de ${
        typeOfTransactions === "expence" ? "egreso" : "ingreso"
      }s`,
  ],
  byCategory: ["By category", "Por categoría"],
  byMonth: ["By month", "Por mes"],
  lastMonths: [
    (num: string) => `Last ${num} months`,
    (num: string) => `Últimos ${num} meses`,
  ],
  months: [
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  ],
  DEVONLYsetTestingRecords: ["DEVONLYsetTestingRecords"],
  date: ["Date", "Fecha"],
  hour: ["Hour", "Hora"],
  cancel: ["Cancel", "Cancelar"],
  add: ["Add", "Agregar"],
  delete: ["Delete", "Eliminar"],
  save: ["Save", "Guardar"],
  name: ["Name", "Nombre"],
  value: ["Value", "Valor"],
  reason: ["Optional reason", "Razón opcional"],
  edit: ["Edit", "Editar"],
  pay: ["Pay", "Pagar"],
  selectCategory: ["Select a category", "Selecciona una categoria"],
  editingTransaction: ["Editing transaction", "Editando transacción"],
  otherExpences: ["Other expences", "Otros egresos"],
  otherEntries: ["Other entries", "Otros ingresos"],
  loan: ["Loan", "Préstamo"],
  payment: ["Payment", "Pago"],
  footer: {
    home: ["Home", "Inicio"],
    expences: ["Expences", "Egresos"],
    entries: ["Entries", "Ingresos"],
    balance: ["Balance", "Balance"],
    settings: ["Settings", "Opciones"],
  },
  home: {
    tabs: {
      home: ["Home", "Inicio"],
      history: ["History", "Historial"],
      charts: ["Analysis", "Análisis"],
    },
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
      debtsLoans: {
        tabLabel: ["Debts/Loans", "Deudas/Prestamos"],
        addPersonButton: ["Add person", "Agregar persona"],
        removePerson: ["Remove person", "Eliminar persona"],
        addTransaction: ["Add transaction", "Agregar transacción"],
        addingPersonButton: ["Adding  person", "Agregando persona"],
        addingTransaction: ["Adding transaction", "Agregando transacción"],
        selectAPerson: ["Select a person", "Selecciona una persona"],
        selectWhoPays: ["Select who pays", "Selecciona quien paga"],
        transactionMe: ["Me", "Yo"],
        addingPerson: ["Adding person", "Agregando persona"],
        isCash: ["In cash", "En efectivo"],
        nameTaken: [
          "There's already a person with that name",
          "Ya hay una persona con ese nombre",
        ],
        valueError: [
          "You can only delete people with 0 balance",
          "Solo se puede borrar personas con saldo 0",
        ],
        moneyExceeded: [
          "Your account does not have that much money",
          "Tu cuenta no tiene suficiente dinero",
        ],
        deletingPerson: ["Removing person", "Eliminando persona"],
        paysToYou: ["pays you", "te paga"],
        youPayTo: ["You pay to", "Pagas a"],
      },
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
  creditCard: "FAppCCTransactions",
  people: "FAppPeople",
  history: "FAHistory",
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
  {
    id: "entry1",
    name: "Pago",
    type: "entry",
  },
  {
    id: "expence1",
    name: "Préstamo",
    type: "expence",
  },
];

export const DEFAULT_PREFERENCES: Preferences = {
  appLanguage: 1,
};

export const DEVONLYTestingRecords: Transaction[] = [
  {
    id: "0",
    name: "ingreso1nov",
    type: "entry",
    categoryId: "entry0",
    value: "1000000",
    date: formatISO(sub(new Date(), { days: 3, months: 1 })),
    isNecesary: false,
  },
  {
    id: "1",
    name: "egreso1nov",
    type: "expence",
    categoryId: "expence0",
    value: "100000",
    isNecesary: false,
    date: formatISO(sub(new Date(), { days: 4, months: 1 })),
  },
  {
    id: "2",
    name: "egreso2nov",
    type: "expence",
    categoryId: "expence0",
    value: "100000",
    date: formatISO(sub(new Date(), { days: 5, months: 1 })),
    isNecesary: false,
  },
  {
    id: "3",
    name: "ingreso1dic",
    type: "entry",
    categoryId: "entry0",
    value: "1000000",
    date: formatISO(sub(new Date(), { days: 3, months: 2 })),
    isNecesary: false,
  },
  {
    id: "4",
    name: "egreso1dic",
    type: "expence",
    categoryId: "expence0",
    value: "10000",
    date: formatISO(sub(new Date(), { days: 4, months: 2 })),
    isNecesary: false,
  },
  {
    id: "5",
    name: "egreso2dic",
    type: "expence",
    categoryId: "expence0",
    value: "1000",
    date: formatISO(sub(new Date(), { days: 5, months: 2 })),
    isNecesary: false,
  },
  {
    id: "6",
    name: "ingreso1ene",
    type: "entry",
    categoryId: "entry0",
    value: "1000000",
    date: formatISO(sub(new Date(), { days: 6, months: 3 })),
    isNecesary: false,
  },
  {
    id: "7",
    name: "egreso1ene",
    type: "expence",
    categoryId: "expence0",
    value: "10000",
    isNecesary: false,
    date: formatISO(sub(new Date(), { days: 7, months: 3 })),
  },
  {
    id: "8",
    name: "egreso2ene",
    type: "expence",
    categoryId: "expence0",
    value: "1000",
    date: formatISO(sub(new Date(), { days: 8, months: 3 })),
    isNecesary: false,
  },
  {
    id: "9",
    name: "ingreso1feb",
    type: "entry",
    categoryId: "entry0",
    value: "1000000",
    date: formatISO(sub(new Date(), { days: 6, months: 4 })),
    isNecesary: false,
  },
  {
    id: "10",
    name: "egreso1feb",
    type: "expence",
    categoryId: "expence0",
    value: "10000",
    date: formatISO(sub(new Date(), { days: 6, months: 4 })),
    isNecesary: false,
  },
  {
    id: "11",
    name: "egreso2feb",
    type: "expence",
    categoryId: "expence0",
    value: "1000",
    isNecesary: false,
    date: formatISO(sub(new Date(), { days: 9, months: 4 })),
  },
  {
    id: "12",
    name: "ingreso1mar",
    type: "entry",
    categoryId: "entry0",
    value: "1000000",
    date: formatISO(sub(new Date(), { days: 6, months: 5 })),
    isNecesary: false,
  },
  {
    id: "13",
    name: "egreso1mar",
    type: "expence",
    categoryId: "expence0",
    value: "10000",
    isNecesary: false,
    date: formatISO(sub(new Date(), { days: 8, months: 5 })),
  },
  {
    id: "14",
    name: "egreso2mar",
    type: "expence",
    categoryId: "expence0",
    value: "1000",
    isNecesary: false,
    date: formatISO(sub(new Date(), { days: 9, months: 5 })),
  },
  {
    id: "15",
    name: "ingreso1abr",
    type: "entry",
    categoryId: "entry0",
    isNecesary: false,
    value: "1000000",
    date: formatISO(sub(new Date(), { days: 6, months: 6 })),
  },
  {
    id: "16",
    name: "egreso1abr",
    type: "expence",
    categoryId: "expence0",
    isNecesary: false,
    value: "10000",
    date: formatISO(sub(new Date(), { days: 8, months: 6 })),
  },
  {
    id: "17",
    name: "egreso2abr",
    type: "expence",
    isNecesary: false,
    categoryId: "expence0",
    value: "1000",
    date: formatISO(sub(new Date(), { days: 10, months: 6 })),
  },
];

export const ALL_LANGUAGES = [
  { name: "English", id: 0 },
  { name: "Español", id: 1 },
];
