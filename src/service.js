import { calculateConvertion } from "./logic.js";
import { updateResultStatus, addCurrencyLists } from "./ui.js";

export async function callAPI() {
  try {
    const API_URL =
      "https://v6.exchangerate-api.com/v6/cb6cded1588a31eb0fda44c4/latest/USD";
    const response = await fetch(API_URL);
    const json = await response.json();
    return addCurrencyLists(json);
  } catch {
    return console.error(error);
  }
}

export async function convertCurrency(baseCurrency, expectedCurrency, amount) {
  try {
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
  } catch {
    return console.error(error);
  }
}
