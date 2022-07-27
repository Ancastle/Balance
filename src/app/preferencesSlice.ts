import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Transaction, TransactionInput } from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

export interface PreferencesState {
  data: Transaction[];
  status: string;
}

const initialState: PreferencesState = {
  data: [],
  status: "idle",
};

// Async

export const fetchPreferencesAsync = createAsyncThunk(
  "preferences/fetchPreferences",
  async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.preferences);
      if (value) {
        const parsed = JSON.parse(value).preferences;
        return parsed;
      }
    } catch (e) {
      console.log("Error: Could not fetch preferences data");
    }
  }
);

export const storePreferencesAsync = createAsyncThunk(
  "preferences/storePreferencesAsync",
  async (newPreferences: Transaction[]) => {
    try {
      const jsonValue = JSON.stringify({ preferences: newPreferences });
      await AsyncStorage.setItem(STORAGE.preferences, jsonValue);
    } catch (e) {
      console.log("Error: Could not store preferences data");
    }
  }
);

// Slice

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPreferencesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPreferencesAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchPreferencesAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks

// Selectors

export const selectPreferencesData = (state: RootState) =>
  state.preferences.data;

export const selectPreferencesStatus = (state: RootState) =>
  state.preferences.status;

export default preferencesSlice.reducer;
