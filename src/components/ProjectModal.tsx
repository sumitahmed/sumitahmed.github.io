import { Project } from "../lib/data";
import { X, Cpu, Target, Layers, ArrowRight, Flag, Lightbulb, Zap, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[95vh] overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 shrink-0">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-mono flex items-center gap-2">
                <span className="text-hl-cyan">./</span>
                {project.title}
              </h2>
              <p className="text-xs text-hl-muted font-mono mt-1">case_study.md • {project.tags.slice(0, 3).join(" • ")}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-hl-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content (Scrollable) */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
            
            {/* 1. Overview & Motivation Grid */}
            <div className="grid md:grid-cols-2 gap-10">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-hl-cyan font-bold font-mono text-sm tracking-wider">
                  <Target className="w-4 h-4" /> OVERVIEW
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {project.overview}
                </p>
              </section>
              
              <section className="space-y-4">
                 <div className="flex items-center gap-2 text-hl-rose font-bold font-mono text-sm tracking-wider">
                  <Lightbulb className="w-4 h-4" /> WHY I BUILT THIS
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {project.motivation}
                </p>
              </section>
            </div>

            {/* Separator */}
            <div className="h-px bg-white/5 w-full" />

            {/* 2. Features & Tech Stack */}
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Features (Span 2 cols) */}
              <div className="md:col-span-2 space-y-5">
                <div className="flex items-center gap-2 text-hl-moss font-bold font-mono text-sm tracking-wider">
                  <Layers className="w-4 h-4" /> WHAT USERS CAN DO
                </div>
                <div className="grid gap-3">
                  {project.features?.map((feature, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded border border-white/5 hover:border-white/10 transition-colors">
                      <ArrowRight className="w-4 h-4 text-hl-moss shrink-0 mt-0.5" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack (Span 1 col) */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-purple-400 font-bold font-mono text-sm tracking-wider">
                  <Cpu className="w-4 h-4" /> TECH STACK
                </div>
                <div className="space-y-3">
                  {project.techStackDetails?.map((stack, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xs text-hl-muted uppercase tracking-wider">{stack.category}</span>
                      <span className="text-sm text-white font-mono border-l-2 border-purple-400/30 pl-3 mt-1">
                        {stack.tools}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-white/5 w-full" />

            {/* 3. Impact, Challenges & Future */}
            <div className="grid md:grid-cols-3 gap-8">
              
               {/* Impact */}
               {project.impact && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold font-mono text-sm tracking-wider">
                    <Zap className="w-4 h-4" /> IMPACT & LAUNCH
                  </div>
                  <ul className="space-y-3">
                    {project.impact.map((item, i) => (
                      <li key={i} className="text-sm text-gray-400 flex gap-3">
                        <span className="text-yellow-400 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-orange-400 font-bold font-mono text-sm tracking-wider">
                    <AlertTriangle className="w-4 h-4" /> ENGINEERING CHALLENGES
                  </div>
                  <div className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <div key={i}>
                        <span className="text-xs text-orange-400 font-bold block mb-1">{c.title}</span>
                        <p className="text-xs text-gray-400 leading-relaxed">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Future */}
              {project.futurePlans && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-sm tracking-wider">
                    <Flag className="w-4 h-4" /> ROADMAP
                  </div>
                  <ul className="space-y-3">
                    {project.futurePlans.map((plan, i) => (
                      <li key={i} className="text-sm text-gray-400 flex gap-3">
                        {/* ✅ FIXED: Changed -> to &gt; (or just use an arrow icon) */}
                        <span className="text-blue-400 mt-1">&rarr;</span> {plan}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3 shrink-0">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-sm text-hl-muted hover:text-white transition-colors border border-transparent hover:border-white/10 rounded-lg"
            >
              Close File
            </button>
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-2.5 text-sm bg-hl-cyan text-black font-bold rounded-lg hover:bg-hl-cyan/90 transition-colors shadow-lg shadow-hl-cyan/20"
              >
                Launch Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}