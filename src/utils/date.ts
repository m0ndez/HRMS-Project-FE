import { ESCAPED_TIMEZONE } from "constants/regex";
import { format } from "date-fns";
import { get, isEmpty } from "lodash";

const calibratingTime = (
  timeasString?: string,
  local: boolean = false
): Date => {
  if (isEmpty(timeasString)) {
    const checkedTimeAsString = new Date();
    if (local) {
      const checkedLocal = checkedTimeAsString;

      return checkedLocal;
    }

    if (!local) {
      const localTimezoneArray = format(
        checkedTimeAsString,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      ).match(ESCAPED_TIMEZONE);
      const escapedTimezoneArray = checkedTimeAsString
        .toISOString()
        .match(ESCAPED_TIMEZONE);
      const servertime = get(escapedTimezoneArray, "0", "");
      const localTimezone = get(localTimezoneArray, "1", "");
      const calibratedTimeString = `${servertime}${localTimezone}`;
      const checkedLocal = new Date(calibratedTimeString);

      return checkedLocal;
    }
  }

  if (!isEmpty(timeasString)) {
    const checkedTimeAsString = new Date(timeasString!);
    if (local) {
      const checkedLocal = checkedTimeAsString;

      return checkedLocal;
    }

    if (!local) {
      const localTimezoneArray = format(
        checkedTimeAsString,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      ).match(ESCAPED_TIMEZONE);
      const escapedTimezoneArray = checkedTimeAsString
        .toISOString()
        .match(ESCAPED_TIMEZONE);
      const servertime = get(escapedTimezoneArray, "0", "");
      const localTimezone = get(localTimezoneArray, "1", "");
      const calibratedTimeString = `${servertime}${localTimezone}`;
      const checkedLocal = new Date(calibratedTimeString);

      return checkedLocal;
    }
  }

  return new Date();
};

const dateUtils = {
  calibratingTime,
};

export default dateUtils;
