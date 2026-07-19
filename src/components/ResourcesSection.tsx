import { motion } from "framer-motion";
import { Book, ExternalLink } from "lucide-react";

export function ResourcesSection() {
  return (
    <section className="py-20 relative">
      <div className="mb-10 flex items-end gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-hl-text">
          <span className="text-hl-rose">./</span>Blogs & Resources
        </h2>
        <div className="h-px bg-hl-border flex-1 mb-4" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.a 
          href="https://sumitahmed-recourses.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-hl-border bg-hl-panel p-8 sm:p-10 overflow-hidden transition-all hover:border-hl-cyan/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Book className="w-48 h-48 text-hl-cyan rotate-12 -translate-y-10 translate-x-10" />
          </div>
          
          <div className="flex-shrink-0 p-5 rounded-2xl bg-hl-bg border border-hl-border group-hover:border-hl-cyan/30 transition-colors z-10">
            <Book className="w-10 h-10 text-hl-cyan" />
          </div>
          
          <div className="relative z-10 flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hl-cyan/10 text-hl-cyan text-xs font-mono mb-4 border border-hl-cyan/20">
              <ExternalLink className="w-3 h-3" /> EXTERNAL PORTAL
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-hl-text mb-3 group-hover:text-hl-cyan transition-colors">
              Access All My Resources
            </h3>
            <p className="text-hl-muted leading-relaxed text-sm sm:text-base">
              I've moved all my blogs, notes, DSA protocols, and placement preparation guides to a dedicated external platform for a better reading and organization experience.
            </p>
            
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-hl-cyan bg-hl-cyan/5 px-4 py-2 rounded-lg border border-hl-cyan/20 group-hover:bg-hl-cyan/10 transition-colors">
              <span>Visit sumitahmed-recourses.vercel.app</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}