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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

//Contexts
import { CategoriesContext, PreferencesContext } from "../../Contexts";

//Types
import { monthData, Transaction, TransactionType } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";
import { makeDoubleDigit } from "../../utils";

interface MonthsNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: monthData;
}

const MonthsNumbersModal: React.FC<MonthsNumbersModalProps> = ({
  isOpen,
  onClose,
  currentMonth,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.currentMonthModalTitle[appLanguage]}
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Text ml={5} mb={4}>
          {`Total: ${currentMonth.value}`}
        </Text>
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
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default MonthsNumbersModal;
