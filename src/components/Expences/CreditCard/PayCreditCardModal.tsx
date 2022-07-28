import React from "react";
import { Button, Modal, FormControl, Input, Icon, Radio } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// Utils
import { LANGUAGES } from "../../statics";
import { makeCurrencyFormat } from "../../utils";

// Store
import {
  selectTransactionsTotal,
  selectPreferencesLanguage,
  selectCreditCardTotal,
  payCreditCard,
  useAppDispatch,
  useAppSelector,
  addCreditCardPayment,
  addHistoryRegister,
} from "../../../store";

interface ReviewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PayCreditCardModal: React.FC<ReviewTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const onPayCreditCard = React.useCallback(
    (amount: number) => {
      dispatch(addCreditCardPayment(dispatch(payCreditCard(amount))));
      dispatch(
        addHistoryRegister(
          LANGUAGES.payCreditCard[appLanguage],
          amount.toString()
        )
      );
      onClose();
    },
    [dispatch, [payCreditCard]]
  );

  const totalDebt = useAppSelector(selectCreditCardTotal);
  const totalBalance = useAppSelector(selectTransactionsTotal);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [value, setValue] = React.useState("");
  const [radio, setRadio] = React.useState("");

  const resetValues = React.useCallback(() => {
    setValue("");
    setRadio("");
  }, []);

  const isSaveDisabled = React.useMemo(
    () =>
      (radio === "two" && parseInt(value, 10) > totalBalance) ||
      radio === "" ||
      (radio === "two" && value === "") ||
      (radio === "two" && parseInt(value, 10) > totalDebt),
    [radio, totalBalance, value]
  );

  React.useEffect(() => {
    radio === "one" ? setValue(totalDebt.toString()) : setValue("");
  }, [radio]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.expence.tabs.creditCard.payingCard[appLanguage]}
        </Modal.Header>
        <Modal.Body>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={radio}
            onChange={(nextValue) => {
              setRadio(nextValue);
            }}
          >
            <Radio value="one" my={1} isDisabled={totalDebt > totalBalance}>
              {`${
                LANGUAGES.expence.tabs.creditCard.payTotal[appLanguage]
              } (${makeCurrencyFormat(totalDebt)})`}
            </Radio>
            <Radio value="two" my={1}>
              {`${LANGUAGES.expence.tabs.creditCard.otherValue[appLanguage]} ${
                totalBalance < totalDebt
                  ? `(Max. ${makeCurrencyFormat(totalBalance)})`
                  : ""
              }`}
            </Radio>
          </Radio.Group>
          {radio === "two" && (
            <FormControl>
              <Input
                isInvalid={parseInt(value, 10) > totalDebt}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="attach-money" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder={
                  LANGUAGES.expence.tabs.creditCard.otherValue[appLanguage]
                }
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
              />
              <FormControl.ErrorMessage />
            </FormControl>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                resetValues();
                onClose();
              }}
            >
              {LANGUAGES.cancel[appLanguage]}
            </Button>
            <Button
              onPress={() => onPayCreditCard(parseInt(value, 10))}
              isDisabled={isSaveDisabled}
            >
              {LANGUAGES.save[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default PayCreditCardModal;
