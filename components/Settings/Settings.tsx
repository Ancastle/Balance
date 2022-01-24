import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";
import CategoriesSettings from "./CategoriesSettings";

// Contexts
import { PreferencesContext } from "../Contexts/PreferencesContextProvider";

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
    { key: "second", title: LANGUAGES.settings.tabs.preferences[appLanguage] },
  ];

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<CategoriesSettings />}
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Settings;
