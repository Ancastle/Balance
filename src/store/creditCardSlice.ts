import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import formatISO from "date-fns/formatISO";

import { Transaction, TransactionInput } from "../components/types";
import { RootState, AppThunk } from "./store";

import { calculateTotal } from "../components/utils";

import { STORAGE } from "../components/statics";

export interface CreditCardState {
  data: Transaction[];
  status: string;
  total: number;
}

const initialState: CreditCardState = {
  data: [],
  status: "idle",
  total: 0,
};

// Async

export const fetchCreditCardAsync = createAsyncThunk(
  "creditCard/fetchCreditCard",
  async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.creditCard);
      if (value) {
        const parsed = JSON.parse(value).creditCard;
        return parsed;
      }
    } catch (e) {
      console.log("Error: Could not fetch creditCard data");
    }
  }
);

export const storeCreditCardAsync = createAsyncThunk(
  "creditCard/storeCreditCardAsync",
  async (newCreditCardTransactions: Transaction[]) => {
    try {
      const jsonValue = JSON.stringify({
        creditCard: newCreditCardTransactions,
      });
      await AsyncStorage.setItem(STORAGE.creditCard, jsonValue);
    } catch (e) {
      console.log("Error: Could not store creditCard data");
    }
    return newCreditCardTransactions;
  }
);

// Slice

export const creditCardSlice = createSlice({
  name: "creditCard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCreditCardAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchCreditCardAsync.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = "fulfilled";
          state.data = action.payload;
          state.total = calculateTotal(action.payload, "expence");
        }
      )
      .addCase(fetchCreditCardAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(storeCreditCardAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        storeCreditCardAsync.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = "fulfilled";
          state.data = action.payload;
          state.total = calculateTotal(action.payload, "expence");
        }
      )
      .addCase(storeCreditCardAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks
export const addCreditCardTransaction =
  (newTransactionInput: TransactionInput): AppThunk =>
  (dispatch, getState) => {
    const newTransaction: Transaction = {
      ...newTransactionInput,
      id: uuid.v4(),
      date: formatISO(new Date()),
    };
    const currentTransactions = selectCreditCardData(getState());
    const newTransactions = [newTransaction, ...currentTransactions];
    dispatch(storeCreditCardAsync(newTransactions));
  };

export const payCreditCard =
  (amount: number): AppThunk<Transaction[]> =>
  (dispatch, getState) => {
    const currentTransactions = [...selectCreditCardData(getState())];
    const newTransactions = currentTransactions
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
    currentTransactions.reverse();
    const newCredits = newTransactions.filter((t) => t.value !== "0");
    const newDebits = newTransactions
      .map((t, i) => {
        return {
          ...t,
          value: (
            parseInt(currentTransactions[i].value, 10) - parseInt(t.value, 10)
          ).toString(),
        };
      })
      .filter((t) => t.value !== "0");
    dispatch(storeCreditCardAsync(newCredits));
    return newDebits;
  };

export const editCreditCardTransaction =
  (editingTransaction: Transaction): AppThunk =>
  (dispatch, getState) => {
    const currentTransactions = selectCreditCardData(getState());
    const newTransactions = currentTransactions.map((t) => {
      if (t.id === editingTransaction.id) {
        return {
          ...t,
          name: editingTransaction.name,
          value: editingTransaction.value,
          categoryId: editingTransaction.categoryId,
          isNecesary: editingTransaction.isNecesary,
        };
      } else {
        return t;
      }
    });
    dispatch(storeCreditCardAsync(newTransactions));
  };

// Selectors
export const selectCreditCardData = (state: RootState) => state.creditCard.data;
export const selectCreditCardStatus = (state: RootState) =>
  state.creditCard.status;
export const selectCreditCardTotal = (state: RootState) =>
  state.creditCard.total;

export default creditCardSlice.reducer;
