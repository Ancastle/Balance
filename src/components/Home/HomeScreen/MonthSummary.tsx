import * as React from "react";
import { Heading, Text } from "native-base";

// Store
import { useAppSelector, selectPreferencesLanguage } from "../../../store";

import { makeCurrencyFormat } from "../../utils";

import { LANGUAGES } from "../../statics";

interface MonthSummaryProps {
  title: React.ReactNode;
  expences: number;
  entries: number;
  balance: number;
}

const MonthSummary: React.FC<MonthSummaryProps> = ({
  title,
  expences,
  entries,
  balance,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      {title}
      <Text fontWeight="medium" color={"green.500"}>{`${
        LANGUAGES.entries[appLanguage]
      }: ${makeCurrencyFormat(entries)}`}</Text>
      <Text fontWeight="medium" color={"red.500"}>{`${
        LANGUAGES.expences[appLanguage]
      }: ${makeCurrencyFormat(expences)}`}</Text>
      <Text
        fontWeight="medium"
        color={"green.500"}
      >{`Balance: ${makeCurrencyFormat(balance)}`}</Text>
    </>
  );
};
export default MonthSummary;
