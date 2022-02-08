import React from "react";
import { Button } from "native-base";

// Components
import { AddTransactionModal, TransactionsList } from "../../Shared";

// Contexts
import { PreferencesContext } from "../../Contexts";

// Utils
import { LANGUAGES } from "../../statics";
import CreditCardTransactionsList from "./CreditCardTransactionsList";

interface DebitTransactionsProps {}

const CreditCard: React.FC<DebitTransactionsProps> = ({}) => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  const { appLanguage } = React.useContext(PreferencesContext);

  return (
    <>
      <CreditCardTransactionsList />
      <Button
        bg="primary.900"
        bottom={5}
        width="350"
        height="50"
        onPress={() => setShowAddModal(true)}
      >
        {LANGUAGES.add[appLanguage]}
      </Button>
    </>
  );
};
export default CreditCard;
