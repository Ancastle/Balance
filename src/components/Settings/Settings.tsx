import * as React from "react";

// Components
import { TabsHeader } from "../Shared";
import PreferencesSettings from "./PreferencesSettings";
import CategoriesSettings from "./CategoriesSettings";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../store";

const Settings: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const tabs: Tab[] = React.useMemo(
    () => [
      {
        key: "first",
        title: LANGUAGES.settings.tabs.preferences.tabLabel[appLanguage],
      },
      {
        key: "second",
        title: LANGUAGES.settings.tabs.categories.tabLabel[appLanguage],
      },
    ],
    [appLanguage]
  );

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<PreferencesSettings />}
      secondRoute={<CategoriesSettings />}
    />
  );
};

export default Settings;
