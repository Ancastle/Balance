import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";
import DebitTransactions from "../Shared/DebitTransactions";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

//TBD: MAKE DINAMIC
const appLanguage = 1;

const Entries: React.FC = () => {
  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.entry.tabs.debit[appLanguage] },
    { key: "second", title: LANGUAGES.entry.tabs.loans[appLanguage] },
  ];

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<DebitTransactions type="entry" />}
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Entries;
