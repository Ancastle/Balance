import * as React from "react";
import { Heading } from "native-base";
import { parseISO } from "date-fns";

// Store
import {
  useAppSelector,
  selectHistoryData,
  selectPreferencesLanguage,
} from "../../../store";

import { getDateDayMonth, getDateHourMinutes } from "../../utils";

import { LANGUAGES } from "../../statics";

const LastAction: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const history = useAppSelector(selectHistoryData);

  const lastAction = React.useMemo(() => history[0], []);

  const lastActionDate = React.useMemo(
    () => lastAction && parseISO(lastAction.date),
    [lastAction]
  );

  return (
    <>
      <Heading fontSize={20}>{LANGUAGES.lastAction[appLanguage]}</Heading>
      <Heading fontSize={15}>
        {lastAction
          ? `${lastAction.name} ${
              LANGUAGES.timeOn[appLanguage]
            } ${getDateDayMonth(lastActionDate)} ${
              LANGUAGES.timeAt[appLanguage]
            } ${getDateHourMinutes(lastActionDate)}`
          : LANGUAGES.noLastAction[appLanguage]}
      </Heading>
    </>
  );
};
export default LastAction;