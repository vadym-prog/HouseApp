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
  imageUrl: "https://via.placeholder.com/300",
};

describe("<ServiceCard /> Component", () => {
  it("renders service details correctly", () => {
    cy.mount(<ServiceCard service={mockService} />);

    cy.contains("Покіс газону та трави").should("be.visible");
    cy.contains("Газон").should("be.visible");
    cy.contains("від 250 ₴").should("be.visible");
    cy.contains("/ сотка").should("be.visible");
  });

  it("calls onOrder callback when order button clicked", () => {
    const onOrder = cy.stub().as("orderHandler");
    cy.mount(<ServiceCard service={mockService} onOrder={onOrder} />);

    cy.contains("Замовити").click();
    cy.get("@orderHandler").should("have.been.calledWith", mockService);
  });
});
