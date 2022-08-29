import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CategoryType, TransactionType, UuId } from "../components/types";
import { RootState, AppThunk } from "./store";

import { INITIAL_CATEGORIES, LANGUAGES, STORAGE } from "../components/statics";

export interface CategoriesState {
  data: CategoryType[];
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
        if (parsed.some((cat: CategoryType) => cat.id === "expence0")) {
          return parsed;
        } else {
          return [...INITIAL_CATEGORIES, ...parsed];
        }
      } else {
        const jsonValue = JSON.stringify({ categories: INITIAL_CATEGORIES });
        await AsyncStorage.setItem(STORAGE.categories, jsonValue);
        return INITIAL_CATEGORIES;
      }
    } catch (e) {
      console.log("Error: Could not fetch categories data");
    }
  }
);

export const storeCategoriesAsync = createAsyncThunk(
  "categories/storeCategoriesAsync",
  async (newCategories: CategoryType[]) => {
    try {
      const jsonValue = JSON.stringify({ categories: newCategories });
      await AsyncStorage.setItem(STORAGE.categories, jsonValue);
    } catch (e) {
      console.log("Error: Could not store categories data");
    }
    return newCategories;
  }
);

export const resetCategoriesDEVONLY = createAsyncThunk(
  "categories/storeCategoriesAsync",
  async () => {
    try {
      const jsonValue = JSON.stringify({ categories: INITIAL_CATEGORIES });
      await AsyncStorage.setItem(STORAGE.categories, jsonValue);
    } catch (e) {
      console.log("Error: Could not store categories data");
    }
    return [];
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
      })
      .addCase(storeCategoriesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        storeCategoriesAsync.fulfilled,
        (state, action: PayloadAction<CategoryType[]>) => {
          state.status = "fulfilled";
          state.data = action.payload;
        }
      )
      .addCase(storeCategoriesAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks

export const addCategory =
  (categoryName: string, categoryType: TransactionType): AppThunk =>
  (dispatch, getState) => {
    const currentCategories = selectCategoriesData(getState());
    const newCategories = [
      ...currentCategories,
      {
        name: categoryName,
        id: uuid.v4(),
        type: categoryType,
      },
    ];
    dispatch(storeCategoriesAsync(newCategories));
  };

export const editCategory =
  (categoryNewName: string, categoryId: UuId): AppThunk =>
  (dispatch, getState) => {
    const currentCategories = selectCategoriesData(getState());
    const newCategories = currentCategories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, name: categoryNewName };
      } else {
        return category;
      }
    });
    dispatch(storeCategoriesAsync(newCategories));
  };

export const deleteCategory =
  (categoryId: UuId): AppThunk =>
  (dispatch, getState) => {
    const currentCategories = selectCategoriesData(getState());
    const newCategories = currentCategories.filter(
      (category) => category.id !== categoryId
    );
    dispatch(storeCategoriesAsync(newCategories));
  };

export const adjustCategoryNames =
  (oldLanguage: number, newLanguage: number): AppThunk =>
  (dispatch, getState) => {
    const currentCategories = selectCategoriesData(getState());
    // Needs to be changed to something simpler or moved from this file.
    const newCategories = currentCategories.map((category) =>
      category.name === LANGUAGES.otherEntries[oldLanguage]
        ? { ...category, name: LANGUAGES.otherEntries[newLanguage] }
        : category.name === LANGUAGES.otherExpences[oldLanguage]
        ? { ...category, name: LANGUAGES.otherExpences[newLanguage] }
        : category.name === LANGUAGES.loan[oldLanguage]
        ? { ...category, name: LANGUAGES.loan[newLanguage] }
        : category.name === LANGUAGES.payment[oldLanguage]
        ? { ...category, name: LANGUAGES.payment[newLanguage] }
        : category
    );
    dispatch(storeCategoriesAsync(newCategories));
  };

export const DEVONLYRESETCATEGORIES = (): AppThunk => (dispatch) => {
  dispatch(resetCategoriesDEVONLY());
};

// Selectors

export const selectCategoriesData = (state: RootState) => state.categories.data;

export const selectCategoriesStatus = (state: RootState) =>
  state.categories.status;

export default categoriesSlice.reducer;
