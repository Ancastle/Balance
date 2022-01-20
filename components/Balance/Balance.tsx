import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

//TBD: MAKE DINAMIC
const appLanguage = 1;

const Balance: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.expence.tabs.debit[appLanguage] },
    { key: "second", title: LANGUAGES.expence.tabs.debt[appLanguage] },
  ];
  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<Center flex={1}>1</Center>}
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Balance;
