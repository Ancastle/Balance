import * as React from "react";

// Components
import { TabsHeader, DebitTransactions } from "../Shared";
import CreditCard from "./CreditCard";

// Types
import { Tab, Transaction, TransactionInput } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import {
  addTransaction,
  editTransaction,
  selectPreferencesLanguage,
  addHistoryRegister,
  useAppSelector,
  useAppDispatch,
} from "../../store";

const Expences: React.FC = () => {
  const dispatch = useAppDispatch();

  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const onAdd = React.useCallback(
    (newTransactionInput: TransactionInput) => {
      dispatch(addTransaction(newTransactionInput));
      dispatch(
        addHistoryRegister(
          LANGUAGES.addTransaction[appLanguage],
          newTransactionInput.name
        )
      );
    },
    [dispatch, addTransaction]
  );

  const onEdit = React.useCallback(
    (editingTransaction: Transaction) => {
      dispatch(editTransaction(editingTransaction)),
        dispatch(
          addHistoryRegister(
            LANGUAGES.editTransaction[appLanguage],
            editingTransaction.name
          )
        );
    },
    [dispatch, editTransaction]
  );

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
