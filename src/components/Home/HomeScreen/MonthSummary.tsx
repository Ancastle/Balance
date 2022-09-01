import * as React from "react";
import { Text, Icon, Container } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { subtitlesStyles } from "../../styles";

// Store
import { useAppSelector, selectPreferencesLanguage } from "../../../store";

import { makeCurrencyFormat } from "../../utils";

import { LANGUAGES } from "../../statics";

interface MonthSummaryProps {
  title: React.ReactNode;
  expences: number;
  entries: number;
  balance: number;
  neededExpences: number;
}

const MonthSummary: React.FC<MonthSummaryProps> = ({
  title,
  expences,
  entries,
  balance,
  neededExpences,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      {title}
      <Text fontWeight="medium" color={"green.500"}>{`${
        LANGUAGES.entries[appLanguage]
      }: ${makeCurrencyFormat(entries)}`}</Text>
      <Container display="flex" flexDirection="row">
        <Text fontWeight="medium" color="red.500">
          {`${LANGUAGES.expences[appLanguage]}: ${makeCurrencyFormat(
            expences
          )}  (`}
        </Text>
        <Icon
          as={<MaterialIcons name="check" />}
          size={3}
          mt={1.5}
          color="red.500"
        />
        <Text fontWeight="medium" color="red.500">
          {`${makeCurrencyFormat(neededExpences)} `}
        </Text>
        <Icon
          as={<MaterialIcons name="clear" />}
          size={3}
          mt={1.5}
          color="red.500"
        />
        <Text fontWeight="medium" color={"red.500"}>
          {`${makeCurrencyFormat(expences - neededExpences)})`}
        </Text>
      </Container>
      <Text
        fontWeight="medium"
        color={balance > 0 ? "green.500" : "red.500"}
      >{`Balance: ${makeCurrencyFormat(balance)}`}</Text>
    </>
  );
};
export default MonthSummary;
