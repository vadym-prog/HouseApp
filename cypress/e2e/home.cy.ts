describe("Home Page E2E", () => {
  it("visits the home page", () => {
    cy.visit("/");
    cy.contains("h1", "МайстерДім").should("exist");
  });
});
