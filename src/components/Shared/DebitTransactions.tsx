import React from "react";
import { Button, Center } from "native-base";

// Components
import TransactionsList from "./TransactionsList";
import AddTransactionModal from "./AddTransactionModal";

// Types
import { TransactionType, Transaction, TransactionInput } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../store";

interface DebitTransactionsProps {
  type: TransactionType;
  onEdit: (editingTransaction: Transaction, originalValue: string) => void;
  onAdd: (newTransaction: TransactionInput) => void;
}

const DebitTransactions: React.FC<DebitTransactionsProps> = ({
  type,
  onEdit,
  onAdd,
}) => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  const appLanguage = useAppSelector(selectPreferencesLanguage);

  return (
    <>
      <TransactionsList type={type} onEdit={onEdit} />
      <Center>
        <Button
          bg="primary.900"
          bottom={5}
          mt={5}
          width="350"
          height="50"
          onPress={() => setShowAddModal(true)}
        >
          {LANGUAGES.add[appLanguage]}
        </Button>
      </Center>
      {showAddModal && (
        <AddTransactionModal
          onAdd={onAdd}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          type={type}
        />
      )}
    </>
  );
};
export default DebitTransactions;
