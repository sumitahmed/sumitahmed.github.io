import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Code2, Target, Award, ExternalLink, Terminal } from "lucide-react";

// --- Types ---
interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubData {
  total: number;
  weeks: ContributionDay[][];
}

export function CodingStats() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // 🎛️ CONFIG
  // ==========================================
  const USE_LEETCODE = false;
  const githubUsername = "sumitahmed";
  const codolioUsername = "SumitKun";
  const leetcodeUsername = "sumitahmed";

  // Codolio Data
  const codolioData = {
    total: 135,
    awards: 1,
    easy: 58,
    medium: 8,
    hard: 1,
    label: "Codolio",
    color: "text-hl-rose",
    barColor: "bg-hl-rose",
    link: `https://codolio.com/profile/${codolioUsername}`,
  };

  // LeetCode Data
  const leetcodeData = {
    total: 15,
    awards: 0,
    easy: 10,
    medium: 5,
    hard: 0,
    label: "LeetCode",
    color: "text-yellow-500",
    barColor: "bg-yellow-500",
    link: `https://leetcode.com/${leetcodeUsername}`,
  };

  const stats = USE_LEETCODE ? leetcodeData : codolioData;

  // ==========================================
  // 🎨 Native GitHub Dark Mode Colors
  // ==========================================
  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return '#161b22'; // Empty
      case 1: return '#0e4429'; // Low
      case 2: return '#006d32'; // Medium
      case 3: return '#26a641'; // High
      case 4: return '#39d353'; // Brightest
      default: return '#161b22';
    }
  };

  // ==========================================
  // 🔁 Fetch Real GitHub Data
  // ==========================================
  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        const data = await response.json();
        
        if (!data?.contributions) throw new Error("No data");

        // Process flat data into weeks
        const flatDays: ContributionDay[] = data.contributions;
        const processedWeeks: ContributionDay[][] = [];
        let currentWeek: ContributionDay[] = [];

        flatDays.forEach((day) => {
          const date = new Date(day.date);
          if (date.getDay() === 0 && currentWeek.length > 0) {
            processedWeeks.push(currentWeek);
            currentWeek = [];
          }
          currentWeek.push(day);
        });
        if (currentWeek.length > 0) processedWeeks.push(currentWeek);

        // Keep last 53 weeks (Full Year)
        const recentWeeks = processedWeeks.slice(-53); 
        const total = flatDays.reduce((acc, day) => acc + day.count, 0);

        setGithubData({ total, weeks: recentWeeks });
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
        setGithubData({ total: 0, weeks: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, [githubUsername]);

  const renderMonthLabels = () => {
    if (!githubData?.weeks) return null;
    const months: { name: string; index: number }[] = [];
    let lastMonth = -1;

    githubData.weeks.forEach((week, index) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      
      if (month !== lastMonth) {
        months.push({ 
          name: date.toLocaleString('default', { month: 'short' }), 
          index 
        });
        lastMonth = month;
      }
    });

    return (
      <div className="flex text-[10px] text-gray-500 mb-2 relative h-4 w-full">
        {months.map((m, i) => (
          <span 
            key={i} 
            className="absolute" 
            style={{ left: `${m.index * 14}px` }} 
          >
            {m.name}
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-hl-cyan border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-mono text-base w-full">
      
      {/* 1. GitHub Activity Card */}
      <a 
        href={`https://github.com/${githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block group w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // ✅ REDUCED PADDING (p-6) & SPACING (space-y-4)
          className="w-full space-y-4 rounded-xl border border-white/10 bg-hl-panel/40 p-6 transition-all hover:border-green-500/50 hover:bg-hl-panel/60 hover:shadow-xl hover:shadow-green-500/10"
        >
          {/* Header - REDUCED BOTTOM PADDING (pb-3) */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <GitBranch className="h-5 w-5" />
              </div>
              <span className="text-gray-200 group-hover:text-green-400 transition-colors font-bold text-base tracking-wide">
                GitHub Activity
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-white">{githubData?.total}</span>
              <span className="text-xs text-hl-muted ml-2">Contributions</span>
            </div>
          </div>

          {/* Graph Container */}
          <div className="rounded-lg border border-white/5 bg-[#0d1117] p-4 opacity-90 group-hover:opacity-100 transition-opacity w-full overflow-hidden">
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="flex flex-col min-w-max"> 
                <div className="pl-8 w-full">
                  {renderMonthLabels()}
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col justify-between text-[9px] text-gray-500 pt-2 pb-1 h-[88px]">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>
                  
                  <div className="flex gap-[3px]">
                    {githubData?.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                          const day = week.find(d => new Date(d.date).getDay() === dayIndex);
                          return (
                            <div
                              key={dayIndex}
                              className="w-[11px] h-[11px] rounded-[2px] border border-white/[0.02]"
                              style={{
                                backgroundColor: day ? getContributionColor(day.level) : '#161b22'
                              }}
                              title={day ? `${day.count} contributions on ${day.date}` : 'No contributions'}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-gray-500 px-2">
              <span className="mr-1">Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-[10px] h-[10px] rounded-[2px] border border-white/[0.05]"
                  style={{ backgroundColor: getContributionColor(level) }}
                />
              ))}
              <span className="ml-1">More</span>
            </div>
          </div>

          <div className="flex items-center justify-end text-xs text-hl-muted pt-1">
            <span className="flex items-center gap-2 group-hover:text-white transition-colors">
              View Profile <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </motion.div>
      </a>

      {/* 2. Coding Stats Card */}
      <a 
        href={stats.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // ✅ REDUCED PADDING (p-6)
          className={`w-full space-y-4 rounded-xl border border-white/10 bg-hl-panel/40 p-6 transition-all hover:bg-hl-panel/60 hover:shadow-xl ${USE_LEETCODE ? "hover:border-yellow-500/50 hover:shadow-yellow-500/10" : "hover:border-hl-rose/50 hover:shadow-hl-rose/10"}`}
        >
          {/* Header - REDUCED PADDING (pb-3) */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-white/5`}>
                {USE_LEETCODE ? (
                  <Terminal className={`h-5 w-5 ${stats.color}`} />
                ) : (
                  <Code2 className={`h-5 w-5 ${stats.color}`} />
                )}
              </div>
              <span className={`transition-colors font-bold text-base tracking-wide ${USE_LEETCODE ? "text-yellow-500" : "text-hl-rose"}`}>
                {stats.label} Stats
              </span>
            </div>
            <span className="text-xs text-hl-muted">@{USE_LEETCODE ? leetcodeUsername : codolioUsername}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 py-2">
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-hl-cyan" />
                <span className="text-[10px] text-hl-muted uppercase tracking-wider">Solved</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>

            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Award className={`h-4 w-4 ${stats.color}`} />
                <span className="text-[10px] text-hl-muted uppercase tracking-wider">Rank</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.awards}</p>
            </div>
          </div>

           {/* Progress Bar */}
           <div className="space-y-3 pt-1">
             <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/5">
                <div className="bg-hl-moss" style={{ width: `${(stats.easy/stats.total)*100}%` }} />
                <div className="bg-hl-cyan" style={{ width: `${(stats.medium/stats.total)*100}%` }} />
                <div className={stats.barColor} style={{ width: `${(stats.hard/stats.total)*100}%` }} />
             </div>
             <div className="flex justify-between text-xs font-medium opacity-90 px-1">
               <span className="text-hl-moss">Easy: {stats.easy}</span>
               <span className="text-hl-cyan">Med: {stats.medium}</span>
               <span className={stats.color}>Hard: {stats.hard}</span>
             </div>
           </div>
        </motion.div>
      </a>
    </div>
  );
}