import { ESCAPED_TIMEZONE } from "constants/regex";
import { format, formatISO9075 } from "date-fns";
import { th } from "date-fns/locale";
import { get, isEmpty } from "lodash";

const formatDate = (data: string) => {
  return format(new Date(data), "d MMM yyyy", { locale: th });
};

const formatDateToApi = (
  mode: "complete" | "date" | "time" | undefined,
  data: string | number | Date
) => {
  const createData = formatISO9075(new Date(data), {
    representation: mode,
  });
  return createData;
};

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
  formatDate,
  formatDateToApi,
};

export default dateUtils;
