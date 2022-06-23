import * as React from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Contexts
import { HistoryContext } from "./HistoryContextProvider";
import { PreferencesContext } from "./PreferencesContextProvider";

// Utils
import { calculateTotal } from "../utils";

// Types
import { Transaction, TransactionInput } from "../types";

// Statics
import { STORAGE, LANGUAGES } from "../statics";

export interface TransactionsContextProps {
  transactions: Transaction[];
  addTransaction: (newTransaction: TransactionInput) => void;
  editTransaction: (editingTransaction: Transaction) => void;
  addCCPayment: (transactions: Transaction[]) => void;
  totalBalance: number;
  settTransactions: (transactionss: Transaction[]) => void;
}

const TransactionsContext = React.createContext<TransactionsContextProps>({
  transactions: [],
  addTransaction: () => "onAddTransaction",
  editTransaction: () => "onEditTransaction",
  addCCPayment: () => "addCCPayment",
  totalBalance: 0,
  settTransactions: () => "",
});

const TransactionsContextProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const { addRegister, history } = React.useContext(HistoryContext);
  const { appLanguage } = React.useContext(PreferencesContext);
  const [hasFetchedTransactions, setHasFetchedTransactions] =
    React.useState(false);

  const settTransactions = React.useCallback(
    (transactionss) => setTransactions(transactionss),
    [transactions, setTransactions]
  );
  const fetchTransactions = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.transactions);
      if (value) {
        const parsed = JSON.parse(value);
        setTransactions(parsed.transactions);
        setHasFetchedTransactions(true);
      }
    } catch (e) {
      console.log("Error: Could fetch transactions data");
    }
  }, []);

  const addTransaction = React.useCallback(
    async (newTransaction: TransactionInput) => {
      try {
        const date = new Date();
        const transaction: Transaction = {
          ...newTransaction,
          id: uuid.v4(),
          day: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          },
          hour: { hour: date.getHours(), minutes: date.getMinutes() },
        };
        const newTransactions = [transaction, ...transactions];
        setTransactions(newTransactions);
        addRegister(
          `${LANGUAGES.addTransaction[appLanguage]} ${newTransaction.name}`,
          date
        );
        const jsonValue = JSON.stringify({ transactions: newTransactions });
        await AsyncStorage.setItem(STORAGE.transactions, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to transactions data");
      }
    },
    [transactions, history]
  );

  const editTransaction = React.useCallback(
    async (editingTransaction: Transaction) => {
      try {
        const date = new Date();
        const newTransactions = transactions.map((t) => {
          if (t.id === editingTransaction.id) {
            return {
              ...t,
              name: editingTransaction.name,
              value: editingTransaction.value,
              categoryId: editingTransaction.categoryId,
            };
          } else {
            return t;
          }
        });
        setTransactions(newTransactions);
        addRegister(
          `${LANGUAGES.editTransaction[appLanguage]} ${editingTransaction.name}`,
          date
        );
        const jsonValue = JSON.stringify({ transactions: newTransactions });
        await AsyncStorage.setItem(STORAGE.transactions, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to transactions data");
      }
    },
    [transactions]
  );

  const addCCPayment = React.useCallback(
    async (ccPayment: Transaction[]) => {
      try {
        const newTransactions = [...ccPayment, ...transactions];
        setTransactions(newTransactions);
        const jsonValue = JSON.stringify({ transactions: newTransactions });
        await AsyncStorage.setItem(STORAGE.transactions, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to transactions data");
      }
    },
    [transactions]
  );

  const totalBalance = React.useMemo(
    () => calculateTotal(transactions, "entry"),
    [transactions]
  );

  React.useEffect(() => {
    if (!hasFetchedTransactions) {
      fetchTransactions();
    }
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        addCCPayment,
        totalBalance,
        settTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContextProvider, TransactionsContext };
