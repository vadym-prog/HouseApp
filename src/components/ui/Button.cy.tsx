import { Button } from "./Button";

describe("<Button /> Component", () => {
  it("renders with given text", () => {
    cy.mount(<Button>Тестова кнопка</Button>);
    cy.contains("Тестова кнопка").should("be.visible");
  });

  it("handles click events properly", () => {
    const onClick = cy.stub().as("clickHandler");
    cy.mount(<Button onClick={onClick}>Натисни мене</Button>);
    cy.contains("Натисни мене").click();
    cy.get("@clickHandler").should("have.been.calledOnce");
  });

  it("renders with icon and correct variant classes", () => {
    cy.mount(
      <Button variant="primary" icon="arrow_forward">
        Замовити
      </Button>
    );
    cy.get("button").should("have.class", "bg-black");
    cy.contains("Замовити").should("exist");
  });

  it("respects disabled state", () => {
    const onClick = cy.stub().as("clickHandler");
    cy.mount(
      <Button disabled onClick={onClick}>
        Неактивна
      </Button>
    );
    cy.get("button").should("be.disabled");
  });
});
