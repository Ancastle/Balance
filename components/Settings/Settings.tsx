import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";
import CategoriesSettings from "./CategoriesSettings";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

//TBD: MAKE DINAMIC
const appLanguage = 1;

const Settings: React.FC = () => {
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
