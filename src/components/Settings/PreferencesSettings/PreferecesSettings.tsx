import * as React from "react";
import {
  Center,
  SectionList,
  Heading,
  Pressable,
  Flex,
  Box,
  Text,
} from "native-base";

// Components
import ChangeLanguageModal from "./ChangeLanguageModal";
import ChangeDateFormatModal from "./ChangeDateFormatModal";

// Utils
import { isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

// Store
import {
  selectPreferencesLanguage,
  useAppDispatch,
  useAppSelector,
} from "../../../store";

//DEVONLY
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE } from "../../statics";

import {
  DEVONLYSETTESTINGTRANSACTIONS,
  setTestingTransactions,
} from "../../../store/transactionsSlice";
import { DEVONLYRESETCATEGORIES } from "../../../store/categoriesSlice";
import ChangeDefaultDaysModal from "./ChangeDefaultDaysModal";

const PreferencesSettings: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const dispatch = useAppDispatch();

  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  const [showTimeFormatModal, setShowTimeFormatModal] = React.useState(false);
  const [showPastDaysModal, setShowPastDaysModal] = React.useState(false);

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.settings.tabs.preferences.label[appLanguage],
        data: [
          {
            name: LANGUAGES.settings.tabs.preferences.changeLanguage[
              appLanguage
            ],
            set: () => setShowLanguageModal(true),
          },
          {
            name: LANGUAGES.settings.tabs.preferences
              .changeTimeFormatPreference[appLanguage],
            set: () => setShowTimeFormatModal(true),
          },
          {
            name: LANGUAGES.settings.tabs.preferences.changePastDaysDefault[
              appLanguage
            ],
            set: () => setShowPastDaysModal(true),
          },
        ],
      },
    ],
    [appLanguage]
  );

  return (
    <>
      <SectionList
        mb="4"
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <Box
            key={index}
            minW="64"
            bg={isEven(index) ? "primary.500" : "primary.300"}
          >
            {
              <Pressable
                py={1.5}
                onPress={() => {
                  item.set();
                }}
              >
                <Flex direction="row" py={1.5}>
                  <Box ml={7} flex={1} justifyContent="flex-start">
                    <Text>{item.name}</Text>
                  </Box>
                </Flex>
              </Pressable>
            }
          </Box>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Center>
            <Heading fontSize="xl" mt="3" pb="4">
              {title}
            </Heading>
          </Center>
        )}
      />
      {showLanguageModal && (
        <ChangeLanguageModal
          isOpen={showLanguageModal}
          onClose={() => setShowLanguageModal(false)}
        />
      )}
      {showTimeFormatModal && (
        <ChangeDateFormatModal
          isOpen={showTimeFormatModal}
          onClose={() => setShowTimeFormatModal(false)}
        />
      )}
      {showPastDaysModal && (
        <ChangeDefaultDaysModal
          isOpen={showPastDaysModal}
          onClose={() => setShowPastDaysModal(false)}
        />
      )}

      <Pressable
        py={1.5}
        onPress={() => {
          dispatch(DEVONLYRESETCATEGORIES());
        }}
      >
        <Flex direction="row" py={1.5}>
          <Box ml={7} flex={1} justifyContent="flex-start">
            <Text>Reset categories DEVONLY</Text>
          </Box>
        </Flex>
      </Pressable>
      <Pressable
        py={1.5}
        onPress={() => {
          dispatch(DEVONLYSETTESTINGTRANSACTIONS());
        }}
      >
        <Flex direction="row" py={1.5}>
          <Box ml={7} flex={1} justifyContent="flex-start">
            <Text>Set Testing Transactions DEVONLY</Text>
          </Box>
        </Flex>
      </Pressable>
    </>
  );
};

export default PreferencesSettings;
