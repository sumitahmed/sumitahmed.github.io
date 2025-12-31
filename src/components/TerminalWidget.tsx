import { ReactNode } from "react";
import { DraggableWindow } from "./DraggableWindow";

interface TerminalWidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function TerminalWidget({
  title,
  children,
  className = "",
  noPadding = false,
}: TerminalWidgetProps) {
  // Uses the robust DraggableWindow we refactored earlier
  return (
    <DraggableWindow 
      title={title} 
      className={className}
    >
      <div className={`h-full ${noPadding ? "" : "p-4 md:p-5"}`}>
        {children}
      </div>
    </DraggableWindow>
  );
}