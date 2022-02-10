import React from "react";
import { Button, Modal, FormControl, Input, Icon, Radio } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

//Contexts
import {
  CreditCardContext,
  PreferencesContext,
  TransactionsContext,
} from "../../Contexts";

// Utils
import { LANGUAGES } from "../../statics";
import { makeCurrencyFormat } from "../../utils";

interface ReviewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PayCreditCardModal: React.FC<ReviewTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);
  const { totalDebt } = React.useContext(CreditCardContext);
  const { totalBalance } = React.useContext(TransactionsContext);

  const [value, setValue] = React.useState("");
  const [radio, setRadio] = React.useState("");

  const handleSubmit = React.useCallback(() => {}, []);

  const isSaveDisabled = React.useMemo(
    () => radio === "two" && parseInt(value, 10) > totalBalance,
    [radio, totalBalance, value]
  );

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
                totalBalance < totalDebt &&
                `(Max. ${makeCurrencyFormat(totalBalance)})`
              }`}
            </Radio>
          </Radio.Group>
          {radio === "two" && (
            <FormControl>
              <Input
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
            </FormControl>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                onClose();
              }}
            >
              {LANGUAGES.cancel[appLanguage]}
            </Button>
            <Button onPress={handleSubmit} isDisabled={isSaveDisabled}>
              {LANGUAGES.save[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default PayCreditCardModal;
