function testValidateAmount() {
  console.assert(
    validateAmount("") === "Please, insert an amount.",
    "The function validateAmount did not validate if the input was empty."
  );

  console.assert(
    validateAmount("123aB") === "The amount field only accepts numbers",
    "The function validateAmount did not validate if the input had invalid characters."
  );
}

function testValidateBaseCurrency() {
  console.assert(
    validateBaseCurrency("") === "Please, insert a base currency.",
    "The function validateBaseCurrency did not validate if the element was empty."
  );
}

function testValidateExpectedCurrency() {
  console.assert(
    validateExpectedCurrency("") === "Please, insert an expected currency.",
    "The function validateExpectedCurrency did not validate if the element was empty."
  );
}

function executeUnitaryTests() {
  testValidateAmount();
  testValidateBaseCurrency();
  testValidateExpectedCurrency();
}

executeUnitaryTests();
