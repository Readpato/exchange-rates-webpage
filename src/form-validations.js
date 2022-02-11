import { deleteOldErrors } from "./ui.js";
import { convertCurrency } from "./service.js";

const $form = document.form;

export function validateForm(event) {
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

export function handleErrors(errors) {
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

export function validateAmount(amountValue) {
  const regEx = /^[0-9]+$/;

  if (amountValue === "") return "Please, insert an amount.";
  if (!regEx.test(amountValue)) return "The amount field only accepts numbers";

  return "";
}

export function validateBaseCurrency(baseCurrencyValue) {
  if (baseCurrencyValue === "") return "Please, insert a base currency.";
  return "";
}

export function validateExpectedCurrency(expectedCurrencyValue) {
  if (expectedCurrencyValue === "")
    return "Please, insert an expected currency.";

  return "";
}
