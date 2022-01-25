import React from "react";

// Components
import {
  AddTransactionModal,
  TransactionsList,
  FabComponent,
} from "../../Shared";

// Types
import { TransactionType } from "../../types";

interface DebitTransactionsProps {
  type: TransactionType;
}

const CreditCardTransactions: React.FC<DebitTransactionsProps> = ({ type }) => {
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
export default CreditCardTransactions;
