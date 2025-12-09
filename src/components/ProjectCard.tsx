import { Project } from "../lib/data";
import { TerminalWidget } from "./TerminalWidget";
import { Button } from "./ui/button";
import { ExternalLink, Github, Youtube } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TerminalWidget 
      title={`~/projects/${project.id}`} 
      noPadding 
      className="hover:border-hl-cyan/50 transition-colors h-full flex flex-col"
    >
      {/* ✅ 16:9 Aspect Ratio Enforced here 
         'aspect-video' = 16/9 ratio
         'overflow-hidden' = cuts off anything outside that box
      */}
      <div className="aspect-video overflow-hidden border-b border-white/5 relative group bg-black/40">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        
        <img 
          src={project.image} 
          alt={project.title} 
          // ✅ 'object-cover' ensures the image fills the 16:9 box perfectly
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => {
            e.currentTarget.style.display = 'none'; 
          }}
        />
      </div>

      <div className="p-5 space-y-4 flex flex-col flex-1">
        
        {/* Title & Featured Badge */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
          {project.featured && (
            <span className="text-[10px] font-mono border border-hl-rose/50 text-hl-rose bg-hl-rose/10 px-2 py-0.5 rounded-full">
              FEATURED
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-hl-muted leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs font-mono text-hl-cyan bg-hl-cyan/5 border border-hl-cyan/10 px-2 py-1 rounded select-none hover:bg-hl-cyan/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Dynamic Buttons */}
        <div className="flex gap-3 pt-2">
          {/* 1. YouTube Button (AgriSense) */}
          {project.youtubeUrl && (
            <Button 
              size="sm" 
              className="bg-red-600 hover:bg-red-700 text-white border-none transition-colors"
              onClick={() => window.open(project.youtubeUrl, "_blank")}
            >
              <Youtube className="w-4 h-4 mr-2 fill-current" /> Demo Video
            </Button>
          )}

          {/* 2. Live Demo Button (Generic) */}
          {project.demoUrl && (
            <Button 
              size="sm"
              onClick={() => window.open(project.demoUrl, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
            </Button>
          )}

          {/* 3. GitHub Button (VidTube / Nyay Sarthi) */}
          {project.githubUrl && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              <Github className="w-4 h-4 mr-2" /> Source Code
            </Button>
          )}
        </div>
      </div>
    </TerminalWidget>
  );
}