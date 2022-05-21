import {
  camelCase,
  snakeCase,
  keys,
  split,
  head,
  last,
  get,
  map,
  slice,
  trim,
} from "lodash";

const isArray = (array: any) => Array.isArray(array);

const isObject = (object: any) =>
  object === Object(object) && !isArray(object) && typeof object !== "function";

const camelcaseTransform = (data: any): { [name: string]: any } | [] => {
  if (isObject(data)) {
    const objectData = data as { [name: string]: any };
    const newObject: { [name: string]: any } = {};
    keys(objectData).forEach((key) => {
      newObject[camelCase(key)] = camelcaseTransform(objectData[key]);
    });
    return newObject;
  } else if (isArray(data)) {
    const arrayData = data as [];
    const newArray = arrayData.map((i) => camelcaseTransform(i));
    return newArray;
  }
  return data;
};

const snakecaseTransform = (data: any): { [name: string]: any } | [] => {
  if (isObject(data)) {
    const objectData = data as { [name: string]: any };
    const newObject: { [name: string]: any } = {};
    keys(objectData).forEach((key) => {
      newObject[snakeCase(key)] = snakecaseTransform(objectData[key]);
    });
    return newObject;
  } else if (isArray(data)) {
    const arrayData = data as [];
    const newArray = arrayData.map((i) => snakecaseTransform(i));
    return newArray;
  }
  return data;
};


const hiddenString = (text: string): string => {
  const splitedString = split(text, "");
  const firstString = head(splitedString);
  const lastString = last(splitedString);
  return `${firstString}****${lastString}`;
};

const urlSearchParams = <T = any>(data: T): string => {
  const dataKeys = keys(data) || [];
  const params = new URLSearchParams();
  map(dataKeys, (key) => {
    const queryValue = get(data, key, "");
    if (queryValue) {
      params.append(key, queryValue);
    }
  });

  if (params.toString()) {
    return `?${params.toString()}`;
  }
  return "";
};

const queryToObject = (query: string): any => {
  const urlParams = new URLSearchParams(query);
  // const entity = Object.fromEntries(urlParams)
  return urlParams;
};

const typeFormat = (data: string, spacing?: boolean) => {
  const money = Intl.NumberFormat("th-TH", {
    // style: 'currency',
    currency: "THB",
  }).format(Number(data));
  if (spacing) {
    return money.replace(/^(\D+)/, "$1 ");
  }
  return money;
};

const fPhoneNumber = (region: string, phoneNumber: string): string => {
  const rawPhonenumber = phoneNumber.replace(/^0+(?!$)/g, "");
  const firstNumber = slice(rawPhonenumber, 0, 2).join("");
  const middleNumber = slice(rawPhonenumber, 2, 5).join("");
  const lastNumber = slice(rawPhonenumber, 5, 9).join("");
  const result = trim(
    `+${region} (${firstNumber}) ${middleNumber} ${lastNumber}`
  );
  return result;
};

const random = (length: number) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

const transformer = {
  camelcaseTransform,
  snakecaseTransform,
  urlSearchParams,
  hiddenString,
  queryToObject,
  typeFormat,
  fPhoneNumber,
  random,
};
export default transformer;
