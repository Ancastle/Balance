import React from "react";
import { Button, Modal, Box, Select, CheckIcon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Utils
import { LANGUAGES, ALL_FORMATS } from "../../statics";

// Store
import {
  selectPreferencesDateFormat,
  selectPreferencesLanguage,
  changeDateFormat,
  useAppSelector,
  useAppDispatch,
} from "../../../store";

interface ChangeDateFormatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeDateFormatModal: React.FC<ChangeDateFormatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const dateFormat = useAppSelector(selectPreferencesDateFormat);

  const onChangeDateFormat = React.useCallback(
    (newDateFormat: string) => {
      dispatch(changeDateFormat(newDateFormat));
    },
    [dispatch, changeDateFormat]
  );

  const [selectedFormat, setSelectedFormat] = React.useState("");

  const isSaveDisabled = React.useMemo(
    () => dateFormat === selectedFormat,
    [dateFormat, selectedFormat]
  );

  React.useEffect(() => {
    setSelectedFormat(dateFormat);
  }, [dateFormat]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {
            LANGUAGES.settings.tabs.preferences.changeFormatModalTitle[
              appLanguage
            ]
          }
        </Modal.Header>
        <Modal.Body>
          <Select
            dropdownIcon={
              <MaterialCommunityIcons name="chevron-down" size={20} />
            }
            selectedValue={selectedFormat}
            minWidth="200"
            placeholder={
              LANGUAGES.settings.tabs.preferences.changeFormatPlaceholder[
                appLanguage
              ]
            }
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setSelectedFormat(itemValue)}
          >
            {ALL_FORMATS(appLanguage).map((format, i) => (
              <Select.Item key={i} label={format.name} value={format.value} />
            ))}
          </Select>
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
                onPress={async () => {
                  await onChangeDateFormat(selectedFormat);
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

export default ChangeDateFormatModal;
