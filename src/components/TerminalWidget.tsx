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
  // ✅ FIX: Now wrapping DraggableWindow to get the real buttons (x, expand, minimize)
  return (
    <DraggableWindow 
      title={title} 
      className={className}
    >
      {/* Content wrapper to handle padding logic */}
      <div className={`h-full ${noPadding ? "" : "p-4 md:p-5"}`}>
        {children}
      </div>
    </DraggableWindow>
  );
}