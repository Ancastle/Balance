import * as React from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utils
import { calculateTotal, makeCurrencyFormat } from "../utils";

// Contexts
import { TransactionsContext } from "./TransactionsContextProvider";
import { HistoryContext } from "./HistoryContextProvider";
import { PreferencesContext } from "./PreferencesContextProvider";

// Types
import { Transaction, TransactionInput } from "../types";

// Statics
import { STORAGE, LANGUAGES } from "../statics";

export interface CreditCardContextProps {
  ccTransactions: Transaction[];
  payCC: (amount: number) => void;
  addCCTransaction: (newTransaction: TransactionInput) => void;
  editCCTransaction: (editingTransaction: Transaction) => void;
  totalDebt: number;
}

const CreditCardContext = React.createContext<CreditCardContextProps>({
  ccTransactions: [],
  payCC: () => "payCC",
  addCCTransaction: () => "onAddTransaction",
  editCCTransaction: () => "onEditTransaction",
  totalDebt: 0,
});

const CreditCardContextProvider: React.FC = ({ children }) => {
  const { addCCPayment } = React.useContext(TransactionsContext);
  const { addRegister } = React.useContext(HistoryContext);
  const { appLanguage } = React.useContext(PreferencesContext);
  const [ccTransactions, setCcTransactions] = React.useState<Transaction[]>([]);
  const [hasFetchedTransactions, setHasFetchedTransactions] =
    React.useState(false);

  const fetchTransactions = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.ccTransactions);
      if (value) {
        const parsed = JSON.parse(value);
        setCcTransactions(parsed.transactions);
        setHasFetchedTransactions(true);
      }
    } catch (e) {
      console.log("Error: Could fetch CC transactions data");
    }
  }, []);

  const addCCTransaction = React.useCallback(
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
        const newTransactions = [transaction, ...ccTransactions];
        setCcTransactions(newTransactions);
        addRegister(
          `${LANGUAGES.addCCTransaction[appLanguage]} ${newTransaction.name}`,
          date
        );
        const jsonValue = JSON.stringify({ transactions: newTransactions });
        await AsyncStorage.setItem(STORAGE.ccTransactions, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to CC transactions data");
      }
    },
    [ccTransactions]
  );

  const payCC = React.useCallback(
    async (amount: number) => {
      try {
        const date = new Date();
        const actualTransactions = [...ccTransactions];
        const newTransactions = actualTransactions
          .reverse()
          .map((t) => {
            const value = parseInt(t.value, 10);
            if (amount > 0) {
              if (amount >= value) {
                amount -= value;
                return { ...t, value: "0" };
              } else {
                const newValue = (value - amount).toString();
                amount = 0;
                return { ...t, value: newValue };
              }
            } else {
              return t;
            }
          })
          .reverse();
        actualTransactions.reverse();
        const newCredits = newTransactions.filter((t) => t.value !== "0");
        const newDebits = newTransactions
          .map((t, i) => {
            return {
              ...t,
              value: (
                parseInt(actualTransactions[i].value, 10) -
                parseInt(t.value, 10)
              ).toString(),
            };
          })
          .filter((t) => t.value !== "0");
        await addCCPayment(newDebits);
        setCcTransactions(newCredits);
        addRegister(
          `${LANGUAGES.addCCPayment[appLanguage]} ${makeCurrencyFormat(
            amount
          )}`,
          date
        );
        const jsonValue = JSON.stringify({ transactions: newCredits });
        await AsyncStorage.setItem(STORAGE.ccTransactions, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to CC transactions data");
      }
    },
    [ccTransactions, addCCPayment]
  );

  const editCCTransaction = React.useCallback(
    async (editingTransaction: Transaction) => {
      try {
        const date = new Date();
        const newTransactions = ccTransactions.map((t) => {
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
        setCcTransactions(newTransactions);
        addRegister(
          `${LANGUAGES.editCCTransaction[appLanguage]} ${editingTransaction.name}`,
          date
        );
        const jsonValue = JSON.stringify({ transactions: newTransactions });
        await AsyncStorage.setItem(STORAGE.ccTransactions, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to CC transactions data");
      }
    },
    [ccTransactions]
  );

  const totalDebt = React.useMemo(
    () => calculateTotal(ccTransactions, "expence"),
    [ccTransactions]
  );

  React.useEffect(() => {
    if (!hasFetchedTransactions) {
      fetchTransactions();
    }
  }, []);

  return (
    <CreditCardContext.Provider
      value={{
        ccTransactions,
        payCC,
        addCCTransaction,
        editCCTransaction,
        totalDebt,
      }}
    >
      {children}
    </CreditCardContext.Provider>
  );
};

export { CreditCardContextProvider, CreditCardContext };
