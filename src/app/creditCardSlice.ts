import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  CategoryType,
  Transaction,
  TransactionInput,
} from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

export interface CreditCardState {
  data: CategoryType[];
  status: string;
}

const initialState: CreditCardState = {
  data: [],
  status: "idle",
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
  async (newCreditCard: Transaction[]) => {
    try {
      const jsonValue = JSON.stringify({ creditCard: newCreditCard });
      await AsyncStorage.setItem(STORAGE.creditCard, jsonValue);
    } catch (e) {
      console.log("Error: Could not store creditCard data");
    }
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
      .addCase(fetchCreditCardAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchCreditCardAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks

// Selectors

export const selectCreditCardData = (state: RootState) => state.creditCard.data;

export const selectCreditCardStatus = (state: RootState) =>
  state.creditCard.status;

export default creditCardSlice.reducer;
