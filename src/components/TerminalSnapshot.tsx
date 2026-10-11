import React from "react";
import styles from "./TerminalSnapshot.module.css";

export interface TerminalSnapshotProps {
  title?: string;
  command: string;
  outputLines: Array<{
    text: string;
    type?: "default" | "success" | "info" | "warning" | "dim" | "command" | "highlight";
  }>;
}

export const TerminalSnapshot: React.FC<TerminalSnapshotProps> = ({
  title = "PowerShell - HomeApp",
  command,
  outputLines,
}) => {
  const getColorClass = (type?: string) => {
    switch (type) {
      case "command":
        return styles.textCommand;
      case "success":
        return styles.textSuccess;
      case "info":
        return styles.textInfo;
      case "warning":
        return styles.textWarning;
      case "dim":
        return styles.textDim;
      case "highlight":
        return styles.textHighlight;
      default:
        return styles.textDefault;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        {/* Window Title Bar */}
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.titleText}>{title}</span>
          <div className={styles.titleSpacer} />
        </div>

        {/* Terminal Body */}
        <div className={styles.terminalBody}>
          {/* Prompt line */}
          <div className={styles.promptMetaLine}>
            <span className={styles.userHost}>student@DESKTOP</span>
            <span className={styles.pathSep}>:</span>
            <span className={styles.cwd}>~/Downloads/HomeApp</span>
            <span className={styles.pathSep}>(</span>
            <span className={styles.branch}>feature/lab4-frontend-layout</span>
            <span className={styles.pathSep}>)</span>
          </div>

          <div className={styles.commandLine}>
            <span className={styles.promptSymbol}>$</span>
            <span>{command}</span>
          </div>

          {/* Output lines */}
          {outputLines.map((line, idx) => (
            <div key={idx} className={`${getColorClass(line.type)} ${styles.outputLine}`.trim()}>
              {line.text}
            </div>
          ))}

          {/* New prompt line showing ready state */}
          <div className={styles.readyLine}>
            <span className={styles.userHost}>student@DESKTOP</span>
            <span className={styles.pathSep}>:</span>
            <span className={styles.cwd}>~/Downloads/HomeApp</span>
            <span className={styles.promptSymbol}>$</span>
            <span className={styles.cursorBlock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalSnapshot;
