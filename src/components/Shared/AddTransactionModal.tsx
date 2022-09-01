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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// Types
import { TransactionInput, TransactionType } from "../types";

// Utils
import { LANGUAGES } from "../statics";

import { makeCurrencyFormat, makeFlatNumber } from "../utils";

// Store
import {
  selectCategoriesData,
  selectPreferencesLanguage,
  useAppSelector,
} from "../../store";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
  onAdd: (newTransaction: TransactionInput) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  onAdd,
}) => {
  const categories = useAppSelector(selectCategoriesData);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [categoryId, setCategoryId] = React.useState("");
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [displayAmount, setDisplayAmount] = React.useState("");
  const [necesary, setNecesary] = React.useState(false);

  const resetModal = React.useCallback(() => {
    setName("");
    setCategoryId("reset");
    setAmount("");
    setDisplayAmount("");
    setNecesary(false);
  }, []);

  const isSaveDisabled = React.useMemo(
    () => !name || !amount || !categoryId || categoryId === "reset",
    [name, amount, categoryId]
  );

  const showingCategories = React.useMemo(
    () => categories.filter((category) => category.type === type),
    [categories]
  );

  const handleSave = React.useCallback(() => {
    onAdd({
      name: name,
      value: amount.toString(),
      categoryId: categoryId,
      type: type,
      isNecesary: necesary,
    });
    resetModal();
    onClose();
  }, [name, amount, categoryId, type, necesary]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {type === "expence"
            ? LANGUAGES.expence.adding[appLanguage]
            : LANGUAGES.entry.adding[appLanguage]}
        </Modal.Header>
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
          <Select
            dropdownIcon={
              <MaterialCommunityIcons name="chevron-down" size={20} />
            }
            selectedValue={categoryId}
            minWidth="200"
            placeholder={LANGUAGES.selectCategory[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
          >
            {showingCategories.map((category, i) => (
              <Select.Item
                key={i}
                label={category.name}
                value={category.id.toString()}
              />
            ))}
          </Select>
          {type === "expence" && (
            <Checkbox
              value=""
              isChecked={necesary}
              color="green.100"
              onChange={() => setNecesary((prevState) => !prevState)}
              mt={3}
            >
              <Text ml={2}>{LANGUAGES.isThisNecesary[appLanguage]}</Text>
            </Checkbox>
          )}
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

export default AddTransactionModal;
