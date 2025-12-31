import { useState, useEffect } from 'react';
import { X, Terminal, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

export function EngagementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger after 60 seconds
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  const handleContact = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[100] max-w-sm w-[90%] md:w-[400px]"
        >
          {/* CYBER CONTAINER */}
          <div className="bg-hl-panel/95 backdrop-blur-md border border-hl-cyan/30 rounded-lg shadow-[0_0_30px_rgba(165,180,252,0.15)] overflow-hidden group">
            
            {/* The "Loading" Top Bar */}
            <div className="h-[2px] w-full bg-hl-border">
                <div className="h-full bg-hl-cyan w-1/3 animate-[loading_2s_ease-in-out_infinite]" />
            </div>

            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-hl-cyan/10 border border-hl-cyan/30 rounded-sm">
                    <Activity className="w-4 h-4 text-hl-cyan" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-hl-text font-mono tracking-wider">session_active</h3>
                    <p className="text-[10px] text-hl-muted font-mono">uptime: &gt; 1m</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-hl-muted hover:text-hl-text transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-sm text-hl-muted leading-relaxed font-mono">
                  You seem interested in the stack. Should we execute <span className="text-hl-cyan bg-hl-cyan/10 px-1 rounded">connect.sh</span> and build something together?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleContact}
                  className="flex-1 bg-hl-cyan/10 hover:bg-hl-cyan/20 text-hl-cyan border border-hl-cyan/50 rounded-sm text-xs font-bold font-mono h-9 transition-all"
                >
                  <Terminal className="w-3.5 h-3.5 mr-2" />
                  ./say_hello
                </Button>
                
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  className="flex-1 text-hl-muted hover:text-hl-text border border-hl-border hover:bg-hl-card rounded-sm text-xs font-mono h-9"
                >
                  ignore && close
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}