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
import { PreferencesContext } from "../../Contexts";

// Types
import { Person } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

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
  const { appLanguage } = React.useContext(PreferencesContext);

  const [whoPays, setWhoPays] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isCash, setIsCash] = React.useState(false);

  const resetModal = React.useCallback(() => {
    setWhoPays("");
    setAmount("");
  }, []);

  const isSaveDisabled = React.useMemo(
    () => !amount || !whoPays || !person,
    [amount, whoPays, person]
  );

  const handleSave = React.useCallback(() => {
    if (person) {
      onTransaction(person, amount, whoPays);
      resetModal();
      onClose();
    }
  }, [whoPays, amount, person]);

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
