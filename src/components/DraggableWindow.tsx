import { useState, useRef, ReactNode, MouseEvent, useEffect } from "react";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function DraggableWindow({
  title,
  children,
  className = "",
}: DraggableWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // ✅ NEW: Track screen size to disable dragging on mobile
  const [isMobile, setIsMobile] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const returnTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const MAX_DISTANCE = 200;
  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 200;

  // ✅ Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMinimize = () => {
    setOffset({ x: 0, y: 0 });
    setIsMaximized(false);
    setHasBeenDragged(false);
    setSize({ width: 0, height: 0 });
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    setOffset({ x: 0, y: 0 });
    setIsMaximized(false);
    setHasBeenDragged(false);
    setSize({ width: 0, height: 0 });
    setShowCloseModal(true);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // ✅ Disable drag on mobile or if maximized
    if (isMaximized || isMobile) return;

    setIsDragging(true);
    setHasBeenDragged(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });

    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }
  };

  const handleResizeStart = (e: MouseEvent<HTMLDivElement>, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMaximized || isMobile) return;

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width || rect.width,
      height: size.height || rect.height,
    });
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (isDragging && !isMaximized && !isMobile) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setOffset({ x: newX, y: newY });
    }

    if (isResizing && !isMaximized && !isMobile) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newOffsetX = offset.x;
      let newOffsetY = offset.y;

      if (resizeDirection.includes("e")) newWidth = Math.max(MIN_WIDTH, resizeStart.width + deltaX);
      if (resizeDirection.includes("w")) {
        const potentialWidth = resizeStart.width - deltaX;
        if (potentialWidth >= MIN_WIDTH) {
          newWidth = potentialWidth;
          newOffsetX = offset.x + deltaX;
        }
      }
      if (resizeDirection.includes("s")) newHeight = Math.max(MIN_HEIGHT, resizeStart.height + deltaY);
      if (resizeDirection.includes("n")) {
        const potentialHeight = resizeStart.height - deltaY;
        if (potentialHeight >= MIN_HEIGHT) {
          newHeight = potentialHeight;
          newOffsetY = offset.y + deltaY;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setOffset({ x: newOffsetX, y: newOffsetY });
      setHasBeenDragged(true);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      const distance = Math.sqrt(offset.x * offset.x + offset.y * offset.y);

      if (distance > MAX_DISTANCE) {
        const duration = Math.min((distance / 100) * 100, 2000);
        returnTimeoutRef.current = setTimeout(() => {
          setOffset({ x: 0, y: 0 });
          setSize({ width: 0, height: 0 });
          setTimeout(() => setHasBeenDragged(false), 500);
        }, duration);
      }
    }
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection("");
    }
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, offset, resizeStart, resizeDirection, size, isMobile]);

  useEffect(() => {
    return () => {
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998] cursor-pointer"
            onClick={handleMaximize}
          />
        )}
      </AnimatePresence>

      <div
        className={`${isMaximized ? "fixed inset-0 flex items-center justify-center p-4 md:p-8 z-[9999]" : "relative"} ${className}`}
        style={{
          cursor: isDragging ? "grabbing" : "default",
        }}
      >
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: hasBeenDragged && !isMaximized && !isMobile ? offset.x : 0,
            y: hasBeenDragged && !isMaximized && !isMobile ? offset.y : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex flex-col bg-hl-panel/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl w-full"
          style={{
            // ✅ RESPONSIVE SIZING: 100% on mobile, fixed size on desktop unless maximized
            width: isMaximized
              ? "min(700px, 90vw)"
              : size.width > 0 && !isMobile
              ? `${size.width}px`
              : "100%",
            height: isMaximized
              ? "auto"
              : size.height > 0 && !isMobile
              ? `${size.height}px`
              : "auto",
            maxHeight: isMaximized ? "85vh" : "none",
          }}
        >
          {/* Resize Handles (Desktop Only) */}
          {!isMaximized && !isMinimized && !isMobile && (
            <>
              <div className="absolute -top-1 -left-1 w-4 h-4 cursor-nw-resize z-50" onMouseDown={(e) => handleResizeStart(e, "nw")} />
              <div className="absolute -top-1 -right-1 w-4 h-4 cursor-ne-resize z-50" onMouseDown={(e) => handleResizeStart(e, "ne")} />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 cursor-sw-resize z-50" onMouseDown={(e) => handleResizeStart(e, "sw")} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 cursor-se-resize z-50" onMouseDown={(e) => handleResizeStart(e, "se")} />
              <div className="absolute -top-1 left-4 right-4 h-2 cursor-n-resize z-50" onMouseDown={(e) => handleResizeStart(e, "n")} />
              <div className="absolute -bottom-1 left-4 right-4 h-2 cursor-s-resize z-50" onMouseDown={(e) => handleResizeStart(e, "s")} />
              <div className="absolute -left-1 top-4 bottom-4 w-2 cursor-w-resize z-50" onMouseDown={(e) => handleResizeStart(e, "w")} />
              <div className="absolute -right-1 top-4 bottom-4 w-2 cursor-e-resize z-50" onMouseDown={(e) => handleResizeStart(e, "e")} />
            </>
          )}

          {/* Window Header */}
          <div
            className="flex items-center justify-between px-3 py-2 bg-hl-panel/95 backdrop-blur-sm border-b border-white/10 select-none rounded-t-lg relative flex-shrink-0"
            onMouseDown={handleMouseDown}
            style={{
              cursor: isMaximized || isMobile ? "default" : "grab",
              pointerEvents: isMaximized ? "none" : "auto",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-mono text-hl-muted pointer-events-none truncate max-w-[150px]">
              {title}
            </div>

            <div className="flex items-center gap-1" style={{ pointerEvents: "auto" }} onMouseDown={(e) => e.stopPropagation()}>
              <button onClick={handleMinimize} className="p-1.5 hover:bg-white/10 rounded transition-colors text-hl-muted hover:text-white">
                <Minus className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button onClick={handleMaximize} className="p-1.5 hover:bg-white/10 rounded transition-colors text-hl-muted hover:text-white">
                {isMaximized ? <Minimize2 className="w-3 h-3 md:w-4 md:h-4" /> : <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />}
              </button>
              <button onClick={handleClose} className="p-1.5 hover:bg-red-500/20 rounded transition-colors text-hl-muted hover:text-red-400">
                <X className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>

          {/* Window Content */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`bg-hl-panel/80 backdrop-blur-md border-x border-b border-white/10 rounded-b-lg ${isMaximized ? "flex-1 overflow-y-auto overflow-x-hidden" : "overflow-auto"}`}
                style={size.height > 0 && !isMaximized && !isMobile ? { maxHeight: `${size.height - 40}px` } : {}}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Close Modal (Mobile Friendly) */}
      <AnimatePresence>
        {showCloseModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
              onClick={() => setShowCloseModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10001] w-[90%] max-w-md"
            >
              <div className="bg-hl-panel border border-hl-cyan/30 rounded-lg shadow-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-hl-cyan/10 flex items-center justify-center">
                    <X className="w-6 h-6 text-hl-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Hold Up! 🛑</h3>
                    <p className="text-xs text-hl-muted">You're about to miss something cool...</p>
                  </div>
                </div>
                <p className="text-hl-muted mb-6 leading-relaxed text-sm md:text-base">
                  Hey there! Instead of closing this window, why not check out my{" "}
                  <span className="text-hl-cyan font-semibold">projects</span>...
                </p>
                <div className="flex flex-col md:flex-row gap-3">
                  <button onClick={() => setShowCloseModal(false)} className="px-4 py-2 bg-hl-cyan hover:bg-hl-cyan/80 text-hl-bg font-semibold rounded-lg">
                    Okay, I'll stay! 🎉
                  </button>
                  <button onClick={() => setShowCloseModal(false)} className="px-4 py-2 border border-white/10 hover:bg-white/5 text-hl-muted rounded-lg">
                    Maybe later
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}