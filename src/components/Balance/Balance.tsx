import * as React from "react";

// Components
import { TabsHeader } from "../Shared";
import BalanceTransactionsList from "./BalanceTransactionsList";
import DebtsLoans from "./DebtsLoans";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../store";

const Balance: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const tabs: Tab[] = React.useMemo(
    () => [
      { key: "first", title: LANGUAGES.balance.tabs.balance[appLanguage] },
      {
        key: "second",
        title: LANGUAGES.balance.tabs.debtsLoans.tabLabel[appLanguage],
      },
    ],
    [appLanguage]
  );

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<BalanceTransactionsList />}
      secondRoute={<DebtsLoans />}
    />
  );
};

export default Balance;
