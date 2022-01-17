const API_URL =
  "https://v6.exchangerate-api.com/v6/cb6cded1588a31eb0fda44c4/latest/USD";
const $baseCurrencySelector = document.querySelector("#base-currency-selector");
const $expectedCurrencySelector = document.querySelector(
  "#expected-currency-selector"
);
const $convertButton = document.querySelector(".convert-button");
const $dateInput = document.querySelector("#date-input");
const $amountInput = document.querySelector("#amount-input");
const $convertionResultBar = document.querySelector(".convertion-result-bar");
const $form = document.form;

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

$form.onsubmit = validateForm;

function validateForm(event) {
  event.preventDefault();
  const amountValue = $form["amount-input-value"].value;
  const baseCurrencyvalue = $form["base-currency-value"].value;
  const expectedCurrencyValue = $form["expected-currency-value"].value;

  const errors = {
    "amount-input-value": validateAmount(amountValue),
    "base-currency-value": validateBaseCurrency(baseCurrencyvalue),
    "expected-currency-value": validateExpectedCurrency(expectedCurrencyValue),
  };

  deleteOldErrors();

  const success = handleErrors(errors) === 0;

  if (success) {
    convertCurrency(baseCurrencyvalue, expectedCurrencyValue, amountValue);
  }
}

function handleErrors(errors) {
  const error = errors;
  const keys = Object.keys(errors);
  let errorQuantity = 0;

  keys.forEach(function (key) {
    if (error[key]) {
      $form[key].classList.add("error");
      $form[key].value = "";

      const $errorList = document.querySelector(".existing-errors");
      const $error = document.createElement("li");
      $error.textContent = error[key];
      $error.classList.add("existing-error");
      $errorList.appendChild($error);
      errorQuantity++;
    } else {
      $form[key].classList.remove("error");
    }
  });
  return errorQuantity;
}

function deleteOldErrors() {
  const $existingErrors = document.querySelectorAll(".existing-error");
  $existingErrors.forEach((error) => {
    error.remove();
  });
}

function validateAmount(amountValue) {
  const regEx = /^[0-9]+$/;

  if (amountValue === "") return "Please, insert an amount.";
  if (!regEx.test(amountValue)) return "The amount field only accepts numbers";

  return "";
}

function validateBaseCurrency(baseCurrencyValue) {
  if (baseCurrencyValue === "") return "Please, insert a base currency.";
  return "";
}

function validateExpectedCurrency(expectedCurrencyValue) {
  if (expectedCurrencyValue === "")
    return "Please, insert an expected currency.";

  return "";
}

function convertCurrency(baseCurrency, expectedCurrency, amount) {
  return fetch(API_URL.replace("USD", `${baseCurrency}`))
    .then((apiResponse) => {
      if (!apiResponse.ok) {
        return "Something went wrong, please try again later";
      }
      return apiResponse.json();
    })
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

getApiCurrencies(API_URL);
