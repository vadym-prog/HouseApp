// Cypress Component Testing Support
import { mount } from "cypress/react";
import "../../src/index.css";

// Declare global mount type
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
