import { Button } from "./Button";
import styles from "./Button.module.css";

describe("<Button /> Component", () => {
  it("renders with given text", () => {
    cy.mount(<Button>Тестова кнопка</Button>);
    cy.contains("Тестова кнопка").should("be.visible");
    cy.screenshot("button-basic-render");
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
    cy.get("button").should("have.class", styles.primary);
    cy.contains("Замовити").should("exist");
    cy.screenshot("button-with-icon-variant");
  });

  it("respects disabled state", () => {
    const onClick = cy.stub().as("clickHandler");
    cy.mount(
      <Button disabled onClick={onClick}>
        Неактивна
      </Button>
    );
    cy.get("button").should("be.disabled");
    cy.screenshot("button-disabled-state");
  });
});
