import * as React from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utils
import { calculateTotal } from "../utils";

// Types
import { Transaction, TransactionInput } from "../types";

// Statics
import { STORAGE } from "../statics";

export interface CreditCardContextProps {
  ccTransactions: Transaction[];
  addCCTransaction: (newTransaction: TransactionInput) => void;
  editCCTransaction: (editingTransaction: Transaction) => void;
  totalDebt: number;
}

const CreditCardContext = React.createContext<CreditCardContextProps>({
  ccTransactions: [],
  addCCTransaction: () => "onAddTransaction",
  editCCTransaction: () => "onEditTransaction",
  totalDebt: 0,
});

const CreditCardContextProvider: React.FC = ({ children }) => {
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
          day: { day: date.getDate(), month: date.getMonth() + 1 },
          hour: { hour: date.getHours(), minutes: date.getMinutes() },
        };
        const newTransactions = [transaction, ...ccTransactions];
        setCcTransactions(newTransactions);
        const jsonValue = JSON.stringify({ transactions: newTransactions });
        await AsyncStorage.setItem(STORAGE.ccTransactions, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to CC transactions data");
      }
    },
    [ccTransactions]
  );

  const editCCTransaction = React.useCallback(
    async (editingTransaction: Transaction) => {
      try {
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
