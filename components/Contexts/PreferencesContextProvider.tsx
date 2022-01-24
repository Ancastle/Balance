import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types
import { Preferences } from "../types";

// Statics
import { INITIAL_PREFERENCES, STORAGE } from "../statics";

export interface PreferencesContextProps {
  preferences: Preferences;
}

const PreferencesContext = React.createContext<PreferencesContextProps>({
  preferences: { appLanguage: 1 },
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
        setPreferences(INITIAL_PREFERENCES);
        const jsonValue = JSON.stringify({ preferences: INITIAL_PREFERENCES });
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

  React.useEffect(() => {
    if (!hasFetchedPreferences) {
      fetchPreferences();
    }
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export { PreferencesContextProvider, PreferencesContext };
