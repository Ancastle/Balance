import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Icon,
  Select,
  CheckIcon,
  Checkbox,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// Types
import { TransactionInput } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

import { makeCurrencyFormat, makeFlatNumber } from "../../utils";
// Store
import {
  selectCategoriesData,
  selectPreferencesLanguage,
  selectPeopleData,
  addPersonTransaction,
  useAppSelector,
  useAppDispatch,
} from "../../../store";

interface AddCreditCardTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newTransaction: TransactionInput) => void;
}

const AddCreditCardTransactionModal: React.FC<
  AddCreditCardTransactionModalProps
> = ({ isOpen, onClose, onAdd }) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategoriesData);
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const people = useAppSelector(selectPeopleData);

  const [categoryId, setCategoryId] = React.useState("");
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [displayAmount, setDisplayAmount] = React.useState("");
  const [isALoan, setIsALoan] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [necesary, setNecesary] = React.useState(false);

  const resetModal = React.useCallback(() => {
    setCategoryId("");
    setName("");
    setAmount("");
    setIsALoan(false);
    setPersonName("");
  }, []);

  const isSaveDisabled = React.useMemo(
    () => !name || !amount || !categoryId || (isALoan && !personName),
    [name, amount, categoryId, isALoan, personName]
  );

  const showingCategories = React.useMemo(
    () => categories.filter((category) => category.type === "expence"),
    [categories]
  );

  const handleSave = React.useCallback(() => {
    onAdd({
      name: name,
      value: amount.toString(),
      categoryId: categoryId,
      type: "expence",
      isNecesary: necesary,
    });
    if (isALoan) {
      const person = people.find((person) => person.name === personName);
      if (person)
        dispatch(addPersonTransaction(person.id, parseInt(amount, 10), "me"));
    }
    resetModal();
    onClose();
  }, [name, amount, categoryId, isALoan, personName]);

  React.useEffect(() => {
    if (isALoan) {
      setCategoryId("expence1");
    } else {
      setCategoryId("");
    }
  }, [isALoan]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{LANGUAGES.expence.adding[appLanguage]}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <Input
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="description" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder={LANGUAGES.name[appLanguage]}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </FormControl>
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
            />
          </FormControl>
          <Checkbox
            value=""
            isChecked={isALoan}
            color="green.100"
            onChange={() => setIsALoan((prevState) => !prevState)}
            mt={3}
          >
            <Text ml={2}>{LANGUAGES.isThisALoan[appLanguage]}</Text>
          </Checkbox>
          {isALoan && (
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
                <Select.Item key={i} label={person.name} value={person.name} />
              ))}
            </Select>
          )}
          <Select
            selectedValue={categoryId}
            minWidth="200"
            placeholder={LANGUAGES.selectCategory[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
            isDisabled={isALoan}
          >
            {showingCategories.map((category, i) => (
              <Select.Item
                key={i}
                label={category.name}
                value={category.id.toString()}
              />
            ))}
          </Select>
          <Checkbox
            value=""
            isChecked={necesary}
            color="green.100"
            onChange={() => setNecesary((prevState) => !prevState)}
            mt={3}
          >
            <Text ml={2}>{LANGUAGES.isThisNecesary[appLanguage]}</Text>
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

export default AddCreditCardTransactionModal;
