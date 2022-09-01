import { Text, Radio, Container } from "native-base";

import { subtitlesStyles, title2Styles } from "../../../styles";

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
      <Text
        mt={3}
        fontSize={title2Styles.fontSize}
        fontWeight={title2Styles.fontWeight}
      >
        {LANGUAGES.analysis.transactionType.title[appLanguage]}
      </Text>
      <Radio.Group
        mt={-3}
        name="transactionType"
        accessibilityLabel="transactionType"
        value={type}
        fontSize={subtitlesStyles.fontSize}
        fontWeight={subtitlesStyles.fontWeight}
        onChange={(nextValue) => {
          setType(nextValue);
        }}
      >
        <Container display="flex" flexDirection="row">
          <Radio value="expence" my={1}>
            <Text
              ml={2}
              fontSize={subtitlesStyles.fontSize}
              fontWeight={subtitlesStyles.fontWeight}
            >
              {LANGUAGES.analysis.transactionType.expences[appLanguage]}
            </Text>
          </Radio>
          <Radio value="entry" ml={2} my={1}>
            <Text
              ml={2}
              fontSize={subtitlesStyles.fontSize}
              fontWeight={subtitlesStyles.fontWeight}
            >
              {LANGUAGES.analysis.transactionType.entries[appLanguage]}
            </Text>
          </Radio>
        </Container>
      </Radio.Group>
    </>
  );
};

export default TransactionTypeFilter;
