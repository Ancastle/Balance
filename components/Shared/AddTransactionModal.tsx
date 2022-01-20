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
import { TransactionsContext } from "../Contexts/TransactionsContextProvider";
import { CategoriesContext } from "../Contexts/CategoriesContextProvider";

// Types
import { Category, TransactionType } from "../types";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { addTransaction } = React.useContext(TransactionsContext);
  const { categories } = React.useContext(CategoriesContext);

  const [categoryId, setCategoryId] = React.useState("");
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const resetModal = React.useCallback(() => {
    setName("");
    setCategoryId("reset");
    setAmount("");
  }, []);

  const isSaveDisabled = React.useCallback(
    () => !name || !amount || !categoryId || categoryId === "reset",
    [name, amount, categoryId]
  );

  const showingCategories = React.useMemo(
    () => categories.filter((category) => category.type === type),
    [categories]
  );

  const handleSave = React.useCallback(
    () =>
      addTransaction({
        name: name,
        value: amount.toString(),
        categoryId: categoryId,
        type: type,
      }),
    [name, amount, categoryId]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {type === "expence" ? "Agregando egreso" : "Agregando ingreso"}
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
              placeholder="Nombre"
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
              placeholder="Valor"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </FormControl>
          <Select
            selectedValue={categoryId}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Elige una categoría"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
          >
            {showingCategories.map((category, i) => (
              <Select.Item key={i} label={category.name} value={category.id} />
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
              Cancel
            </Button>
            <Button onPress={handleSave} isDisabled={isSaveDisabled()}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddTransactionModal;
