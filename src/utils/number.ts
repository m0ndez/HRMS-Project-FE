const addComma = (value: number = 0) =>
  ` ${new Intl.NumberFormat("th-TH").format(value || 0)} `;

const castToMoney = (value: number = 0) => {
  const locals = "th-TH";
  const currency = "THB";
  const money = new Intl.NumberFormat(locals, {
    style: "currency",
    currency,
    currencyDisplay: 'code'
  }).format(value);
  return money
}

const decimalsFormatComma = (data: string) => {
  return Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Number(data))
}

const number = {
  addComma,
  castToMoney,
  decimalsFormatComma,
};
export default number;
