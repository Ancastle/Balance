import { Text, Radio, Container } from "native-base";

import { selectPreferencesLanguage, useAppSelector } from "../../../../store";

import { LANGUAGES } from "../../../statics";

interface SortingTypeFilterProps {
  sortingType: string;
  setSortingType: (nextType: string) => void;
  isDisabled: boolean;
}
const SortingTypeFilter: React.FC<SortingTypeFilterProps> = ({
  sortingType,
  setSortingType,
  isDisabled,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      <Text mt={-2} fontSize={18}>
        {LANGUAGES.analysis.sortingType.title[appLanguage]}
      </Text>
      <Radio.Group
        mt={-3}
        name="transactionsSorting"
        accessibilityLabel="transactionsSorting"
        value={sortingType}
        onChange={(nextValue) => {
          setSortingType(nextValue);
        }}
      >
        <Container display="flex" flexDirection="row">
          <Radio value="necessary" my={1} isDisabled={isDisabled}>
            {LANGUAGES.analysis.sortingType.necessary[appLanguage]}
          </Radio>
          <Radio value="byCategory" ml={2} my={1}>
            {LANGUAGES.analysis.sortingType.byCategory[appLanguage]}
          </Radio>
        </Container>
      </Radio.Group>
    </>
  );
};

export default SortingTypeFilter;
