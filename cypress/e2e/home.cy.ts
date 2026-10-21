describe("Home Page E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads the home page and renders key elements", () => {
    // Check title & branding
    cy.get("header").should("be.visible");
    cy.contains("МайстерДім").should("be.visible");

    // Check Hero title
    cy.get("h1")
      .should("be.visible")
      .and("contain.text", "Сервіс перевірених майстрів біля вас");

    // Check catalog section
    cy.get("#katalog").should("be.visible");
    cy.contains("Популярні послуги").should("be.visible");
    cy.contains("Покіс газону та трави").should("be.visible");

    // Check how it works
    cy.get("#steps").should("be.visible");
    cy.contains("Як це працює").should("be.visible");

    // Check trust section
    cy.get("#trust").should("be.visible");
    cy.contains("15 000+").should("be.visible");
    cy.contains("Гарантія 30 днів").should("exist");

    // Take screenshot of fully rendered home page
    cy.screenshot("e2e-home-page-full");
  });

  it("redirects to booking page with phone and category on quick booking submit", () => {
    // Fill phone number in the quick booking widget
    cy.get('input[type="tel"]').first().type("501234567");

    // Click submit
    cy.get("#quick-submit-btn").click();

    // Verify redirected to booking page with query params
    cy.url().should("include", "/booking");
    cy.url().should("include", "phone=501234567");

    // Verify phone input is prefilled on the booking page
    cy.get('input[type="tel"]').should("have.value", "501234567");

    // Take screenshot of successful booking transfer
    cy.screenshot("e2e-booking-transfer-success");
  });
});
