import { Button } from "./Button";

describe("<Button /> Component", () => {
  it("mounts a button", () => {
    cy.mount(<Button>Test</Button>);
    cy.get("button").should("exist");
  });
});
