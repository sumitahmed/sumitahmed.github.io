import { DraggableWindow } from "./DraggableWindow";
import { CodingStats } from "./CodingStats";

export function AboutSection() {
  return (
    <section id="about" className="relative py-20">
      <div className="container px-4 md:px-6 space-y-10 max-w-5xl mx-auto">
        
        {/* 1. Text Content Window */}
        <DraggableWindow title="README.md" className="w-full">
          <div className="space-y-6 p-8 text-sm md:text-base leading-relaxed text-hl-muted font-sans">
            <h2 className="text-2xl font-bold text-hl-text mb-4 border-b border-hl-border pb-2">
              About Me
            </h2>
            
            <p>
              I am a dedicated <span className="font-semibold text-hl-cyan">Full Stack Developer</span> passionate about engineering scalable solutions. My expertise spans the entire MERN stack, ensuring seamless integration between robust backends and pixel-perfect frontends.
            </p>
            
            <p>
              I specialize in Next.js, TypeScript, and <span className="text-hl-text font-bold">GenAI</span> integrations. I have extensive experience architecting secure, cloud-native web applications and delivering production-ready systems that solve real-world problems.
            </p>
            
            <div className="bg-hl-card p-4 rounded-lg border-l-2 border-hl-cyan shadow-md">
              <p className="italic text-hl-muted/80">
                "I can build whatever you need. My philosophy is simple: as long as I'm learning something new or getting paid well enough for my time—preferably both—I'm ready to deploy."
              </p>
            </div>
          </div>
        </DraggableWindow>

        {/* 2. Stats Window */}
        <DraggableWindow title="stats.json" className="w-full">
          <div className="p-6">
            <h3 className="text-xs font-mono text-hl-muted mb-4 uppercase tracking-widest border-b border-hl-border pb-2">
              // Live Performance Metrics
            </h3>
            <CodingStats />
          </div>
        </DraggableWindow>

      </div>
    </section>
  );
}