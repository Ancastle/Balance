// Externals
import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";

// Types
import { Tab } from "../types";

// Utils
import LANGUAGES from "../languages";

//TBD: MAKE DINAMIC
const appLanguage = 1;

const Balance: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.expences.tabs.debit[appLanguage] },
    { key: "second", title: LANGUAGES.expences.tabs.debt[appLanguage] },
  ];
  return (
    <TabsHeader
      tabs={tabs}
      onTabChange={(tab: number) => {
        setTabIndex(tab);
      }}
      firstRoute={<Center flex={1}>1</Center>}
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Balance;
