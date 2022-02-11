import { addCurrencyLists } from "./ui.js";
import { validateForm } from "./form-validations.js";

const $form = document.form;
$form.onsubmit = validateForm;

async function initialize() {
  const API_URL =
    "https://v6.exchangerate-api.com/v6/cb6cded1588a31eb0fda44c4/latest/USD";
  const response = await fetch(API_URL);
  const json = await response.json();
  return addCurrencyLists(json);
}
initialize();
