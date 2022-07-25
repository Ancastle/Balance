import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader, DebitTransactions } from "../Shared";
import CreditCard from "./CreditCard";

// Contexts
import { PreferencesContext, TransactionsContext } from "../Contexts";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

const Expences: React.FC = () => {
  const { appLanguage } = React.useContext(PreferencesContext);
  const { addTransaction, editTransaction } =
    React.useContext(TransactionsContext);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.expence.tabs.debit[appLanguage] },
    {
      key: "second",
      title: LANGUAGES.expence.tabs.creditCard.tabLabel[appLanguage],
    },
  ];

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={
        <DebitTransactions
          type="expence"
          onAdd={addTransaction}
          onEdit={editTransaction}
        />
      }
      secondRoute={<CreditCard />}
    />
  );
};

export default Expences;
