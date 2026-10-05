import { defineConfig } from "cypress";

export default defineConfig({
  screenshotsFolder: "docs/screenshots/cypress",
  trashAssetsBeforeRuns: false,
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    screenshotOnRunFailure: false,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.ts",
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    screenshotOnRunFailure: false,
  },
});
