import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader, DebitTransactions } from "../Shared";
import CreditCard from "./CreditCard";

// Contexts
import { PreferencesContext } from "../Contexts";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

const Expences: React.FC = () => {
  const { appLanguage } = React.useContext(PreferencesContext);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.expence.tabs.debit[appLanguage] },
    {
      key: "second",
      title: LANGUAGES.expence.tabs.creditCard.tabLabel[appLanguage],
    },
    { key: "third", title: LANGUAGES.expence.tabs.debt[appLanguage] },
  ];

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<DebitTransactions type="expence" />}
      secondRoute={<CreditCard />}
      thirdRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Expences;
