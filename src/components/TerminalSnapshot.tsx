import React from "react";

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
  const getColor = (type?: string) => {
    switch (type) {
      case "command":
        return "text-white font-bold";
      case "success":
        return "text-emerald-400 font-semibold";
      case "info":
        return "text-cyan-400";
      case "warning":
        return "text-amber-400";
      case "dim":
        return "text-neutral-500";
      case "highlight":
        return "text-purple-400 font-semibold";
      default:
        return "text-neutral-200";
    }
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen flex items-center justify-center font-mono">
      <div className="w-[880px] rounded-xl overflow-hidden shadow-2xl border border-neutral-800 bg-[#0d1117]">
        {/* Window Title Bar */}
        <div className="h-10 bg-[#161b22] border-b border-neutral-800 flex items-center justify-between px-4 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
          </div>
          <span className="text-xs text-neutral-400 font-sans font-medium">{title}</span>
          <div className="w-12"></div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 text-[13px] leading-relaxed select-text space-y-1 bg-[#0d1117] text-neutral-200">
          {/* Prompt line */}
          <div className="flex items-center gap-2 pb-1 border-b border-neutral-800/80 mb-3 text-xs">
            <span className="text-emerald-400 font-bold">student@DESKTOP</span>
            <span className="text-neutral-500">:</span>
            <span className="text-blue-400 font-semibold">~/Downloads/HomeApp</span>
            <span className="text-neutral-500">(</span>
            <span className="text-purple-400 font-medium">feature/lab3-project-skeleton</span>
            <span className="text-neutral-500">)</span>
          </div>

          <div className="flex items-center gap-2 text-white font-bold pb-2">
            <span className="text-emerald-400">$</span>
            <span>{command}</span>
          </div>

          {/* Output lines */}
          {outputLines.map((line, idx) => (
            <div key={idx} className={`${getColor(line.type)} whitespace-pre-wrap font-mono`}>
              {line.text}
            </div>
          ))}

          {/* New prompt line showing ready state */}
          <div className="flex items-center gap-2 pt-3 text-xs opacity-75">
            <span className="text-emerald-400 font-bold">student@DESKTOP</span>
            <span className="text-neutral-500">:</span>
            <span className="text-blue-400 font-semibold">~/Downloads/HomeApp</span>
            <span className="text-emerald-400">$</span>
            <span className="w-2 h-4 bg-neutral-400 animate-pulse inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
