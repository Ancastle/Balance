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
  const { appLanguage } = React.useContext(PreferencesContext);

  const tabs: Tab[] = React.useMemo(
    () => [
      {
        key: "first",
        title: LANGUAGES.settings.tabs.categories.tabLabel[appLanguage],
      },
      {
        key: "second",
        title: LANGUAGES.settings.tabs.preferences.tabLabel[appLanguage],
      },
    ],
    [appLanguage]
  );

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<CategoriesSettings />}
      secondRoute={<PreferencesSettings />}
    />
  );
};

export default Settings;
