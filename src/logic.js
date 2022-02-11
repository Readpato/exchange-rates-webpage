import { updateResultStatus } from "./ui.js";

export async function convertCurrency(baseCurrency, expectedCurrency, amount) {
  const API_URL =
    "https://v6.exchangerate-api.com/v6/cb6cded1588a31eb0fda44c4/latest/USD";
  const response = await fetch(API_URL.replace("USD", `${baseCurrency}`));
  const json = await response.json();
  const { conversion_rates: rates } = json;
  const convertionResult = calculateConvertion(
    rates,
    baseCurrency,
    expectedCurrency,
    amount
  );
  return updateResultStatus(
    baseCurrency,
    expectedCurrency,
    convertionResult,
    amount
  );
}

function calculateConvertion(
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
