import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Code2, Target, Award, ExternalLink, Terminal } from "lucide-react";

interface GitHubData {
  repos: number;
}

export function CodingStats() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // 🎛️ FUTURE TOGGLE CONFIGURATION
  // ==========================================
  
  // Set this to TRUE in the future to switch from Codolio to LeetCode
  const USE_LEETCODE = false; 

  const githubUsername = "sumitahmed"; 
  const codolioUsername = "SumitKun";
  const leetcodeUsername = "sumitahmed"; // Your future LeetCode handle

  // 1️⃣ MANUAL CODOLIO STATS (Current)
  const codolioData = {
    total: 135,
    awards: 1,
    easy: 58,
    medium: 8,
    hard: 1,
    label: "Codolio",
    color: "text-hl-rose", // Pink/Red theme
    barColor: "bg-hl-rose",
    link: `https://codolio.com/profile/${codolioUsername}`
  };

  // 2️⃣ MANUAL LEETCODE STATS (Future Placeholder)
  // Update these numbers when you are ready to switch!
  const leetcodeData = {
    total: 15, 
    awards: 0,
    easy: 10,
    medium: 5,
    hard: 0,
    label: "LeetCode",
    color: "text-yellow-500", // Yellow theme
    barColor: "bg-yellow-500",
    link: `https://leetcode.com/${leetcodeUsername}`
  };

  // Select which stats to use based on the toggle
  const stats = USE_LEETCODE ? leetcodeData : codolioData;

  // ==========================================

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setGithub({ repos: data.public_repos || 0 });
      } catch (e) {
        console.error("Github fetch error:", e);
        setGithub({ repos: 33 });
      }
    };

    fetchGitHub().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-hl-cyan border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 font-mono text-[11px]">
      
      {/* 1. GitHub Activity Card */}
      <a 
        href={`https://github.com/${githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 rounded-lg border border-white/10 bg-hl-panel/50 p-3 transition-colors hover:border-hl-cyan/50 hover:bg-hl-panel/80"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-hl-cyan" />
              <span className="text-hl-muted group-hover:text-hl-cyan transition-colors">github_activity</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{github?.repos}</p>
              <p className="text-[9px] text-hl-muted">public_repos</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-white/5 bg-[#0d1117] p-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <img
              src={`https://ghchart.rshah.org/38bdf8/${githubUsername}`}
              alt="GitHub contributions"
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between text-[9px] text-hl-muted">
            <span>last_12_months</span>
            <span className="flex items-center gap-1 text-hl-cyan">
              view_profile <ExternalLink className="w-2 h-2" />
            </span>
          </div>
        </motion.div>
      </a>

      {/* 2. Coding Stats Card (Toggleable: Codolio / LeetCode) */}
      <a 
        href={stats.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`space-y-3 rounded-lg border border-white/10 bg-hl-panel/50 p-3 transition-colors hover:bg-hl-panel/80 ${USE_LEETCODE ? "hover:border-yellow-500/50" : "hover:border-hl-rose/50"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {USE_LEETCODE ? (
                <Terminal className={`h-4 w-4 ${stats.color}`} />
              ) : (
                <Code2 className={`h-4 w-4 ${stats.color}`} />
              )}
              <span className={`text-hl-muted transition-colors ${USE_LEETCODE ? "group-hover:text-yellow-500" : "group-hover:text-hl-rose"}`}>
                coding_stats
              </span>
            </div>
            <span className="text-[9px] text-hl-muted">{stats.label}</span>
          </div>

          {/* THEMED Custom Card */}
          <div className="relative overflow-hidden rounded-md border border-white/5 bg-gradient-to-br from-[#1a1f2e] to-[#0f1219] p-4 text-gray-200">
            {/* Header */}
            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div>
                <h3 className={`text-sm font-bold text-white transition-colors ${USE_LEETCODE ? "group-hover:text-yellow-500" : "group-hover:text-hl-rose"}`}>
                  Sumit Ahmed
                </h3>
                <p className="text-[9px] text-hl-muted">
                  @{USE_LEETCODE ? leetcodeUsername : codolioUsername}
                </p>
              </div>
              <div className="rounded-full bg-white/5 p-1.5 ring-1 ring-white/10">
                {USE_LEETCODE ? (
                  <Terminal className={`h-4 w-4 ${stats.color}`} />
                ) : (
                  <Code2 className={`h-4 w-4 ${stats.color}`} />
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="relative z-10 grid gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hl-cyan/10">
                  <Target className="h-4 w-4 text-hl-cyan" />
                </div>
                <div>
                  <p className="text-xl font-bold leading-none text-white">{stats.total}</p>
                  <p className="text-[9px] uppercase tracking-wider text-hl-muted">Solved</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/5`}>
                  <Award className={`h-4 w-4 ${stats.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold leading-none text-white">{stats.awards}</p>
                  <p className="text-[9px] uppercase tracking-wider text-hl-muted">Awards</p>
                </div>
              </div>
            </div>

             {/* Themed Breakdown Bar */}
             <div className="relative z-10 mt-4 flex gap-1 pt-2">
                <div className="h-1 rounded-l-full bg-hl-moss" style={{ width: `${(stats.easy/stats.total)*100}%` }} />
                <div className="h-1 bg-hl-cyan" style={{ width: `${(stats.medium/stats.total)*100}%` }} />
                <div className={`h-1 rounded-r-full ${stats.barColor}`} style={{ width: `${(stats.hard/stats.total)*100}%` }} />
             </div>
             
             <div className="flex justify-between pt-1 text-[8px] font-mono opacity-80">
               <span className="text-hl-moss">Easy: {stats.easy}</span>
               <span className="text-hl-cyan">Med: {stats.medium}</span>
               <span className={stats.color}>Hard: {stats.hard}</span>
             </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-1 text-[9px] text-hl-muted">
            <span>source: {stats.label}</span>
            <span className={`flex items-center gap-1 ${stats.color}`}>
              view_stats <ExternalLink className="w-2 h-2" />
            </span>
          </div>
        </motion.div>
      </a>
    </div>
  );
}