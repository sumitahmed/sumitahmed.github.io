import { useState } from "react";
import { Project } from "../lib/data";
import { TerminalWidget } from "./TerminalWidget";
import { Button } from "./ui/button";
import { ExternalLink, Github, Youtube, BookOpen } from "lucide-react";
import { ProjectModal } from "./ProjectModal"; 

export function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative h-full">
        {/* Subtle Cyber Glow behind card */}
        <div className="absolute -inset-0.5 bg-gradient-to-b from-hl-cyan/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10" />

        <TerminalWidget 
          title={`~/projects/${project.id}`} 
          noPadding 
          className="h-full flex flex-col bg-hl-panel/95 border-hl-border hover:border-hl-cyan/50 transition-all duration-300 shadow-xl"
        >
          {/* 1. IMAGE SECTION */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="aspect-video overflow-hidden border-b border-hl-border relative bg-hl-card cursor-pointer"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
            
            {/* Overlay Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/40 backdrop-blur-[2px]">
              <div className="bg-black/80 border border-hl-cyan text-hl-cyan px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <BookOpen className="w-4 h-4" /> OPEN_FILE
              </div>
            </div>
          </div>

          {/* 2. CONTENT SECTION */}
          <div className="p-5 flex flex-col flex-1 gap-4">
            
            <h3 className="text-xl font-bold text-hl-text tracking-tight font-display group-hover:text-hl-cyan transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-hl-muted leading-relaxed line-clamp-3 font-mono border-l-2 border-hl-border pl-3">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {project.tags.slice(0, 4).map(tag => (
                <span 
                  key={tag} 
                  className="text-[10px] font-bold font-mono text-hl-cyan bg-hl-cyan/10 border border-hl-cyan/30 px-2 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-[10px] font-mono text-hl-muted px-1 py-1">+{project.tags.length - 4}</span>
              )}
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              
              <Button 
                size="sm"
                className="bg-hl-card hover:bg-hl-cyan/20 text-hl-text hover:text-hl-cyan border border-hl-border hover:border-hl-cyan/50 text-xs font-mono h-10 rounded-sm transition-all shadow-sm"
                onClick={() => setIsModalOpen(true)}
              >
                <BookOpen className="w-3.5 h-3.5 mr-2" /> DETAILS
              </Button>

              {project.demoUrl && (
                <Button 
                  size="sm"
                  className="bg-hl-card hover:bg-purple-500/20 text-hl-text hover:text-purple-400 border border-hl-border hover:border-purple-500/50 text-xs font-mono h-10 rounded-sm transition-all shadow-sm"
                  onClick={() => window.open(project.demoUrl, "_blank")}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-2" /> DEMO
                </Button>
              )}

              {project.githubUrl && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-transparent hover:bg-hl-card text-hl-muted hover:text-hl-text border border-hl-border hover:border-hl-text/40 text-xs font-mono h-10 rounded-sm"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <Github className="w-3.5 h-3.5 mr-2" /> CODE
                </Button>
              )}

              {project.youtubeUrl && (
                <Button 
                  size="sm"
                  className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/60 text-xs font-mono h-10 rounded-sm transition-all"
                  onClick={() => window.open(project.youtubeUrl, "_blank")}
                >
                  <Youtube className="w-3.5 h-3.5 mr-2" /> VIDEO
                </Button>
              )}
            </div>
          </div>
        </TerminalWidget>

        <ProjectModal 
          project={project} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </>
  );
}