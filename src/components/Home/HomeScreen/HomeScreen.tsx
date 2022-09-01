import * as React from "react";
import {
  Container,
  Heading,
  Text,
  View,
  Pressable,
  useToast,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { titleStyles } from "../../styles";

import LastMonthSummary from "./LastMonthSummary";
import CurrentMonthSummary from "./CurrentMonthSummary";
import LastDaysSummary from "./LastDaysSummary";
import LastAction from "./LastAction";

// Store
import {
  useAppSelector,
  useAppDispatch,
  selectPreferencesLanguage,
} from "../../../store";

import { DEVONLYRESETTRANSACTIONS } from "../../../store/transactionsSlice";

import { LANGUAGES } from "../../statics";

const HomeScreen: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const dispatch = useAppDispatch();

  const toast = useToast();

  return (
    <Container flex={1} ml="2">
      <View flex={1}>{/*TBD INSERT LOGO */}</View>

      <Container flex={1.8} my={15} w="380">
        <Container flexDirection={"row"}>
          <Heading
            fontSize={titleStyles.fontSize}
            fontWeight={titleStyles.fontWeight}
          >{`${LANGUAGES.welcome[appLanguage]}!`}</Heading>
          <Icon
            ml={3}
            onPress={() =>
              toast.show({
                description: LANGUAGES.helpers.homeScreen[appLanguage],
                placement: "top",
                duration: 5000,
              })
            }
            as={<MaterialIcons name="help" />}
            size={5}
            mt={0.5}
            color="primary.500"
          />
        </Container>

        <LastAction />
        <LastDaysSummary />
        <CurrentMonthSummary />
        <LastMonthSummary />

        {/* DEVONLY*/}
        <Pressable
          fontWeight="medium"
          onPress={() => {
            dispatch(DEVONLYRESETTRANSACTIONS());
          }}
        >
          <Text> RESET ALL REGISTERS</Text>
        </Pressable>
      </Container>
    </Container>
  );
};
export default HomeScreen;
