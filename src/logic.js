export function calculateConvertion(
  conversionRates,
  baseCurrency,
  expectedCurrency,
  amount
) {
  let baseCurrencyValue = conversionRates[baseCurrency];
  let expectedCurrencyValue = conversionRates[expectedCurrency];
  let result = Number(amount) * baseCurrencyValue * expectedCurrencyValue;
  return result;
}
