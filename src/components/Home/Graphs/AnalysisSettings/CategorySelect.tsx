import { Text, Select, CheckIcon } from "native-base";

import { CategoryType } from "../../../types";

import { selectPreferencesLanguage, useAppSelector } from "../../../../store";

import { LANGUAGES } from "../../../statics";

interface CategorySelectProps {
  categories: CategoryType[];
  selectedCategory: string;
  setSelectedCategory: (nextCategory: string) => void;
  type: string;
}
const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  type,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      <Text mt={-2} fontSize={18}>
        {LANGUAGES.analysis.categorySelect.title[appLanguage]}
      </Text>
      <Select
        top={-2}
        selectedValue={selectedCategory}
        minWidth="380"
        placeholder={LANGUAGES.analysis.categorySelect.title[appLanguage]}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Select.Item
          key={"initial"}
          label={LANGUAGES.analysis.categorySelect.allCategories[appLanguage]}
          value={"allCategories"}
        />
        {categories
          .filter((cat) => cat.type === type)
          .map((cate, i) => (
            <Select.Item
              key={cate.id.toString()}
              label={cate.name}
              value={cate.id.toString()}
            />
          ))}
      </Select>
    </>
  );
};

export default CategorySelect;
