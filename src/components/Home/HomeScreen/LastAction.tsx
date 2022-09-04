import * as React from "react";
import { Heading } from "native-base";
import { parseISO, format } from "date-fns";

import { subtitlesStyles, title2Styles } from "../../styles";

// Store
import {
  useAppSelector,
  selectHistoryData,
  selectPreferencesDateFormat,
  selectPreferencesLanguage,
} from "../../../store";

import { getDateDayMonth, getDateHourMinutes } from "../../utils";

import { LANGUAGES } from "../../statics";

const LastAction: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const history = useAppSelector(selectHistoryData);
  const dateFormat = useAppSelector(selectPreferencesDateFormat);

  const lastAction = React.useMemo(() => history[0], [history]);

  return (
    <>
      <Heading
        fontWeight={title2Styles.fontWeight}
        fontSize={title2Styles.fontSize}
      >
        {LANGUAGES.lastAction[appLanguage]}
      </Heading>
      <Heading
        fontWeight={subtitlesStyles.fontWeight}
        fontSize={subtitlesStyles.fontSize}
        w="380"
      >
        {lastAction
          ? `${lastAction.name} ${LANGUAGES.timeOn[appLanguage]} ${format(
              parseISO(lastAction.date),
              dateFormat
            )} ${LANGUAGES.timeAt[appLanguage]} ${format(
              parseISO(lastAction.date),
              "HH:mm"
            )}`
          : LANGUAGES.noLastAction[appLanguage]}
      </Heading>
    </>
  );
};
export default LastAction;
