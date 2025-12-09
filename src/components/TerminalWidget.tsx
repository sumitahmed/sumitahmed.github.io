import { ReactNode } from 'react';
import { DraggableWindow } from './DraggableWindow';

interface TerminalWidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function TerminalWidget({ 
  title, 
  children, 
  className = '',
  noPadding = false
}: TerminalWidgetProps) {
  return (
    <DraggableWindow 
      title={title} 
      className={className}
    >
      <div className={`bg-hl-panel/80 backdrop-blur-md border-x border-b border-white/10 rounded-b-lg ${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
    </DraggableWindow>
  );
}
