describe("React Router Navigation E2E (Lab 5)", () => {
  it("navigates across all main pages via Header NavLinks with active states", () => {
    cy.visit("/");
    cy.get("header").contains("Головна").should("be.visible");

    // Click "Послуги"
    cy.get("header").contains("Послуги").click();
    cy.url().should("include", "/services");
    cy.get("h1").should("contain.text", "Каталог послуг майстрів");

    // Click "Виклик майстра"
    cy.get("header").contains("Виклик майстра").click();
    cy.url().should("include", "/booking");
    cy.get("h1").should("contain.text", "Оформлення виклику майстра");

    // Click "Вхід / Реєстрація"
    cy.get("header").contains("Вхід / Реєстрація").click();
    cy.url().should("include", "/auth");
    cy.get("h1").should("contain.text", "Авторизація в системі");

    // Click logo to return Home
    cy.get("header").contains("МайстерДім").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("navigates to dynamic route /booking/:serviceId from catalog card", () => {
    cy.visit("/services");

    // Find lawn mowing card and click Order
    cy.contains("Покіс газону та трави")
      .parents('[data-testid^="service-card-"]')
      .within(() => {
        cy.contains("Замовити").click();
      });

    // Check dynamic URL
    cy.url().should("include", "/booking/lawn-mowing");

    // Verify prefilled service in select and sidebar
    cy.get("select").should("have.value", "lawn-mowing");
    cy.get("aside").contains("Покіс газону та трави").should("be.visible");
  });

  it("navigates to dynamic route /booking/:serviceId from popular services on Home page", () => {
    cy.visit("/");

    cy.get("#katalog").within(() => {
      cy.contains("Покіс газону та трави")
        .parents('[data-testid^="service-card-"]')
        .within(() => {
          cy.contains("Замовити").click();
        });
    });

    cy.url().should("include", "/booking/lawn-mowing");
    cy.get("select").should("have.value", "lawn-mowing");
    cy.get("aside").contains("Покіс газону та трави").should("be.visible");
  });

  it("navigates to /services via 'Усі послуги' link", () => {
    cy.visit("/");
    cy.get("#katalog").contains("Усі послуги").click();
    cy.url().should("include", "/services");
  });

  it("navigates to /auth when clicking profile in Header", () => {
    cy.visit("/");
    cy.get('header a[title="Особистий кабінет"]').click();
    cy.url().should("include", "/auth");
  });

  it("renders 404 NotFoundPage for unknown routes with working return button", () => {
    cy.visit("/non-existent-route-404");

    // Check 404 page content
    cy.get('[data-testid="not-found-card"]').should("be.visible");
    cy.contains("404").should("be.visible");
    cy.contains("Сторінку не знайдено").should("be.visible");

    // Click return to home button
    cy.contains("Повернутися на головну").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
