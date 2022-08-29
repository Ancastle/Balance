import { Text, Radio, Container } from "native-base";

import { selectPreferencesLanguage, useAppSelector } from "../../../../store";

import { LANGUAGES } from "../../../statics";

interface TransactionTypeFilterProps {
  type: string;
  setType: (nextType: string) => void;
}
const TransactionTypeFilter: React.FC<TransactionTypeFilterProps> = ({
  type,
  setType,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      <Text fontSize={18}>
        {LANGUAGES.analysis.transactionType.title[appLanguage]}
      </Text>
      <Radio.Group
        mt={-3}
        name="transactionType"
        accessibilityLabel="transactionType"
        value={type}
        onChange={(nextValue) => {
          setType(nextValue);
        }}
      >
        <Container display="flex" flexDirection="row">
          <Radio value="expence" my={1}>
            {LANGUAGES.analysis.transactionType.expences[appLanguage]}
          </Radio>
          <Radio value="entry" ml={2} my={1}>
            {LANGUAGES.analysis.transactionType.entries[appLanguage]}
          </Radio>
        </Container>
      </Radio.Group>
    </>
  );
};

export default TransactionTypeFilter;
