import React from "react";
import { Button, Center, useToast } from "native-base";

// Components
import CreditCardTransactionsList from "./CreditCardTransactionsList";
import PayCreditCardModal from "./PayCreditCardModal";
import AddCreditCardTransactionModal from "./AddCreditCardTransactionModal";
import HelperToastIcon from "../../Shared/HelperToastIcon";

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

interface DebitTransactionsProps {}

const CreditCard: React.FC<DebitTransactionsProps> = ({}) => {
  const dispatch = useAppDispatch();
  const totalDebt = useAppSelector(selectCreditCardTotal);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showPayModal, setShowPayModal] = React.useState(false);

  const toast = useToast();

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

  return (
    <>
      <HelperToastIcon
        styles={{ position: "absolute", left: 330, top: 14, zIndex: 99 }}
        onPress={() => {
          if (!toast.isActive("homeScreenHelper")) {
            toast.show({
              id: "homeScreenHelper",
              description: LANGUAGES.helpers.creditCard[appLanguage],
              placement: "top",
              duration: 8000,
            });
          }
        }}
      />
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
      {showAddModal && (
        <AddCreditCardTransactionModal
          onAdd={onAddCreditCardTransaction}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showPayModal && (
        <PayCreditCardModal
          onClose={() => setShowPayModal(false)}
          isOpen={showPayModal}
        />
      )}
    </>
  );
};
export default CreditCard;
