import React from "react";
import {
  Button,
  Modal,
  Box,
  Select,
  CheckIcon,
  Input,
  Icon,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// Utils
import { LANGUAGES, ALL_LANGUAGES } from "../../statics";

// Store
import {
  changePastDaysDefault,
  selectPreferencesLanguage,
  selectPreferencesPastDaysDefault,
  useAppSelector,
  useAppDispatch,
} from "../../../store";

interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeDefaultDaysModal: React.FC<ManageCategoriesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const onChangeDays = React.useCallback(
    (newPastDays: number) => {
      dispatch(changePastDaysDefault(newPastDays));
    },
    [dispatch, changePastDaysDefault]
  );

  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const pastDaysDefault = useAppSelector(selectPreferencesPastDaysDefault);

  const [selectedDays, setSelectedDays] = React.useState("");

  const isSaveDisabled = React.useMemo(
    () =>
      !parseInt(selectedDays, 10) ||
      pastDaysDefault === parseInt(selectedDays, 10),
    [pastDaysDefault, selectedDays]
  );

  React.useEffect(() => {
    setSelectedDays(pastDaysDefault.toString());
  }, [appLanguage]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {
            LANGUAGES.settings.tabs.preferences.changePastDaysDefault[
              appLanguage
            ]
          }
        </Modal.Header>
        <Modal.Body>
          <Input
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="description" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            keyboardType="numeric"
            maxLength={2}
            placeholder={LANGUAGES.pastDaysDefault[appLanguage]}
            value={selectedDays}
            onChangeText={(text) => setSelectedDays(text)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Box>
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
              <Button
                onPress={() => {
                  onChangeDays(parseInt(selectedDays, 10));
                  onClose();
                }}
                isDisabled={isSaveDisabled}
              >
                {LANGUAGES.save[appLanguage]}
              </Button>
            </Button.Group>
          </Box>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ChangeDefaultDaysModal;
