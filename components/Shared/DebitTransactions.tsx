import React from "react";
import { Button, Center } from "native-base";

// Components
import TransactionsList from "./TransactionsList";
import AddTransactionModal from "./AddTransactionModal";

// Contexts
import { PreferencesContext } from "../Contexts";

// Types
import { TransactionType } from "../types";

// Utils
import { LANGUAGES } from "../statics";

interface DebitTransactionsProps {
  type: TransactionType;
}

const DebitTransactions: React.FC<DebitTransactionsProps> = ({ type }) => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  const { appLanguage } = React.useContext(PreferencesContext);

  return (
    <>
      <TransactionsList type={type} />
      <Center>
        <Button
          bg="primary.900"
          bottom={5}
          width="350"
          height="50"
          onPress={() => setShowAddModal(true)}
        >
          {LANGUAGES.add[appLanguage]}
        </Button>
      </Center>
      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type={type}
      />
    </>
  );
};
export default DebitTransactions;
