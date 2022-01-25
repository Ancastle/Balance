import * as React from "react";

// Components
import { TabsHeader } from "../Shared";
import PreferencesSettings from "./PreferencesSettings";
import CategoriesSettings from "./CategoriesSettings";

// Contexts
import { PreferencesContext } from "../Contexts";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

const Settings: React.FC = () => {
  const { preferences } = React.useContext(PreferencesContext);
  const appLanguage = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const tabs: Tab[] = [
    {
      key: "first",
      title: LANGUAGES.settings.tabs.categories.tabLabel[appLanguage],
    },
    {
      key: "second",
      title: LANGUAGES.settings.tabs.preferences.tabLabel[appLanguage],
    },
  ];

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<CategoriesSettings />}
      secondRoute={<PreferencesSettings />}
    />
  );
};

export default Settings;
