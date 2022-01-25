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

// Contexts
import { PreferencesContext } from "../../Contexts/PreferencesContextProvider";

// Utils
import { isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

const PreferencesSettings: React.FC = () => {
  const { preferences } = React.useContext(PreferencesContext);
  const appLanguage = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const [showLanguageModal, setShowLanguageModal] = React.useState(false);

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.settings.tabs.preferences.label[appLanguage],
        data: [
          {
            name: LANGUAGES.settings.tabs.preferences.changeLanguage[
              appLanguage
            ],
            set: setShowLanguageModal,
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
                  item.set(true);
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
    </>
  );
};

export default PreferencesSettings;
