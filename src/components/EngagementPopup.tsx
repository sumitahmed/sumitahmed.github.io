import { useState, useEffect } from 'react';
import { X, Terminal, ArrowRight, Activity } from 'lucide-react';
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
          {/* Hyprland Style Container: Dark, Blur, Thin Border */}
          <div className="bg-[#050505]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-pink-400/30 transition-colors duration-500">
            
            {/* "Decorations" - The Sakura Pink Top Border */}
            <div className="h-[2px] w-full bg-gradient-to-r from-pink-500 via-rose-400 to-transparent" />

            <div className="p-4">
              {/* Header: System Monitor Style */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-pink-500/10 border border-pink-500/20">
                    <Activity className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-200 font-mono">session_active</h3>
                    <p className="text-[10px] text-gray-500 font-mono">uptime: &gt; 1m</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 leading-relaxed">
                  You seem interested in the stack. Should we execute <span className="text-pink-400 font-mono bg-pink-500/5 px-1 rounded">connect.sh</span> and build something together?
                </p>
              </div>

              {/* Buttons: Terminal Command Style */}
              <div className="flex gap-3">
                <Button
                  onClick={handleContact}
                  className="flex-1 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 border border-pink-500/30 text-xs font-mono h-9 transition-all"
                >
                  <Terminal className="w-3.5 h-3.5 mr-2" />
                  ./say_hello
                </Button>
                
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  className="flex-1 text-gray-500 hover:text-gray-300 text-xs font-mono h-9 hover:bg-white/5"
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