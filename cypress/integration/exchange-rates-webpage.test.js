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
        .should("have.value", "")
        .and("contain", "Select base currency");
      cy.get("#expected-currency-selector")
        .first("option")
        .should("have.value", "")
        .and("contain", "Select expected currency");
      cy.get(".convert-button")
        .should("have.css", "background-color", "rgb(237, 180, 90)")
        .and("contain", "Convert");
      cy.get(".convertion-result-bar")
        .should("have.css", "background-color", "rgb(237, 106, 90)")
        .and("contain", "Convertion will appear here");
    });
  });
  describe("Functionality", () => {
    it("Test if the form validators work correctly", () => {
      cy.get(".convert-button").click();
      cy.get(".existing-error").should("have.length", "3");
      cy.get(".existing-error")
        .eq(0)
        .should("contain", "Please, insert an amount.");
      cy.get(".existing-error")
        .eq(1)
        .should("contain", "Please, insert a base currency.");
      cy.get(".existing-error")
        .eq(2)
        .should("contain", "Please, insert an expected currency.");
    });
    it("Type in inputs and display a result", () => {
      cy.get("#amount-input").type("2").should("have.value", "2");
      cy.get("#base-currency-selector")
        .select("USD")
        .should("have.value", "USD");
      cy.get("#expected-currency-selector")
        .select("EUR")
        .should("have.value", "EUR");
      cy.get(".convert-button").click();
      cy.get(".convertion-result-bar").should("be.visible");
    });
  });
});
