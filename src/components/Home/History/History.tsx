import React from "react";
import {
  SectionList,
  Heading,
  Center,
  Flex,
  Box,
  Text,
  Pressable,
} from "native-base";

// Contexts
import { HistoryContext, PreferencesContext } from "../../Contexts";

// Utils
import { makeDoubleDigit, makeCurrencyFormat, isEven } from "../../utils";

// Statics
import { LANGUAGES } from "../../statics";

const History: React.FC = () => {
  const { history } = React.useContext(HistoryContext);
  const { appLanguage } = React.useContext(PreferencesContext);
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
              <Box flex={1}>{` ${makeDoubleDigit(
                item.day.day
              )}/${makeDoubleDigit(item.day.month)}`}</Box>
              <Box flex={1}>{` ${makeDoubleDigit(
                item.hour.hour
              )}:${makeDoubleDigit(item.hour.minutes)}`}</Box>
              <Center flex={6}>
                <Text numberOfLines={1}>{item.name}</Text>
              </Center>
            </Flex>
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
    </>
  );
};

export default History;
