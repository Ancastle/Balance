import React from "react";
import { SectionList, Heading, Center, Flex, Box, Text } from "native-base";
import parseISO from "date-fns/parseISO";

import { titleStyles } from "../../styles";

// Utils
import { makeDoubleDigit, isEven } from "../../utils";

// Statics
import { LANGUAGES } from "../../statics";

// Store
import {
  selectPreferencesLanguage,
  selectHistoryData,
  selectPreferencesDateFormat,
  useAppSelector,
} from "../../../store";
import { format } from "date-fns";

const History: React.FC = () => {
  const history = useAppSelector(selectHistoryData);
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const dateFormat = useAppSelector(selectPreferencesDateFormat);

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.history[appLanguage],
        data: history,
      },
    ],
    [history]
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
            <Flex direction="row" py={1.5}>
              <Box flex={1}>{` ${format(
                parseISO(item.date),
                dateFormat
              )}`}</Box>
              <Box flex={1}>{` ${format(parseISO(item.date), "HH:mm")}`}</Box>
              <Center flex={6}>
                <Text numberOfLines={1}>{item.name}</Text>
              </Center>
            </Flex>
          </Box>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Center>
            <Heading
              fontSize={titleStyles.fontSize}
              fontWeight={titleStyles.fontWeight}
              mt="3"
              pb="4"
            >
              {title}
            </Heading>
          </Center>
        )}
      />
    </>
  );
};

export default History;
