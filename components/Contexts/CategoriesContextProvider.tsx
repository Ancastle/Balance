import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types
import { Category } from "../types";

// Statics
import { INITIAL_CATEGORIES, STORAGE } from "../statics";

export interface CategoriesContextProps {
  categories: Category[];
}

const CategoriesContext = React.createContext<CategoriesContextProps>({
  categories: [],
});

const CategoriesContextProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
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

  React.useEffect(() => {
    if (!hasFetchedCategories) {
      fetchCategories();
    }
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContextProvider, CategoriesContext };
