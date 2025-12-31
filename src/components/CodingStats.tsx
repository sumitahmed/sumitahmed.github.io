import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Code2, Target, ExternalLink, Terminal, Activity } from "lucide-react";

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

  const USE_LEETCODE = false;
  const githubUsername = "sumitahmed";
  const codolioUsername = "SumitKun";
  const leetcodeUsername = "sumitahmed";

  // Codolio Data
  const codolioData = {
    total: 144,
    activeDays: 33, 
    easy: 66,
    medium: 9,
    hard: 1,
    label: "Codolio",
    color: "text-hl-rose",
    barColor: "bg-hl-rose",
    link: `https://codolio.com/profile/${codolioUsername}`,
  };

  // LeetCode Data
  const leetcodeData = {
    total: 15,
    activeDays: 0,
    easy: 10,
    medium: 5,
    hard: 0,
    label: "LeetCode",
    color: "text-yellow-500",
    barColor: "bg-yellow-500",
    link: `https://leetcode.com/${leetcodeUsername}`,
  };

  const stats = USE_LEETCODE ? leetcodeData : codolioData;

  // GitHub Colors (Keeping standard green but can be customized)
  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return 'var(--bg-card)'; // Empty squares adapt to theme
      case 1: return '#0e4429'; 
      case 2: return '#006d32'; 
      case 3: return '#26a641'; 
      case 4: return '#39d353'; 
      default: return 'var(--bg-card)';
    }
  };

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        const data = await response.json();
        if (!data?.contributions) throw new Error("No data");

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

        const recentWeeks = processedWeeks.slice(-53); 
        const total = flatDays.reduce((acc, day) => acc + day.count, 0);

        setGithubData({ total, weeks: recentWeeks });
      } catch (error) {
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
      <div className="flex text-[10px] text-hl-muted mb-2 relative h-4 w-full">
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
      <div className="flex h-32 md:h-40 items-center justify-center">
        <div className="h-6 w-6 md:h-8 md:w-8 animate-spin rounded-full border-4 border-hl-cyan border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 font-mono text-sm md:text-base w-full">
      
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
          className="w-full space-y-3 md:space-y-4 rounded-xl border border-hl-border bg-hl-panel p-4 md:p-6 transition-all hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hl-border pb-2 md:pb-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-green-500/10 text-green-500">
                <GitBranch className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-hl-text group-hover:text-green-400 transition-colors font-bold text-sm md:text-base tracking-wide">
                GitHub Activity
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg md:text-xl font-bold text-hl-text">{githubData?.total}</span>
              <span className="text-[10px] md:text-xs text-hl-muted ml-2">Contributions</span>
            </div>
          </div>

          {/* Graph Container */}
          <div className="rounded-lg border border-hl-border bg-hl-bg p-3 md:p-4 opacity-90 group-hover:opacity-100 transition-opacity w-full overflow-hidden">
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-hl-border scrollbar-track-transparent">
              <div className="flex flex-col min-w-max"> 
                <div className="pl-8 w-full">
                  {renderMonthLabels()}
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col justify-between text-[9px] text-hl-muted pt-2 pb-1 h-[88px]">
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
                            // ✅ FIXED: Removed 'border border-hl-border/20' to kill the white boxes
                            <div
                              key={dayIndex}
                              className="w-[11px] h-[11px] rounded-[2px]"
                              style={{
                                backgroundColor: day ? getContributionColor(day.level) : 'var(--bg-card)'
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
          </div>

          <div className="flex items-center justify-end text-[10px] md:text-xs text-hl-muted pt-1">
            <span className="flex items-center gap-2 group-hover:text-hl-text transition-colors">
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
          className={`w-full space-y-3 md:space-y-4 rounded-xl border border-hl-border bg-hl-panel p-4 md:p-6 transition-all hover:shadow-xl ${USE_LEETCODE ? "hover:border-yellow-500/50 hover:shadow-yellow-500/10" : "hover:border-hl-rose/50 hover:shadow-hl-rose/10"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hl-border pb-2 md:pb-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`p-1.5 md:p-2 rounded-lg bg-hl-card`}>
                {USE_LEETCODE ? (
                  <Terminal className={`h-4 w-4 md:h-5 md:w-5 ${stats.color}`} />
                ) : (
                  <Code2 className={`h-4 w-4 md:h-5 md:w-5 ${stats.color}`} />
                )}
              </div>
              <span className={`transition-colors font-bold text-sm md:text-base tracking-wide ${USE_LEETCODE ? "text-yellow-500" : "text-hl-rose"}`}>
                {stats.label} Stats
              </span>
            </div>
            <span className="text-[10px] md:text-xs text-hl-muted">@{USE_LEETCODE ? leetcodeUsername : codolioUsername}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-6 py-1 md:py-2">
            {/* Total Solved */}
            <div className="bg-hl-card rounded-xl p-3 md:p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-3 w-3 md:h-4 md:w-4 text-hl-cyan" />
                <span className="text-[9px] md:text-[10px] text-hl-muted uppercase tracking-wider">Solved</span>
              </div>
              <p className="text-xl md:text-3xl font-bold text-hl-text">{stats.total}</p>
            </div>

            {/* Active Days */}
            <div className="bg-hl-card rounded-xl p-3 md:p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Activity className={`h-3 w-3 md:h-4 md:w-4 ${stats.color}`} />
                <span className="text-[9px] md:text-[10px] text-hl-muted uppercase tracking-wider">Active Days</span>
              </div>
              <p className="text-xl md:text-3xl font-bold text-hl-text">{stats.activeDays}</p>
            </div>
          </div>

           {/* Progress Bar */}
           <div className="space-y-2 md:space-y-3 pt-1">
             <div className="flex h-2.5 md:h-3 w-full overflow-hidden rounded-full bg-hl-card border border-hl-border/20">
                <div className="bg-hl-moss" style={{ width: `${(stats.easy/stats.total)*100}%` }} />
                <div className="bg-hl-cyan" style={{ width: `${(stats.medium/stats.total)*100}%` }} />
                <div className={stats.barColor} style={{ width: `${(stats.hard/stats.total)*100}%` }} />
             </div>
             <div className="flex justify-between text-[10px] md:text-xs font-medium opacity-90 px-1">
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