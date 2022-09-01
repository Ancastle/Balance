import { Text, Radio, Container } from "native-base";

import { subtitlesStyles, title2Styles } from "../../../styles";

import { selectPreferencesLanguage, useAppSelector } from "../../../../store";

import { LANGUAGES } from "../../../statics";

interface AnalysisTypeFilterProps {
  analysisType: string;
  setAnalysisType: (nextType: string) => void;
}
const AnalysisTypeFilter: React.FC<AnalysisTypeFilterProps> = ({
  analysisType,
  setAnalysisType,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  return (
    <>
      <Text
        fontSize={title2Styles.fontSize}
        fontWeight={title2Styles.fontWeight}
        mt={-2}
      >
        {LANGUAGES.analysis.analysisType.title[appLanguage]}
      </Text>
      <Radio.Group
        mt={-3}
        name="analysisType"
        accessibilityLabel="analysisType"
        value={analysisType}
        onChange={(nextValue) => {
          setAnalysisType(nextValue);
        }}
      >
        <Container display="flex" flexDirection="row">
          <Radio value="monthly" my={1}>
            <Text
              ml={2}
              fontSize={subtitlesStyles.fontSize}
              fontWeight={subtitlesStyles.fontWeight}
            >
              {LANGUAGES.analysis.analysisType.monthly[appLanguage]}
            </Text>
          </Radio>
          <Radio value="fromTo" ml={2} my={1}>
            <Text
              ml={2}
              fontSize={subtitlesStyles.fontSize}
              fontWeight={subtitlesStyles.fontWeight}
            >
              {LANGUAGES.analysis.analysisType.fromTo[appLanguage]}
            </Text>
          </Radio>
          <Radio value="compare" ml={2} my={1}>
            <Text
              ml={2}
              fontSize={subtitlesStyles.fontSize}
              fontWeight={subtitlesStyles.fontWeight}
            >
              {LANGUAGES.analysis.analysisType.compare[appLanguage]}
            </Text>
          </Radio>
        </Container>
      </Radio.Group>
    </>
  );
};

export default AnalysisTypeFilter;
