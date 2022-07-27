import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Icon,
  Select,
  CheckIcon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// Contexts
import { CategoriesContext, PreferencesContext } from "../Contexts";

// Types
import { TransactionInput, TransactionType } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategoriesData } from "../../app/categoriesSlice";

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
  const { appLanguage } = React.useContext(PreferencesContext);

  const [categoryId, setCategoryId] = React.useState("");
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const resetModal = React.useCallback(() => {
    setName("");
    setCategoryId("reset");
    setAmount("");
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
    });
    resetModal();
    onClose();
  }, [name, amount, categoryId, type]);

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
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </FormControl>
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
          >
            {showingCategories.map((category, i) => (
              <Select.Item
                key={i}
                label={category.name}
                value={category.id.toString()}
              />
            ))}
          </Select>
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
