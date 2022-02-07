import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader } from "../Shared";
import BalanceTransactionsList from "./BalanceTransactionsList";

// Contexts
import { PreferencesContext } from "../Contexts";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

const Balance: React.FC = () => {
  const { appLanguage } = React.useContext(PreferencesContext);

  const tabs: Tab[] = React.useMemo(
    () => [
      { key: "first", title: LANGUAGES.balance.tabs.balance[appLanguage] },
      { key: "second", title: LANGUAGES.expence.tabs.debt[appLanguage] },
    ],
    [appLanguage]
  );

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<BalanceTransactionsList />}
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Balance;
