import { ACHIEVEMENTS_CERTS } from "../lib/data";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function AchievementsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      
      <div className="mb-12 flex items-end gap-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-hl-text">
          <span className="text-hl-moss">./</span>Achievements & Certifications
        </h2>
        <div className="h-px bg-hl-border flex-1 mb-4" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {ACHIEVEMENTS_CERTS.map((cert, i) => (
          <motion.a
            key={i}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`
              relative overflow-hidden
              bg-hl-panel 
              border border-hl-border ${cert.border}
              p-6 rounded-xl 
              transition-all duration-300 
              hover:scale-105 hover:shadow-2xl hover:shadow-hl-cyan/10
              group cursor-pointer
            `}
          >
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              
              {/* Icon Circle */}
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center 
                ${cert.bgColor} ${cert.color}
                ring-1 ring-hl-border shadow-lg
                group-hover:scale-110 transition-transform duration-300
              `}>
                <cert.icon className="w-8 h-8" />
              </div>

              {/* Text Content */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-hl-text leading-tight group-hover:text-hl-cyan transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-hl-muted font-mono">
                  {cert.issuer}
                </p>
              </div>

              {/* Footer */}
              <div className="w-full pt-4 border-t border-hl-border flex items-center justify-between text-xs text-hl-muted font-mono">
                <span>Issued: {cert.date}</span>
                <span className="flex items-center gap-1 group-hover:text-hl-text transition-colors">
                  Verify <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}