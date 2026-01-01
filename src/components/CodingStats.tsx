import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GitBranch, Code2, Target, ExternalLink, Terminal, Activity, ChevronRight, ChevronLeft } from "lucide-react";

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
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const scrollRef = useRef<HTMLDivElement>(null);

  const USE_LEETCODE = false;
  const githubUsername = "sumitahmed";
  const codolioUsername = "SumitKun";
  const leetcodeUsername = "sumitahmed";

  const codolioData = {
    total: 144, activeDays: 33, easy: 66, medium: 9, hard: 1,
    label: "Codolio", color: "text-hl-rose", barColor: "bg-hl-rose",
    link: `https://codolio.com/profile/${codolioUsername}`,
  };

  const leetcodeData = {
    total: 15, activeDays: 0, easy: 10, medium: 5, hard: 0,
    label: "LeetCode", color: "text-yellow-500", barColor: "bg-yellow-500",
    link: `https://leetcode.com/${leetcodeUsername}`,
  };

  const stats = USE_LEETCODE ? leetcodeData : codolioData;

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return 'var(--bg-card)';
      case 1: return '#0e4429'; 
      case 2: return '#006d32'; 
      case 3: return '#26a641'; 
      case 4: return '#39d353'; 
      default: return 'var(--bg-card)';
    }
  };

  useEffect(() => {
    async function fetchContributions() {
      setLoading(true);
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=${selectedYear}`);
        const data = await response.json();
        
        // 1. Create a Map of the API data for fast lookup
        const contributionMap = new Map<string, { count: number, level: number }>();
        if (data?.contributions) {
            data.contributions.forEach((d: any) => {
                contributionMap.set(d.date, { count: d.count, level: d.level });
            });
        }

        // 2. Generate a FULL YEAR calendar (Jan 1 - Dec 31)
        const weeks: ContributionDay[][] = [];
        let currentWeek: ContributionDay[] = [];
        
        // Start from Jan 1st of selected year
        const startDate = new Date(selectedYear, 0, 1);
        const endDate = new Date(selectedYear, 11, 31);

        // Align start to Sunday (pad with empty days if Jan 1 is not Sunday)
        const startDayOfWeek = startDate.getDay(); 
        for (let i = 0; i < startDayOfWeek; i++) {
            currentWeek.push({ date: "", count: 0, level: 0 });
        }

        // Loop through every day of the year
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const contribution = contributionMap.get(dateStr) || { count: 0, level: 0 };
            
            currentWeek.push({
                date: dateStr,
                count: contribution.count,
                level: contribution.level
            });

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        // Push last week if incomplete
        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push({ date: "", count: 0, level: 0 });
            }
            weeks.push(currentWeek);
        }

        const total = data?.total?.[selectedYear] || 
                      (data?.contributions || []).reduce((acc: number, curr: any) => acc + curr.count, 0);

        setGithubData({ total, weeks });

      } catch (error) {
        setGithubData({ total: 0, weeks: [] });
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
  }, [githubUsername, selectedYear]);

  // Labels based on the generated weeks
  const renderMonthLabels = () => {
    if (!githubData?.weeks) return null;
    const months: { name: string; index: number }[] = [];
    
    githubData.weeks.forEach((week, weekIndex) => {
        const firstValidDay = week.find(d => d.date !== "");
        if (!firstValidDay) return;
        
        const date = new Date(firstValidDay.date);
        const month = date.toLocaleString('default', { month: 'short' });
        
        // Only add label if it's the first time we see this month
        if (!months.some(m => m.name === month)) {
            months.push({ name: month, index: weekIndex });
        }
    });

    return (
      <div className="flex text-[10px] text-hl-muted mb-2 relative h-4 w-full select-none">
        {months.map((m, i) => (
          <span 
            key={i} 
            className="absolute font-medium" 
            style={{ left: `${m.index * 13}px` }} 
          >
            {m.name}
          </span>
        ))}
      </div>
    );
  };

  const years = [2026, 2025, 2024, 2023]; 

  if (loading) {
    return (
      <div className="flex h-32 md:h-40 items-center justify-center">
        <div className="h-6 w-6 md:h-8 md:w-8 animate-spin rounded-full border-4 border-hl-cyan border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 font-mono text-sm md:text-base w-full">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full space-y-3 md:space-y-4 rounded-xl border border-hl-border bg-hl-panel p-4 md:p-6 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between border-b border-hl-border pb-3 gap-2">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <GitBranch className="h-5 w-5" />
                </div>
                <span className="text-hl-text font-bold tracking-wide">
                    {githubData?.total} contributions in {selectedYear}
                </span>
            </div>
            
            <div className="flex gap-1">
                {years.map(year => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3 py-1 text-xs rounded-md transition-all ${
                            selectedYear === year 
                            ? "bg-hl-cyan text-hl-bg font-bold shadow-[0_0_10px_rgba(56,189,248,0.4)]" 
                            : "text-hl-muted hover:bg-hl-card hover:text-hl-text"
                        }`}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>

        {/* ✅ SMOOTH SCROLL CONTAINER 
           - 'overflow-x-auto': Enables native swipe scroll
           - 'scrollbar-none': Hides ugly bars (requires tailwind plugin or css)
           - Mask Image: Fades the right edge to hint at more content
        */}
        <div className="relative group">
            <div 
                ref={scrollRef}
                className="overflow-x-auto pb-4 scroll-smooth w-full"
                // Adding a subtle mask to show scrolling is possible
                style={{ maskImage: 'linear-gradient(to right, black 90%, transparent 100%)' }}
            >
                <div className="flex flex-col min-w-max pr-8"> 
                  <div className="pl-8 w-full">
                    {renderMonthLabels()}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col justify-between text-[9px] text-hl-muted pt-2 pb-1 h-[88px] sticky left-0 bg-hl-panel z-10 pr-2">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>
                    
                    <div className="flex gap-[3px]">
                      {githubData?.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                          {week.map((day, dayIndex) => (
                            day.date === "" ? (
                                <div key={dayIndex} className="w-[10px] h-[10px]" />
                            ) : (
                                <div
                                  key={dayIndex}
                                  className="w-[10px] h-[10px] rounded-[2px] transition-all hover:scale-125 hover:z-20 relative"
                                  style={{
                                    backgroundColor: getContributionColor(day.level)
                                  }}
                                  title={`${day.count} contributions on ${day.date}`}
                                />
                            )
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
            
            {/* Scroll Hints (Optional: Show arrow if scrolled) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-hl-cyan opacity-0 group-hover:opacity-50 transition-opacity md:hidden">
                <ChevronRight className="w-6 h-6 animate-pulse" />
            </div>
        </div>
        
        <div className="flex items-center justify-between text-[10px] text-hl-muted pt-2 border-t border-hl-border/50">
             <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="hover:text-hl-cyan transition-colors flex items-center gap-1">
                View on GitHub <ExternalLink className="w-3 h-3"/>
             </a>
             <div className="flex items-center gap-1">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(l => (
                    <div key={l} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: getContributionColor(l) }} />
                ))}
                <span>More</span>
             </div>
        </div>
      </motion.div>

      {/* Codolio Stats Card */}
      <a href={stats.link} target="_blank" rel="noopener noreferrer" className="block group w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`w-full space-y-4 rounded-xl border border-hl-border bg-hl-panel p-6 transition-all hover:shadow-lg ${USE_LEETCODE ? "hover:border-yellow-500/50 hover:shadow-yellow-500/10" : "hover:border-hl-rose/50 hover:shadow-hl-rose/10"}`}
        >
          <div className="flex items-center justify-between border-b border-hl-border pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-hl-card`}>
                {USE_LEETCODE ? <Terminal className={`h-5 w-5 ${stats.color}`} /> : <Code2 className={`h-5 w-5 ${stats.color}`} />}
              </div>
              <span className={`font-bold tracking-wide ${stats.color}`}>
                {stats.label} Stats
              </span>
            </div>
            <span className="text-xs text-hl-muted">@{USE_LEETCODE ? leetcodeUsername : codolioUsername}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 py-2">
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-hl-cyan" />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Solved</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{stats.total}</p>
            </div>
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Activity className={`h-4 w-4 ${stats.color}`} />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Active Days</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{stats.activeDays}</p>
            </div>
          </div>

           <div className="space-y-3 pt-1">
             <div className="flex h-3 w-full overflow-hidden rounded-full bg-hl-card border border-hl-border/20">
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