import * as React from "react";
import { Container, Heading, useToast, Image, Center } from "native-base";

import { titleStyles } from "../../styles";

import LastMonthSummary from "./LastMonthSummary";
import CurrentMonthSummary from "./CurrentMonthSummary";
import LastDaysSummary from "./LastDaysSummary";
import LastAction from "./LastAction";

// Store
import { useAppSelector, selectPreferencesLanguage } from "../../../store";

import { LANGUAGES } from "../../statics";
import HelperToastIcon from "../../Shared/HelperToastIcon";

const HomeScreen: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const toast = useToast();

  return (
    <Container flex={1} ml="2">
      <Center>
        <Image
          source={require("../../../../assets/Logo2-02-03.png")}
          alt="logoImage"
          size="200"
          left="25%"
        />
      </Center>
      <Container flex={1.8} my={15} w="380">
        <Container flexDirection={"row"}>
          <Heading
            w={250}
            fontSize={titleStyles.fontSize}
            fontWeight={titleStyles.fontWeight}
          >{`${LANGUAGES.welcome[appLanguage]}!`}</Heading>
          <HelperToastIcon
            onPress={() => {
              if (!toast.isActive("homeScreenHelper")) {
                toast.show({
                  id: "homeScreenHelper",
                  description: LANGUAGES.helpers.homeScreen[appLanguage],
                  placement: "top",
                  duration: 5000,
                });
              }
            }}
          />
        </Container>

        <LastAction />
        <LastDaysSummary />
        <CurrentMonthSummary />
        <LastMonthSummary />
      </Container>
    </Container>
  );
};
export default HomeScreen;
