import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Transaction, TransactionInput } from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

export interface CategoriesState {
  data: Transaction[];
  status: string;
}

const initialState: CategoriesState = {
  data: [],
  status: "idle",
};

// Async

export const fetchCategoriesAsync = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.categories);
      if (value) {
        const parsed = JSON.parse(value).categories;
        return parsed;
      }
    } catch (e) {
      console.log("Error: Could not fetch categories data");
    }
  }
);

export const storeCategoriesAsync = createAsyncThunk(
  "categories/storeCategoriesAsync",
  async (newCategories: Transaction[]) => {
    try {
      const jsonValue = JSON.stringify({ categories: newCategories });
      await AsyncStorage.setItem(STORAGE.categories, jsonValue);
    } catch (e) {
      console.log("Error: Could not store categories data");
    }
  }
);

// Slice

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks

// Selectors

export const selectCategoriesData = (state: RootState) => state.categories.data;

export const selectCategoriesStatus = (state: RootState) =>
  state.categories.status;

export default categoriesSlice.reducer;
