export const capFirstLetter = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};

export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'usd',
  style: 'currency',
  minimumFractionDigits: 0,
});
