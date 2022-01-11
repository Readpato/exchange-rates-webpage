const API_URL =
  "https://v6.exchangerate-api.com/v6/c6a9657d8a844bf93a1278e3/latest/USD";
const $baseCurrencySelector = document.querySelector("#base-currency-selector");
const $expectedCurrencySelector = document.querySelector(
  "#expected-currency-selector"
);
let API_RESPONSE;

function getApiData() {
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        return "Something went wrong, please try again later.";
      }
      return response.json();
    })
    .then((response) => {
      API_RESPONSE = response;
    })
    .catch((error) => {
      console.error(error);
    });
}

function addCurrencyValues(response) {
  let currency = Object.keys(response.conversion_rates);
  currency.forEach((coin) => {
    let $option = document.createElement("option");
    $option.textContent = coin;
    $option.value = coin;
    $baseCurrencySelector.appendChild($option);
  });
  currency.forEach((coin) => {
    let $option = document.createElement("option");
    $option.textContent = coin;
    $option.value = coin;
    $expectedCurrencySelector.appendChild($option);
  });
}

getApiData().then(() => addCurrencyValues(API_RESPONSE));
