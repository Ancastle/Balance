import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader, DebitTransactions } from "../Shared";

// Types
import { Tab, Transaction, TransactionInput } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import {
  addTransaction,
  editTransaction,
  selectPreferencesLanguage,
  useAppDispatch,
  useAppSelector,
} from "../../store";

const Entries: React.FC = () => {
  const dispatch = useAppDispatch();

  const appLanguage = useAppSelector(selectPreferencesLanguage);

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
