import * as React from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utils
import { calculateTotal } from "../utils";

// Types
import { HistoryRegister, Transaction, TransactionInput } from "../types";

// Statics
import { STORAGE } from "../statics";

export interface HistoryContextProps {
  history: HistoryRegister[];
  addRegister: (newRegisterName: string, newRegisterDate: Date) => void;
}

const HistoryContext = React.createContext<HistoryContextProps>({
  history: [],
  addRegister: () => "onAddRegister",
});

const HistoryContextProvider: React.FC = ({ children }) => {
  const [history, setHistory] = React.useState<HistoryRegister[]>([]);
  const [hasFetchedHistory, setHastFetchedHistory] = React.useState(false);

  const fetchHistory = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.history);
      if (value) {
        const parsed = JSON.parse(value);
        setHistory(parsed.history);
        setHastFetchedHistory(true);
      }
    } catch (e) {
      console.log("Error: Could fetch history data");
    }
  }, []);

  const addRegister = React.useCallback(
    async (newRegisterName: string, newRegisterDate: Date) => {
      try {
        const newRegister = {
          name: newRegisterName,
          day: {
            day: newRegisterDate.getDate(),
            month: newRegisterDate.getMonth() + 1,
            year: newRegisterDate.getFullYear(),
          },
          hour: {
            hour: newRegisterDate.getHours(),
            minutes: newRegisterDate.getMinutes(),
          },
        };
        console.log(newRegister);
        const newHistory = [newRegister, ...history];
        setHistory(newHistory);
        const jsonValue = JSON.stringify({ history: newHistory });
        await AsyncStorage.setItem(STORAGE.history, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to history data");
      }
    },
    [history]
  );

  React.useEffect(() => {
    if (!hasFetchedHistory) {
      fetchHistory();
    }
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history,
        addRegister,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContextProvider, HistoryContext };
