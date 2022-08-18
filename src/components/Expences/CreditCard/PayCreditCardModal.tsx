import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Icon,
  Radio,
  Select,
  CheckIcon,
  Checkbox,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// Utils
import { LANGUAGES } from "../../statics";
import { makeCurrencyFormat } from "../../utils";

import { Person } from "../../types";

// Store
import {
  selectTransactionsTotal,
  selectPreferencesLanguage,
  selectCreditCardTotal,
  payCreditCard,
  addCreditCardPayment,
  addHistoryRegister,
  selectPeopleData,
  useAppDispatch,
  useAppSelector,
  addPersonTransaction,
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
      const payCreditCardTransactions = dispatch(payCreditCard(amount));
      if (isPersonPaying && person) {
        const personPayedCardTransactions = payCreditCardTransactions.map(
          (tr) => ({
            ...tr,
            name: `${person.name} ${LANGUAGES.personPays[appLanguage]} ${tr.name} `,
            value: "0",
          })
        );
        dispatch(addCreditCardPayment(personPayedCardTransactions));
        dispatch(addPersonTransaction(person.id, parseInt(value), "them"));
      } else {
        dispatch(addCreditCardPayment(payCreditCardTransactions));
      }
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
  const people = useAppSelector(selectPeopleData);
  const totalDebt = useAppSelector(selectCreditCardTotal);
  const totalBalance = useAppSelector(selectTransactionsTotal);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [value, setValue] = React.useState("");
  const [radio, setRadio] = React.useState("");
  const [isPersonPaying, setIsPersonPaying] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [person, setPerson] = React.useState<Person | undefined>();

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

  React.useEffect(() => {
    setPerson(people.find((p) => p.name === personName));
  }, [personName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.expence.tabs.creditCard.payingCard[appLanguage]}
        </Modal.Header>
        <Modal.Body>
          <Checkbox
            value=""
            isChecked={isPersonPaying}
            color="green.100"
            onChange={() => setIsPersonPaying((prevState) => !prevState)}
            mt={3}
          >
            <Text ml={2}>{LANGUAGES.isAnotherPerson[appLanguage]}</Text>
          </Checkbox>
          {isPersonPaying && (
            <Select
              selectedValue={personName}
              minWidth="200"
              placeholder={LANGUAGES.loanToPerson[appLanguage]}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={3}
              onValueChange={(itemValue) => setPersonName(itemValue)}
            >
              {people.map((person, i) => (
                <Select.Item
                  key={i}
                  label={`${person.name} (${makeCurrencyFormat(
                    parseInt(person.value)
                  )})`}
                  value={person.name}
                />
              ))}
            </Select>
          )}
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={radio}
            onChange={(nextValue) => {
              setRadio(nextValue);
            }}
          >
            <Radio
              value="one"
              my={1}
              isDisabled={
                totalDebt > totalBalance || (isPersonPaying && !person)
              }
            >
              {`${
                LANGUAGES.expence.tabs.creditCard.payTotal[appLanguage]
              } (${makeCurrencyFormat(totalDebt)})`}
            </Radio>
            <Radio value="two" my={1} isDisabled={isPersonPaying && !person}>
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
          {person && parseInt(person?.value || "1") < 0 && (
            <Text
              color={"red.500"}
            >{`${LANGUAGES.alreadyInDebt[appLanguage]} ${person?.name}`}</Text>
          )}
          {person &&
            parseInt(person.value) > 0 &&
            parseInt(person.value || "1") < totalDebt &&
            radio === "one" && (
              <Text
                color={"red.500"}
              >{`${LANGUAGES.createsADebt[appLanguage]} ${person?.name}`}</Text>
            )}
          {person &&
            parseInt(person?.value || "1") < parseInt(value) &&
            radio === "two" && (
              <Text
                color={"red.500"}
              >{`${LANGUAGES.createsADebt[appLanguage]} ${person?.name}`}</Text>
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
