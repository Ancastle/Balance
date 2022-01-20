import React from "react";

// Components
import FabComponent from "./FabComponent";
import TransactionsList from "./TransactionsList";
import { AddTransactionModal } from "../Shared";

// Contexts
import { TransactionsContext } from "../Contexts/TransactionsContextProvider";

// Types
import { TransactionType } from "../types";

// Utils
import { LANGUAGES } from "../statics";

//TBD: MAKE DINAMIC
const appLanguage = 1;

interface DebitTransactionsProps {
  type: TransactionType;
}

const DebitTransactions: React.FC<DebitTransactionsProps> = ({ type }) => {
  const { transactions } = React.useContext(TransactionsContext);

  const [showAddModal, setShowAddModal] = React.useState(false);

  const showingTransactions = React.useMemo(
    () => transactions.filter((transaction) => transaction.type === type),
    [transactions, type]
  );

  const data = [
    {
      title: LANGUAGES[type].debitLabels[appLanguage],
      data: showingTransactions,
    },
  ];
  return (
    <>
      <TransactionsList data={data} type={type} />
      <FabComponent onClick={() => setShowAddModal(true)} />
      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type={type}
      />
    </>
  );
};
export default DebitTransactions;
