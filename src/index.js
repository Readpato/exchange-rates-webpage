import { callAPI } from "./service.js";
import { validateForm } from "./form-validations.js";

const $form = document.form;
$form.onsubmit = validateForm;

function initialize() {
  return callAPI();
}

initialize();
