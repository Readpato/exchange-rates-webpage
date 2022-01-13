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

function getApiCurrencies(API_URL) {
  return fetch(API_URL).then((apiResponse) => {
    if (!apiResponse.ok) {
      return "Something went wrong, please try again later.";
    }
    apiResponse
      .json()
      .then((apiResponseJSON) => {
        let currencies = Object.keys(apiResponseJSON.conversion_rates);
        currencies.forEach((coin) => {
          let $option = document.createElement("option");
          $option.textContent = coin;
          $option.value = coin;
          $baseCurrencySelector.appendChild($option);
        });
        currencies.forEach((coin) => {
          let $option = document.createElement("option");
          $option.textContent = coin;
          $option.value = coin;
          $expectedCurrencySelector.appendChild($option);
        });
      })
      .catch((error) => console.error(error));
  });
}

getApiCurrencies(API_URL);
