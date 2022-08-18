import React from "react";
import { Button, Center } from "native-base";

// Components
import { AddTransactionModal } from "../../Shared";
import CreditCardTransactionsList from "./CreditCardTransactionsList";
import PayCreditCardModal from "./PayCreditCardModal";

// Types
import { TransactionInput } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

// Store
import {
  selectPreferencesLanguage,
  selectCreditCardTotal,
  addCreditCardTransaction,
  useAppSelector,
  useAppDispatch,
  addHistoryRegister,
} from "../../../store";
import AddCreditCardTransactionModal from "./AddCreditCardTransactionModal";

interface DebitTransactionsProps {}

const CreditCard: React.FC<DebitTransactionsProps> = ({}) => {
  const dispatch = useAppDispatch();

  const onAddCreditCardTransaction = React.useCallback(
    (newTransactionInput: TransactionInput) => {
      dispatch(addCreditCardTransaction(newTransactionInput));
      dispatch(
        addHistoryRegister(
          LANGUAGES.addCCTransaction[appLanguage],
          newTransactionInput.name
        )
      );
    },
    [dispatch, addCreditCardTransaction]
  );

  const totalDebt = useAppSelector(selectCreditCardTotal);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

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
          isDisabled={totalDebt == 0}
        >
          {LANGUAGES.pay[appLanguage]}
        </Button>
      </Center>
      <AddCreditCardTransactionModal
        onAdd={onAddCreditCardTransaction}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <PayCreditCardModal
        onClose={() => setShowPayModal(false)}
        isOpen={showPayModal}
      />
    </>
  );
};
export default CreditCard;
