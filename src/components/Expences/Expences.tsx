import * as React from "react";

// Components
import { TabsHeader, DebitTransactions } from "../Shared";
import CreditCard from "./CreditCard";

// Contexts
import { PreferencesContext } from "../Contexts";

// Types
import { Tab, Transaction, TransactionInput } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import { addTransaction, editTransaction } from "../../app/transactionsSlice";
import { useAppDispatch } from "../../app/hooks";

const Expences: React.FC = () => {
  const dispatch = useAppDispatch();

  const onAdd = React.useCallback(
    (newTransactionInput: TransactionInput) =>
      dispatch(addTransaction(newTransactionInput)),
    [dispatch, addTransaction]
  );

  const onEdit = React.useCallback(
    (editingTransaction: Transaction) =>
      dispatch(editTransaction(editingTransaction)),
    [dispatch, editTransaction]
  );

  const { appLanguage } = React.useContext(PreferencesContext);

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
        <DebitTransactions type="expence" onAdd={onAdd} onEdit={onEdit} />
      }
      secondRoute={<CreditCard />}
    />
  );
};

export default Expences;
