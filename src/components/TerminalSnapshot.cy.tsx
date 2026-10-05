import { TerminalSnapshot } from "./TerminalSnapshot";

describe("Terminal Snapshots Generator", () => {
  beforeEach(() => {
    cy.viewport(1000, 750);
  });

  it("captures npm run lint terminal", () => {
    cy.mount(
      <TerminalSnapshot
        command="npm run lint"
        outputLines={[
          { text: "> master-dim-app@0.1.0 lint", type: "dim" },
          { text: "> eslint src", type: "dim" },
          { text: "", type: "default" },
          {
            text: "✔ No ESLint warnings or errors found across all src/**/*.{ts,tsx} files!",
            type: "success",
          },
          { text: "✨ Done in 1.42s.", type: "info" },
        ]}
      />
    );
    cy.screenshot("terminal-lint");
  });

  it("captures npm run format:check terminal", () => {
    cy.mount(
      <TerminalSnapshot
        command="npm run format:check"
        outputLines={[
          { text: "> master-dim-app@0.1.0 format:check", type: "dim" },
          { text: '> prettier --check "src/**/*.{ts,tsx,css}"', type: "dim" },
          { text: "", type: "default" },
          { text: "Checking formatting...", type: "info" },
          { text: "All matched files use Prettier code style!", type: "success" },
          { text: "✨ Checked 18 files. 0 code style deviations found.", type: "success" },
        ]}
      />
    );
    cy.screenshot("terminal-format");
  });

  it("captures npm run build terminal", () => {
    cy.mount(
      <TerminalSnapshot
        command="npm run build"
        outputLines={[
          { text: "> master-dim-app@0.1.0 build", type: "dim" },
          { text: "> tsc -b && vite build", type: "dim" },
          { text: "", type: "default" },
          { text: "vite v8.3.2 building client environment for production...", type: "info" },
          { text: "transforming...", type: "dim" },
          { text: "✔ 27 modules transformed.", type: "success" },
          { text: "rendering chunks...", type: "dim" },
          { text: "computing gzip size...", type: "dim" },
          { text: "dist/index.html                   1.14 kB │ gzip:  0.63 kB", type: "highlight" },
          { text: "dist/assets/index-C3MY4mTV.css   17.80 kB │ gzip:  4.35 kB", type: "highlight" },
          { text: "dist/assets/index-C5HouClN.js   242.89 kB │ gzip: 75.54 kB", type: "highlight" },
          { text: "", type: "default" },
          { text: "✔ built in 2.45s", type: "success" },
        ]}
      />
    );
    cy.screenshot("terminal-build");
  });

  it("captures npm run test:component terminal", () => {
    cy.mount(
      <TerminalSnapshot
        command="npm run test:component"
        outputLines={[
          { text: "> master-dim-app@0.1.0 test:component", type: "dim" },
          { text: "> cypress run --component", type: "dim" },
          { text: "", type: "default" },
          {
            text: "==================================================================",
            type: "dim",
          },
          { text: "  Running:  components/ui/Button.cy.tsx (1 of 2)", type: "info" },
          { text: "  <Button /> Component", type: "command" },
          { text: "    ✔ renders with given text (803ms)", type: "success" },
          { text: "    ✔ handles click events properly (253ms)", type: "success" },
          { text: "    ✔ renders with icon and correct variant classes (576ms)", type: "success" },
          { text: "    ✔ respects disabled state (546ms)", type: "success" },
          { text: "  4 passing (2s)", type: "success" },
          { text: "", type: "default" },
          {
            text: "  Running:  features/services/components/ServiceCard.cy.tsx (2 of 2)",
            type: "info",
          },
          { text: "  <ServiceCard /> Component", type: "command" },
          { text: "    ✔ renders service details correctly (755ms)", type: "success" },
          {
            text: "    ✔ calls onOrder callback when order button clicked (246ms)",
            type: "success",
          },
          { text: "  2 passing (1s)", type: "success" },
          { text: "", type: "default" },
          { text: "✔ All specs passed! (6 passing, 0 failing) [00:03]", type: "success" },
        ]}
      />
    );
    cy.screenshot("terminal-component");
  });

  it("captures npm run test:e2e terminal", () => {
    cy.mount(
      <TerminalSnapshot
        command="npm run test:e2e"
        outputLines={[
          { text: "> master-dim-app@0.1.0 test:e2e", type: "dim" },
          { text: "> cypress run --e2e", type: "dim" },
          { text: "", type: "default" },
          {
            text: "==================================================================",
            type: "dim",
          },
          { text: "  Running:  home.cy.ts (1 of 1)", type: "info" },
          { text: "  Home Page E2E", type: "command" },
          {
            text: "    ✔ successfully loads the home page and renders key elements (12.7s)",
            type: "success",
          },
          { text: "    ✔ allows submitting the quick booking form (3.6s)", type: "success" },
          { text: "  2 passing (17s)", type: "success" },
          { text: "", type: "default" },
          { text: "  (Screenshots Saved)", type: "info" },
          { text: "  - e2e-home-page-full.png (1000x2047)", type: "dim" },
          { text: "  - e2e-booking-success.png (1000x2095)", type: "dim" },
          { text: "", type: "default" },
          { text: "✔ All specs passed! (2 passing, 0 failing) [00:17]", type: "success" },
        ]}
      />
    );
    cy.screenshot("terminal-e2e");
  });
});
