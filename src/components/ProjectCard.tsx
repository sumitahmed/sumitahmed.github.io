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
      <TerminalWidget 
        title={`~/projects/${project.id}`} 
        noPadding 
        className="hover:border-hl-cyan/50 transition-colors h-full flex flex-col"
      >
        <div className="aspect-video overflow-hidden border-b border-white/5 relative group bg-black/40">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            onError={(e) => {
              e.currentTarget.style.display = 'none'; 
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
            <button className="bg-black/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-mono border border-white/20">
              Click View Details to explore
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4 flex flex-col flex-1 bg-transparent">
          
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
            {project.featured && (
              <span className="text-[10px] font-mono border border-hl-rose/50 text-hl-rose bg-hl-rose/10 px-2 py-0.5 rounded-full">
                FEATURED
              </span>
            )}
          </div>

          <p className="text-sm text-hl-muted leading-relaxed flex-1 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map(tag => (
              <span 
                key={tag} 
                className="text-xs font-mono text-hl-cyan bg-hl-cyan/5 border border-hl-cyan/10 px-2 py-1 rounded select-none"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs font-mono text-hl-muted px-1 py-1">+{project.tags.length - 4}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button 
              size="sm"
              variant="default"
              className="bg-white/10 hover:bg-white/20 text-white border-none flex-1"
              onClick={() => setIsModalOpen(true)}
            >
              <BookOpen className="w-4 h-4 mr-2 text-hl-cyan" /> View Details
            </Button>

            {project.demoUrl && (
              <Button 
                size="sm"
                variant="outline"
                className="border-white/10"
                onClick={() => window.open(project.demoUrl, "_blank")}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}

            {project.githubUrl && (
              <Button 
                size="sm" 
                variant="outline"
                className="border-white/10"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github className="w-4 h-4" />
              </Button>
            )}

            {/* ✅ FIXED: Button now says "Demo Video" explicitly */}
            {project.youtubeUrl && (
              <Button 
                size="sm"
                variant="outline"
                className="bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                onClick={() => window.open(project.youtubeUrl, "_blank")}
              >
                <Youtube className="w-4 h-4 mr-2" /> Demo Video
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
    </>
  );
}