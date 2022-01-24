import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";
import BalanceTransactionsList from "./BalanceTransactionsList";

// Contexts
import { PreferencesContext } from "../Contexts/PreferencesContextProvider";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

const Balance: React.FC = () => {
  const { preferences } = React.useContext(PreferencesContext);
  const appLanguage = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.balance.tabs.balance[appLanguage] },
    { key: "second", title: LANGUAGES.expence.tabs.debt[appLanguage] },
  ];
  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<BalanceTransactionsList />}
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Balance;
