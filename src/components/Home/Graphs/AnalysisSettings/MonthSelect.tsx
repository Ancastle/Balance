import { Text, Select, CheckIcon } from "native-base";
import format from "date-fns/format";

import { selectPreferencesLanguage, useAppSelector } from "../../../../store";

import { LANGUAGES } from "../../../statics";

interface MonthSelectProps {
  month: string;
  setMonth: (nextMonth: string) => void;
  title: string;
  currentDate: Date;
  lastSixMonths: Date[];
}
const MonthSelect: React.FC<MonthSelectProps> = ({
  month,
  setMonth,
  title,
  currentDate,
  lastSixMonths,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      <Text mt={-2} fontSize={18}>
        {title}
      </Text>
      <Select
        top={-2}
        selectedValue={month}
        minWidth="380"
        placeholder={title}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        onValueChange={(itemValue) => setMonth(itemValue)}
      >
        <Select.Item
          key={"current"}
          label={format(currentDate, "MM/yyyy")}
          value={"currentMonth"}
        />
        {lastSixMonths.map((month, i) => (
          <Select.Item
            key={i}
            label={format(month, "MM/yyyy")}
            value={i.toString()}
          />
        ))}
      </Select>
    </>
  );
};

export default MonthSelect;
