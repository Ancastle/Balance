import React from "react";
import { Button } from "native-base";

// Components
import { AddTransactionModal, TransactionsList } from "../../Shared";

// Contexts
import { PreferencesContext } from "../../Contexts";

// Types
import { TransactionType } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

interface DebitTransactionsProps {
  type: TransactionType;
}

const CreditCardTransactions: React.FC<DebitTransactionsProps> = ({ type }) => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  const { appLanguage } = React.useContext(PreferencesContext);

  return (
    <>
      <TransactionsList type={type} />
      <Button
        bg="primary.900"
        bottom={5}
        width="350"
        height="50"
        onPress={() => setShowAddModal(true)}
      >
        {LANGUAGES.add[appLanguage]}
      </Button>
      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type={type}
      />
    </>
  );
};
export default CreditCardTransactions;
