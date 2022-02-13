export function addCurrencyLists(json) {
  const $baseCurrencySelector = document.querySelector(
    "#base-currency-selector"
  );
  const $expectedCurrencySelector = document.querySelector(
    "#expected-currency-selector"
  );
  let currencies = Object.keys(json.conversion_rates);
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
}

export function deletePreviousErrors() {
  const $existingErrors = document.querySelectorAll(".existing-error");
  return $existingErrors.forEach((error) => {
    error.remove();
  });
}

export function updateResultStatus(
  baseCurrency,
  expectedCurrency,
  convertionResult,
  amount
) {
  const $convertionResultBar = document.querySelector(".convertion-result-bar");
  return ($convertionResultBar.textContent = `${amount} ${baseCurrency} is/are equal to ${convertionResult.toString()} ${expectedCurrency}`);
}
