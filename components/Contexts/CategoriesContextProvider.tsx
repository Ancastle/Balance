import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

// Types
import { CategoryType, TransactionType, UuId } from "../types";

// Statics
import { INITIAL_CATEGORIES, STORAGE } from "../statics";

export interface CategoriesContextProps {
  categories: CategoryType[];
  addCategory: (categoryName: string, categoryType: TransactionType) => void;
  editCategory: (categoryNewName: string, categoryId: UuId) => void;
  deleteCategory: (categoryId: UuId) => void;
}

const CategoriesContext = React.createContext<CategoriesContextProps>({
  categories: [],
  addCategory: () => "addCategory",
  editCategory: () => "editCategory",
  deleteCategory: () => "deleteCategory",
});

const CategoriesContextProvider: React.FC = ({ children }) => {
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
        const newCategories = [
          ...categories,
          {
            name: categoryName,
            id: uuid.v4(),
            type: categoryType,
          },
        ];
        setCategories(newCategories);
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
        const newCategories = categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, name: categoryNewName };
          } else {
            return category;
          }
        });
        setCategories(newCategories);
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
        const newCategories = categories.filter(
          (category) => category.id !== categoryId
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
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContextProvider, CategoriesContext };
