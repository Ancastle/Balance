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
import ManageCategoriesModal from "./ManageCategoriesModal";

// Types
import { TransactionType } from "../../types";

// Utils
import { isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

const CategoriesSettings: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [type, setType] = React.useState<TransactionType>();
  const [mode, setMode] = React.useState("");
  const [showEditModal, setShowEditModal] = React.useState(false);

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.settings.tabs.categories.label[appLanguage],
        data: [
          {
            name: LANGUAGES.settings.tabs.categories.addExpences[appLanguage],
            type: "expence",
            mode: "add",
          },
          {
            name: LANGUAGES.settings.tabs.categories.addEntries[appLanguage],
            type: "entry",
            mode: "add",
          },
          {
            name: LANGUAGES.settings.tabs.categories.editExpences[appLanguage],
            type: "expence",
            mode: "edit",
          },
          {
            name: LANGUAGES.settings.tabs.categories.editEntries[appLanguage],
            type: "entry",
            mode: "edit",
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
                  setType(item.type);
                  setMode(item.mode);
                  setShowEditModal(true);
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
      {!!type && !!mode && (
        <ManageCategoriesModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          type={type}
          mode={mode}
        />
      )}
    </>
  );
};

export default CategoriesSettings;
