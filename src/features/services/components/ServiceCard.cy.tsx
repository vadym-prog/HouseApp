import { ServiceCard } from "./ServiceCard";
import type { ServiceItem } from "../types";

const mockService: ServiceItem = {
  id: "test-service",
  title: "Покіс газону та трави",
  category: "lawn",
  categoryLabel: "Газон",
  description: "Стрижка газону професійними косарками.",
  price: 250,
  unit: "сотка",
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxbtmoNwUTY6GQqVB9Mc75mSHplDoLq_hBimP9MXp5MagNR5Nw6IAOtRkDaVtret5PHC6bIb0_Sp3yd0bjxunFumAaDsPVLQv7LoL9Y4JAymTV407Z3jLA2ikYqJu3Ahi8dUn9kdLIjrSW43mjjw4CThCIromRNpC3guW1Sc1k8JIqHaOBZNxhrJJQ4b-3aZsjBYC5OY9rdKW7FejsFKD0OXb1pI_5Q_84a_eZh_xUkLgXKPC7YdT6",
};

describe("<ServiceCard /> Component", () => {
  it("renders service details correctly", () => {
    cy.mount(<ServiceCard service={mockService} />);

    cy.contains("Покіс газону та трави").should("be.visible");
    cy.contains("Газон").should("be.visible");
    cy.contains("від 250 ₴").should("be.visible");
    cy.contains("/ сотка").should("be.visible");
    cy.screenshot("service-card-render");
  });

  it("calls onOrder callback when order button clicked", () => {
    const onOrder = cy.stub().as("orderHandler");
    cy.mount(<ServiceCard service={mockService} onOrder={onOrder} />);

    cy.contains("Замовити").click();
    cy.get("@orderHandler").should("have.been.calledWith", mockService);
  });
});
