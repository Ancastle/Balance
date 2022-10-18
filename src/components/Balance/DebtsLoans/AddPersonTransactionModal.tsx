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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// Types
import { Person, TransactionInput } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

import { makeCurrencyFormat, makeFlatNumber } from "../../utils";

// Store
import {
  selectPreferencesLanguage,
  addTransaction,
  selectTransactionsTotal,
  addHistoryRegister,
  useAppSelector,
  useAppDispatch,
} from "../../../store";
import PersonHistoryList from "./PersonHistoryList";

interface AddPersonTransactionModalProps {
  isOpen: boolean;
  person: Person;
  onClose: () => void;
  onTransaction: (
    person: Person,
    amount: string,
    whoPays: string,
    reason: string
  ) => void;
}

const AddPersonTransactionModal: React.FC<AddPersonTransactionModalProps> = ({
  isOpen,
  onClose,
  onTransaction,
  person,
}) => {
  const dispatch = useAppDispatch();

  const totalBalance = useAppSelector(selectTransactionsTotal);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const onAdd = React.useCallback(
    (newTransactionInput: TransactionInput) => {
      dispatch(addTransaction(newTransactionInput));
      dispatch(
        addHistoryRegister(
          LANGUAGES.addPersonTransaction[appLanguage],
          newTransactionInput.personName || ""
        )
      );
    },
    [dispatch, addTransaction]
  );

  const [whoPays, setWhoPays] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isCash, setIsCash] = React.useState(false);
  const [displayAmount, setDisplayAmount] = React.useState("");
  const [reason, setReason] = React.useState("");

  const resetModal = React.useCallback(() => {
    setWhoPays("");
    setAmount("");
  }, []);

  const isSaveDisabled = React.useMemo(
    () =>
      !amount ||
      !whoPays ||
      !person ||
      (whoPays === "me" && parseInt(amount, 10) > totalBalance && !isCash),
    [amount, whoPays, person]
  );

  const onAddPersonTransaction = React.useCallback(() => {
    if (person) {
      onTransaction(person, amount, whoPays, reason);
      if (!isCash) {
        if (whoPays === "me") {
          onAdd({
            name: `${LANGUAGES.balance.tabs.debtsLoans.youPayTo[appLanguage]} ${person.name}`,
            type: "expence",
            value: amount,
            categoryId: "expence1",
            isNecesary: true,
            personName: person.name,
          });
        } else {
          onAdd({
            name: `${person.name} ${LANGUAGES.balance.tabs.debtsLoans.paysToYou[appLanguage]}`,
            type: "entry",
            value: amount,
            categoryId: "entry1",
            isNecesary: false,
            personName: person.name,
          });
        }
      }
      resetModal();
      onClose();
    }
  }, [whoPays, amount, person, isCash, reason]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.balance.tabs.debtsLoans.addingTransaction[appLanguage]}
          <Text>{person?.name}</Text>
          <Text>{`(${makeCurrencyFormat(parseInt(person?.value))})`}</Text>
        </Modal.Header>
        <Modal.Body>
          <PersonHistoryList person={person} />
          {!!person && (
            <Select
              dropdownIcon={
                <MaterialCommunityIcons name="chevron-down" size={20} />
              }
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
              value={displayAmount}
              onChangeText={(text) => {
                setDisplayAmount(
                  makeCurrencyFormat(makeFlatNumber(text), true)
                );
                setAmount(makeFlatNumber(text).toString());
              }}
              isDisabled={!person}
            />
          </FormControl>
          {parseInt(amount) > totalBalance && !isCash && whoPays === "me" && (
            <Text bold>
              {LANGUAGES.balance.tabs.debtsLoans.moneyExceeded[appLanguage]}
            </Text>
          )}
          <FormControl mt="3">
            <Input
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="description" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder={LANGUAGES.reason[appLanguage]}
              value={reason}
              onChangeText={(text) => {
                setReason(text);
              }}
            />
          </FormControl>
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
            <Button
              onPress={onAddPersonTransaction}
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

export default AddPersonTransactionModal;
