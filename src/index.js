const API_URL =
  "https://v6.exchangerate-api.com/v6/cb6cded1588a31eb0fda44c4/latest/USD";
const SHORT_API_URL =
  "https://v6.exchangerate-api.com/v6/cb6cded1588a31eb0fda44c4/latest/";
const $baseCurrencySelector = document.querySelector("#base-currency-selector");
const $expectedCurrencySelector = document.querySelector(
  "#expected-currency-selector"
);
const $convertButton = document.querySelector(".convert-button");
const $dateInput = document.querySelector("#date-input");
const $amountInput = document.querySelector("#amount-input");
const $convertionResultBar = document.querySelector(".convertion-result-bar");

function getApiCurrencies(API_URL) {
  return fetch(API_URL)
    .then((apiResponse) => {
      if (!apiResponse.ok) {
        return "Something went wrong, please try again later.";
      }
      return apiResponse.json();
    })
    .then((apiResponseJSON) => {
      let currencies = Object.keys(apiResponseJSON.conversion_rates);
      return currencies.forEach((coin) => {
        let $optionBaseCurrency = document.createElement("option");
        let $optionExpectedCurrency = document.createElement("option");
        $optionBaseCurrency.textContent = coin;
        $optionBaseCurrency.value = coin;
        $optionExpectedCurrency.textContent = coin;
        $optionExpectedCurrency.value = coin;
        $baseCurrencySelector.appendChild($optionBaseCurrency);
        $expectedCurrencySelector.appendChild($optionExpectedCurrency);
      });
    })
    .catch((error) => console.error(error));
}

function convertCurrency(baseCurrency, expectedCurrency, amount) {
  return fetch(API_URL.replace("USD", `${baseCurrency}`)).then(
    (apiResponse) => {
      if (!apiResponse.ok) {
        return "Something went wrong, please try again later";
      }
      apiResponse
        .json()
        .then((apiResponseJSON) => {
          let conversionRates = apiResponseJSON.conversion_rates;
          return calculateConvertion(
            conversionRates,
            baseCurrency,
            expectedCurrency,
            amount
          );
        })
        .then((convertionResult) => {
          return updateResultStatus(
            baseCurrency,
            expectedCurrency,
            convertionResult,
            amount
          );
        });
    }
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

function updateResultStatus(
  baseCurrency,
  expectedCurrency,
  convertionResult,
  amount
) {
  return ($convertionResultBar.textContent = `${amount} ${baseCurrency} is equal to ${convertionResult.toString()} ${expectedCurrency}`);
}

$convertButton.onclick = () => {
  let baseCurrency = $baseCurrencySelector.value;
  let expectedCurrency = $expectedCurrencySelector.value;
  let amount = $amountInput.value;

  convertCurrency(baseCurrency, expectedCurrency, amount);
};

getApiCurrencies(API_URL);
