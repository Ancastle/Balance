import React from "react";
import { Button, Center } from "native-base";

// Components
import { AddTransactionModal } from "../../Shared";
import CreditCardTransactionsList from "./CreditCardTransactionsList";

// Contexts
import { PreferencesContext, CreditCardContext } from "../../Contexts";

// Utils
import { LANGUAGES } from "../../statics";

interface DebitTransactionsProps {}

const CreditCard: React.FC<DebitTransactionsProps> = ({}) => {
  const { appLanguage } = React.useContext(PreferencesContext);
  const { addCCTransaction, editCCTransaction } =
    React.useContext(CreditCardContext);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showPayModal, setShowPayModal] = React.useState(false);

  return (
    <>
      <CreditCardTransactionsList />
      <Center>
        <Button
          bg="primary.900"
          bottom={5}
          width="350"
          height="50"
          onPress={() => setShowAddModal(true)}
        >
          {LANGUAGES.expence.tabs.creditCard.addTransaction[appLanguage]}
        </Button>
        <Button
          bg="primary.900"
          mt={5}
          bottom={5}
          width="350"
          height="50"
          onPress={() => setShowPayModal(true)}
        >
          {LANGUAGES.pay[appLanguage]}
        </Button>
      </Center>
      <AddTransactionModal
        onAdd={addCCTransaction}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type="expence"
      />
    </>
  );
};
export default CreditCard;
