import { CategoryType, Preferences } from "./types";

export const LANGUAGES = {
  monthDayFormatLabel: ["Month/day (mm/dd)", "Mes/día (mm/dd)"],
  dayMonthFormatLabel: ["Day/month (dd/mm)", "Día/mes (dd/mm)"],
  difference: ["Difference", "Diferencia"],
  from: ["From", "Desde"],
  to: ["to", "hasta"],
  entriesFromTo: ["entries \nfrom", "ingresos \ndesde"],
  expencesFromTo: ["expences \nfrom", "egresos \ndesde"],
  entriesFrom: ["entries from", "ingresos de"],
  expencesFrom: ["expences from", "egresos de"],
  allEntriesFromTo: ["All entries from\n", "Todos los ingresos desde\n"],
  allExpencesFromTo: ["All expences from\n", "Todos los egresos desde\n"],
  allEntriesFrom: ["All entries from", "Todos los ingresos de"],
  allExpencesFrom: ["All expences from", "Todos los egresos de"],
  byCategories: ["By Categories", "Por Categorías"],
  category: ["Category", "Categoría"],
  total: ["Total", "Total"],
  type: ["Type", "Tipo"],
  necessaary: ["Necessary", "Necesario"],
  unnecessaary: ["Unnecessary", "Innecesario"],
  ok: ["Ok", "Ok"],
  analysis: {
    monthSelect: {
      singleMonthTitle: ["Select a month", "Selecciona un mes"],
      monthFromTitle: ["From", "Desde"],
      compare: ["Month to compare 1", "Mes a comparar 1"],
      withThis: ["Month to compare 2", "Mes a comparar 2"],
      monthToTitle: ["To", "Hasta"],
    },
    analysisType: {
      title: ["Select an analysis type", "Selecciona un tipo de análisis"],
      monthly: ["By month", "Por mes"],
      fromTo: ["From/To", "Desde/Hasta"],
      compare: ["Compare", "Comparar"],
    },
    categorySelect: {
      title: ["Select a category", "Selecciona una categoría"],
      allCategories: ["All categories", "Todas las categorías"],
    },
    sortingType: {
      title: ["Sort by", "Organizar por"],
      necessary: ["Necessary/Unnecessary", "Necesario/Innecesario"],
      byCategory: ["By category", "Por categoría"],
    },
    transactionType: {
      title: ["Select a transaction type", "Selecciona un tipo de transacción"],
      expences: ["Expences", "Egresos"],
      entries: ["Entries", "Ingresos"],
    },
  },
  helpers: {
    homeScreen: [
      "Expences are shown as Total (necessary, unnecessary)\nCredit card expences are included even before you pay them\nYou can edit the number in the last days, you can also set a different default number on Settings tab.",
      "Los egresos se muestran como Total (necesarios, innecesarios)\nLos gastos de tarjeta de crédito estan incluidos, incluso antes de pagarlos\nEl número en los últimos días puede ser editado, también es posible editar este número por defecto en la pestaña de Ajustes.",
    ],
    analysisScreen: [
      "You can use this screen to review your expences/entries by each month, compare between them or select a date from/to for the revision.\nYou can also group the transactions by needed/unneeded or by category (ony by cateogry for entries).\nYou can look for more details on the totals by clicking on them while you are not comparing two months.\nThis section does not include the debts from your credit card.",
      "En esta sección se puede revisar los egresos/ingresos por cada mes, comparar entre ellos o seleccionar una mes desde/hasta para la revisión.\nTambién se puede agrupar las transacciones por necesario/innecesario o por categorías (solo por categorías en el caso de ingresos).\nPara ver más detalles acerca de los totales, toca sobre ellos cuando no este seleccionada la opcion de comparar.\nEsta sesión no incluye las deudas de tarjeta de crédito.",
    ],
    analysisFromTo: [
      "The month To must be after the month From.\nMonth From must not be the current month.",
      "El mes Hasta debe ser despues del mes Desde.\nLa mes Desde debe ser diferente al mes en curso.",
    ],
    debtLoan: [
      "Use this section to manage debts and loans for people you know. \nAdd a person by their name and tap on them to add a transaction with that person.\nPositive numbers on the list mean they own you money. \nNegative numbers mean you own them money.\nEvery person has an individual history of transactions, you can check on it by tapping on a person's name",
      "Usa esta sección para administrar tus prestamos y deudas con las personas que conoces\nAgrega una persona por su nombre y luego toca en el para agregar una transacción con esa persona.\nLos números positivos significan que esta persona te debe dinero.\nLos números negativos significan que le debes dinero a esta persona.\nCada persona tiene un historial individual de transacciones, se puede acceder a este tocando en el nombre de la persona.",
    ],
    creditCard: [
      "Use this screen to add transactions to your Credit Card. \nThis expences will be inmediately reflected on your Home screen summary.\nWhen you pay your Credit Card expences, the changes will be automatically added to your Balance and Expences.",
      "Usa esta pantalla para agregar transacciones a tu tarjeta de Crédito. \nEstas transacciones se verán reflejadas inmediatamente en el resumen de tu pantalla de Inicio.\nCuando realices pagos a tu Tarjeta de Crédito, estos se verán agregados automaticamente a tu Balance y Egresos.",
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
  welcome: ["Welcome to Balance", "Bienvenido/a a Balance"],
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
  date: ["Date", "Fecha"],
  hour: ["Hour", "Hora"],
  cancel: ["Cancel", "Cancelar"],
  add: ["Add", "Agregar"],
  delete: ["Delete", "Eliminar"],
  save: ["Save", "Guardar"],
  name: ["Name", "Nombre"],
  pastDaysDefault: ["Default past days", "Días pasados por defecto"],
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
    settings: ["Settings", "Ajustes"],
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
        changePastDaysDefault: [
          "Change default past days (Home Screen)",
          "Cambiar días pasados por defecto (Pantalla de Inicio)",
        ],
        changeLanguagePlaceholder: [
          "Select a language",
          "Selecciona un idioma",
        ],
        changeTimeFormatPreference: [
          "Change date format",
          "Cambiar formato de fecha ",
        ],
        changeFormatModalTitle: [
          "Change date format",
          "Cambiar formato de fecha",
        ],
        changeFormatPlaceholder: [
          "Select a date format",
          "Selecciona un formato de fecha",
        ],
      },
    },
  },
};

export const STORAGE = {
  transactions: "BalaceAppTransactions",
  categories: "BalaceAppCategories",
  preferences: "BalaceAppPreferences",
  creditCard: "BalaceAppCCTransactions",
  people: "BalaceAppPeople",
  history: "BalaceAppHistory",
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
  dateFormat: "dd/MM",
  pastDays: 15,
};

export const ALL_LANGUAGES = [
  { name: "English", id: 0 },
  { name: "Español", id: 1 },
];

export const ALL_FORMATS = (appLanguage: number) => {
  const dayMonth = LANGUAGES.dayMonthFormatLabel[appLanguage];
  const monthDay = LANGUAGES.monthDayFormatLabel[appLanguage];
  return [
    { name: dayMonth, value: "dd/MM" },
    { name: monthDay, value: "MM/dd" },
  ];
};
