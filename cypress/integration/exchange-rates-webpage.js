/// <reference types="cypress" />

const URL = "http://127.0.0.1:8080";

context("Exchange Rates Webpage", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Layout", () => {
    it("Make sure the layout has been correctly loaded", () => {
      cy.get(".navigation-bar").should(
        "have.css",
        "background-color",
        "rgb(34, 116, 165)"
      );
      cy.get(".amount-label").should("have.text", "Amount");
      cy.get("#amount-input").should(
        "have.attr",
        "placeholder",
        "Insert desired amount"
      );
      cy.get(".base-currency-label").should("have.text", "From");
      cy.get("#base-currency-selector")
        .first("option")
        .should("have.value", "Select base currency");
      cy.get("#expected-currency-selector")
        .first("option")
        .should("have.value", "Select expected currency");
      cy.get(".convert-button")
        .should("have.css", "background-color", "rgb(237, 180, 90)")
        .and("contain", "Convert");
      cy.get(".convertion-result-bar")
        .should("have.css", "background-color", "rgb(237, 106, 90)")
        .and("contain", "Convertion will appear here");
    });
  });
});
