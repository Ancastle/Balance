import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader, DebitTransactions } from "../Shared";

// Contexts
import { PreferencesContext, TransactionsContext } from "../Contexts";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

const Entries: React.FC = () => {
  const { appLanguage } = React.useContext(PreferencesContext);
  const { addTransaction, editTransaction } =
    React.useContext(TransactionsContext);

  const tabs: Tab[] = React.useMemo(
    () => [
      { key: "first", title: LANGUAGES.entry.tabs.debit[appLanguage] },
      { key: "second", title: LANGUAGES.entry.tabs.loans[appLanguage] },
    ],
    [appLanguage]
  );

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={
        <DebitTransactions
          type="entry"
          onAdd={addTransaction}
          onEdit={editTransaction}
        />
      }
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Entries;
