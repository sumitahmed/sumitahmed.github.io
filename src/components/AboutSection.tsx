import { DraggableWindow } from "./DraggableWindow";
import { CodingStats } from "./CodingStats";

export function AboutSection() {
  return (
    <section className="relative py-16">
      <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2">
        {/* README.md window (left) */}
        <DraggableWindow title="README.md" className="min-h-[260px]">
          <div className="space-y-4 p-6 text-sm leading-relaxed text-hl-muted">
            <h2 className="mb-2 text-lg font-semibold text-white">
              About Me
            </h2>
            <p>
              I am a dedicated{" "}
              <span className="font-semibold text-hl-cyan">
                Full Stack Developer
              </span>{" "}
              passionate about engineering scalable solutions. My expertise spans the entire MERN stack, ensuring seamless integration between robust backends and pixel-perfect frontends.
            </p>
            <p>
              I specialize in Next.js, TypeScript, and <b>GenAI</b> integrations. I have extensive experience architecting secure, cloud-native web applications and delivering production-ready systems that solve real-world problems.
            </p>
            <p className="pt-2 text-xs text-hl-muted/80">
              I can build whatever you need. My philosophy is simple: as long as I'm learning something new or getting paid well enough for my time—preferably both—I'm ready to deploy.
            </p>
          </div>
        </DraggableWindow>

        {/* FINAL stats.json window (right) */}
        <DraggableWindow title="stats.json" className="min-h-[260px]">
          <CodingStats />
        </DraggableWindow>
      </div>
    </section>
  );
}