import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types
import { Language, Preferences } from "../types";

// Statics
import { DEFAULT_PREFERENCES, STORAGE } from "../statics";

export interface PreferencesContextProps {
  languages: Language[];
  changeLanguage: (newLanguageId: string) => void;
  appLanguage: number;
}

const PreferencesContext = React.createContext<PreferencesContextProps>({
  languages: [{ name: "ES", id: 1 }],
  changeLanguage: () => "changeLanguage",
  appLanguage: 1,
});

//appLanguage: 0 -> EN, 1 -> ES

const PreferencesContextProvider: React.FC = ({ children }) => {
  const [preferences, setPreferences] = React.useState<Preferences>({
    appLanguage: 1,
  });
  const [hasFetchedPreferences, setHasFetchedPreferences] =
    React.useState(false);

  const fetchPreferences = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.preferences);
      if (value === null) {
        setPreferences(DEFAULT_PREFERENCES);
        const jsonValue = JSON.stringify({ preferences: DEFAULT_PREFERENCES });
        await AsyncStorage.setItem(STORAGE.preferences, jsonValue);
      } else {
        const parsed = JSON.parse(value);
        setPreferences(parsed.preferences);
      }
      setHasFetchedPreferences(true);
    } catch (e) {
      console.log("Error: Could not fetch from categories data");
    }
  }, []);

  const changeLanguage = React.useCallback(
    async (newLanguageId: string) => {
      try {
        const newPreferences = {
          ...preferences,
          appLanguage: parseInt(newLanguageId, 10),
        };
        setPreferences(newPreferences);
        const jsonValue = JSON.stringify({ preferences: newPreferences });
        await AsyncStorage.setItem(STORAGE.preferences, jsonValue);
      } catch (e) {
        console.log("Error: Could not store to preferences");
      }
    },
    [preferences]
  );

  const appLanguage: number = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const languages: Language[] = React.useMemo(
    () => [
      { name: "English", id: 0 },
      { name: "Español", id: 1 },
    ],
    []
  );

  React.useEffect(() => {
    if (!hasFetchedPreferences) {
      fetchPreferences();
    }
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        languages,
        changeLanguage,
        appLanguage,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export { PreferencesContextProvider, PreferencesContext };
