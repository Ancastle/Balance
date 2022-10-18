import { Text, Select, CheckIcon } from "native-base";
import format from "date-fns/format";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { title2Styles } from "../../../styles";

import { selectPreferencesLanguage, useAppSelector } from "../../../../store";

import { LANGUAGES } from "../../../statics";

interface MonthSelectProps {
  month: string;
  setMonth: (nextMonth: string) => void;
  title: string;
  currentDate: Date;
  lastThreeMonths: Date[];
}
const MonthSelect: React.FC<MonthSelectProps> = ({
  month,
  setMonth,
  title,
  currentDate,
  lastThreeMonths,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      <Text
        fontSize={title2Styles.fontSize}
        fontWeight={title2Styles.fontWeight}
        mt={-2}
      >
        {title}
      </Text>
      <Select
        dropdownIcon={<MaterialCommunityIcons name="chevron-down" size={20} />}
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
        {lastThreeMonths.map((month, i) => (
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
