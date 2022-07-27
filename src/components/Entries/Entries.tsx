import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader, DebitTransactions } from "../Shared";

// Contexts
import { PreferencesContext } from "../Contexts";

// Types
import { Tab, Transaction, TransactionInput } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import { addTransaction, editTransaction } from "../../app/transactionsSlice";
import { useAppDispatch } from "../../app/hooks";

const Entries: React.FC = () => {
  const { appLanguage } = React.useContext(PreferencesContext);
  const dispatch = useAppDispatch();

  const onAdd = (newTransactionInput: TransactionInput) =>
    dispatch(addTransaction(newTransactionInput));

  const onEdit = (editingTransaction: Transaction) =>
    dispatch(editTransaction(editingTransaction));

  const tabs: Tab[] = React.useMemo(
    () => [{ key: "first", title: LANGUAGES.entry.tabs.debit[appLanguage] }],
    [appLanguage]
  );

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={
        <DebitTransactions type="entry" onAdd={onAdd} onEdit={onEdit} />
      }
    />
  );
};

export default Entries;
