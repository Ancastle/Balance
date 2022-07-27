import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Icon,
  Select,
  CheckIcon,
  Text,
  Checkbox,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// Contexts
import { HistoryContext, PreferencesContext } from "../../Contexts";

// Types
import { Person, TransactionInput } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

// Store
import {
  addTransaction,
  selectTransactionsTotal,
} from "../../../app/transactionsSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

interface AddPersonTransactionModalProps {
  isOpen: boolean;
  person: Person | null;
  onClose: () => void;
  onTransaction: (person: Person, amount: string, whoPays: string) => void;
}

const AddPersonTransactionModal: React.FC<AddPersonTransactionModalProps> = ({
  isOpen,
  onClose,
  onTransaction,
  person,
}) => {
  const dispatch = useAppDispatch();

  const totalBalance = useAppSelector(selectTransactionsTotal);

  const { appLanguage } = React.useContext(PreferencesContext);
  const { history } = React.useContext(HistoryContext);

  const onAdd = (newTransactionInput: TransactionInput) =>
    dispatch(addTransaction(newTransactionInput));

  const [whoPays, setWhoPays] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isCash, setIsCash] = React.useState(false);

  const resetModal = React.useCallback(() => {
    setWhoPays("");
    setAmount("");
  }, []);

  const isSaveDisabled = React.useMemo(
    () =>
      !amount ||
      !whoPays ||
      !person ||
      (whoPays === "me" && parseInt(amount, 10) > totalBalance),
    [amount, whoPays, person]
  );

  const handleSave = React.useCallback(() => {
    if (person) {
      onTransaction(person, amount, whoPays);
      if (!isCash) {
        if (whoPays === "me") {
          onAdd({
            name: `${LANGUAGES.balance.tabs.debtsLoans.youPayTo[appLanguage]} ${person.name}`,
            type: "expence",
            value: amount,
            categoryId: "expence0",
          });
        } else {
          onAdd({
            name: `${person.name} ${LANGUAGES.balance.tabs.debtsLoans.paysToYou[appLanguage]}`,
            type: "entry",
            value: amount,
            categoryId: "entry0",
          });
        }
      }
      resetModal();
      onClose();
    }
  }, [whoPays, amount, person, isCash, history]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.balance.tabs.debtsLoans.addingTransaction[appLanguage]}
          <Text>{person?.name}</Text>
        </Modal.Header>
        <Modal.Body>
          {!!person && (
            <Select
              selectedValue={whoPays}
              minWidth="200"
              placeholder={
                LANGUAGES.balance.tabs.debtsLoans.selectWhoPays[appLanguage]
              }
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={3}
              onValueChange={(itemValue) => setWhoPays(itemValue)}
            >
              <Select.Item
                key={0}
                label={
                  LANGUAGES.balance.tabs.debtsLoans.transactionMe[appLanguage]
                }
                value="me"
              />
              <Select.Item key={1} label={person.name} value={person.name} />
            </Select>
          )}
          <FormControl mt="3">
            <Input
              type="number"
              keyboardType="numeric"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="attach-money" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder={LANGUAGES.value[appLanguage]}
              value={amount}
              onChangeText={(text) => setAmount(text)}
              isDisabled={!person}
            />
          </FormControl>
          {parseInt(amount) > totalBalance && !isCash && whoPays === "me" && (
            <Text bold>
              {LANGUAGES.balance.tabs.debtsLoans.moneyExceeded[appLanguage]}
            </Text>
          )}
          <Checkbox
            value=""
            isChecked={isCash}
            color="green.100"
            onChange={() => setIsCash((prevState) => !prevState)}
            mt={3}
          >
            <Text ml={2}>
              {LANGUAGES.balance.tabs.debtsLoans.isCash[appLanguage]}
            </Text>
          </Checkbox>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                resetModal();
                onClose();
              }}
            >
              {LANGUAGES.cancel[appLanguage]}
            </Button>
            <Button onPress={handleSave} isDisabled={isSaveDisabled}>
              {LANGUAGES.save[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddPersonTransactionModal;
