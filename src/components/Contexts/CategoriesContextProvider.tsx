import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

// Types
import { CategoryType, TransactionType, UuId } from "../types";

// Contexts
import { HistoryContext } from "./HistoryContextProvider";
import { PreferencesContext } from "./PreferencesContextProvider";

// Statics
import { INITIAL_CATEGORIES, LANGUAGES, STORAGE } from "../statics";

export interface CategoriesContextProps {
  categories: CategoryType[];
  addCategory: (categoryName: string, categoryType: TransactionType) => void;
  editCategory: (categoryNewName: string, categoryId: UuId) => void;
  deleteCategory: (categoryId: UuId) => void;
  adjustCategoryNames: (oldLanguage: number, newLanguage: number) => void;
}

const CategoriesContext = React.createContext<CategoriesContextProps>({
  categories: [],
  addCategory: () => "addCategory",
  editCategory: () => "editCategory",
  deleteCategory: () => "deleteCategory",
  adjustCategoryNames: () => "adjustCategoryNames",
});

const CategoriesContextProvider: React.FC = ({ children }) => {
  const { addRegister } = React.useContext(HistoryContext);
  const { appLanguage } = React.useContext(PreferencesContext);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [hasFetchedCategories, setHasFetchedCategories] = React.useState(false);

  const fetchCategories = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.categories);
      if (value === null) {
        setCategories(INITIAL_CATEGORIES);
        const jsonValue = JSON.stringify({ categories: INITIAL_CATEGORIES });
        await AsyncStorage.setItem(STORAGE.categories, jsonValue);
      } else {
        const parsed = JSON.parse(value);
        setCategories(parsed.categories);
      }
      setHasFetchedCategories(true);
    } catch (e) {
      console.log("Error: Could not fetch from categories data");
    }
  }, []);

  const addCategory = React.useCallback(
    async (categoryName: string, categoryType: TransactionType) => {
      try {
        const date = new Date();
        const newCategories = [
          ...categories,
          {
            name: categoryName,
            id: uuid.v4(),
            type: categoryType,
          },
        ];
        setCategories(newCategories);
        addRegister(
          `${LANGUAGES.createCategory[appLanguage]} ${categoryName}`,
          date
        );
        const jsonValue = JSON.stringify({ categories: newCategories });
        await AsyncStorage.setItem(STORAGE.categories, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to categories data");
      }
    },
    [categories]
  );

  const editCategory = React.useCallback(
    async (categoryNewName: string, categoryId: UuId) => {
      try {
        const date = new Date();
        const newCategories = categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, name: categoryNewName };
          } else {
            return category;
          }
        });
        setCategories(newCategories);
        addRegister(
          `${LANGUAGES.editCategory[appLanguage]} ${categoryNewName}`,
          date
        );
        const jsonValue = JSON.stringify({ categories: newCategories });
        await AsyncStorage.setItem(STORAGE.categories, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to categories data");
      }
    },
    [categories]
  );

  const deleteCategory = React.useCallback(
    async (categoryId: UuId) => {
      try {
        const date = new Date();
        const categoryName = categories.find((item) => item.id === categoryId);
        const newCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(newCategories);
        addRegister(
          `${LANGUAGES.deleteCategory[appLanguage]} ${categoryName}`,
          date
        );
        const jsonValue = JSON.stringify({ categories: newCategories });
        await AsyncStorage.setItem(STORAGE.categories, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to categories data");
      }
    },
    [categories]
  );

  const adjustCategoryNames = React.useCallback(
    async (oldLanguage: number, newLanguage: number) => {
      try {
        const newCategories = categories.map((category) =>
          category.name === LANGUAGES.otherEntries[oldLanguage]
            ? { ...category, name: LANGUAGES.otherEntries[newLanguage] }
            : category.name === LANGUAGES.otherExpences[oldLanguage]
            ? { ...category, name: LANGUAGES.otherExpences[newLanguage] }
            : category
        );
        setCategories(newCategories);
        const jsonValue = JSON.stringify({ categories: newCategories });
        await AsyncStorage.setItem(STORAGE.categories, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to categories data");
      }
    },
    [categories]
  );

  React.useEffect(() => {
    if (!hasFetchedCategories) {
      fetchCategories();
    }
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        editCategory,
        deleteCategory,
        adjustCategoryNames,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContextProvider, CategoriesContext };
