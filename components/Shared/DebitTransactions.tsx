import React from "react";

// Components
import FabComponent from "./FabComponent";
import TransactionsList from "./TransactionsList";
import { AddTransactionModal } from "../Shared";

// Types
import { TransactionType } from "../types";

interface DebitTransactionsProps {
  type: TransactionType;
}

const DebitTransactions: React.FC<DebitTransactionsProps> = ({ type }) => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  return (
    <>
      <TransactionsList type={type} />
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
