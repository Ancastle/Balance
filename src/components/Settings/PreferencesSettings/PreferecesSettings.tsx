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

// Utils
import { isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

//DEVONLY
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE } from "../../statics";

const PreferencesSettings: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [showLanguageModal, setShowLanguageModal] = React.useState(false);

  //DEVONLY
  const resetCategories = async () => {
    const jsonValue = JSON.stringify({ categories: [] });
    await AsyncStorage.setItem(STORAGE.categories, jsonValue);
  };

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
        ],
      },
    ],
    []
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
      <ChangeLanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
      <Pressable
        py={1.5}
        onPress={() => {
          resetCategories();
        }}
      >
        <Flex direction="row" py={1.5}>
          <Box ml={7} flex={1} justifyContent="flex-start">
            <Text>Reset categories DEVONLY</Text>
          </Box>
        </Flex>
      </Pressable>
    </>
  );
};

export default PreferencesSettings;
