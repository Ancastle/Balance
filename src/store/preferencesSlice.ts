import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Preferences } from "../components/types";
import { RootState, AppThunk } from "./store";

import { DEFAULT_PREFERENCES, STORAGE } from "../components/statics";

export interface PreferencesState {
  preferences: Preferences;
  status: string;
}

const initialState: PreferencesState = {
  preferences: { appLanguage: 0 },
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
      } else {
        return DEFAULT_PREFERENCES;
      }
    } catch (e) {
      console.log("Error: Could not fetch preferences data");
    }
  }
);

export const storePreferencesAsync = createAsyncThunk(
  "preferences/storePreferencesAsync",
  async (newPreferences: Preferences) => {
    try {
      const jsonValue = JSON.stringify({ preferences: newPreferences });
      await AsyncStorage.setItem(STORAGE.preferences, jsonValue);
    } catch (e) {
      console.log("Error: Could not store preferences data");
    }
    return newPreferences;
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
      .addCase(
        fetchPreferencesAsync.fulfilled,
        (state, action: PayloadAction<Preferences>) => {
          state.status = "fulfilled";
          state.preferences.appLanguage = action.payload.appLanguage;
        }
      )
      .addCase(fetchPreferencesAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(storePreferencesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        storePreferencesAsync.fulfilled,
        (state, action: PayloadAction<Preferences>) => {
          state.status = "fulfilled";
          state.preferences.appLanguage = action.payload.appLanguage;
        }
      )
      .addCase(storePreferencesAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks
export const changeLanguage =
  (newLanguageId: string): AppThunk =>
  (dispatch, getState) => {
    const currentePreferences = selectPreferences(getState());
    const newPreferences = {
      ...currentePreferences,
      appLanguage: parseInt(newLanguageId, 10),
    };
    dispatch(storePreferencesAsync(newPreferences));
  };

// Selectors
export const selectPreferences = (state: RootState) =>
  state.preferences.preferences;

export const selectPreferencesLanguage = (state: RootState) =>
  state.preferences.preferences.appLanguage;

export const selectPreferencesStatus = (state: RootState) =>
  state.preferences.status;

export default preferencesSlice.reducer;
