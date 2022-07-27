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
import { PreferencesContext } from "../../Contexts";

// Utils
import { isEven } from "../../utils";
import { LANGUAGES, DEVONLYTestingRecords } from "../../statics";

const PreferencesSettings: React.FC = () => {
  const { appLanguage } = React.useContext(PreferencesContext);

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
    </>
  );
};

export default PreferencesSettings;
