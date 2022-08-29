import { Text, Radio, Container } from "native-base";

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
      <Text fontSize={18} mt={-2}>
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
            {LANGUAGES.analysis.analysisType.monthly[appLanguage]}
          </Radio>
          <Radio value="fromTo" ml={2} my={1}>
            {LANGUAGES.analysis.analysisType.fromTo[appLanguage]}
          </Radio>
          <Radio value="compare" ml={2} my={1}>
            {LANGUAGES.analysis.analysisType.compare[appLanguage]}
          </Radio>
        </Container>
      </Radio.Group>
    </>
  );
};

export default AnalysisTypeFilter;
