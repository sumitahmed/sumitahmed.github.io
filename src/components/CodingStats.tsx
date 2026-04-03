import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GitBranch, Code2, Target, ExternalLink, Terminal, Activity, ChevronRight, Trophy, Flame, Medal } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubData {
  total: number;
  weeks: ContributionDay[][];
}

interface LeetCodeStats {
  total: number;
  activeDays: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
  contestRating: number;
  contests: number;
  streak: number;
  badgesCount: number;
  latestBadgeName: string;
  latestBadgeIcon: string;
}

export function CodingStats() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [leetcodeSyncStatus, setLeetcodeSyncStatus] = useState<"syncing" | "live" | "cached">("syncing");
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const scrollRef = useRef<HTMLDivElement>(null);

  const githubUsername = "sumitahmed";
  const codolioUsername = "SumitKun";
  const leetcodeUsername = "sumitkun";

  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats>({
    total: 112,
    activeDays: 91,
    easy: 71,
    medium: 34,
    hard: 7,
    ranking: 1358531,
    contestRating: 1455,
    contests: 2,
    streak: 60,
    badgesCount: 2,
    latestBadgeName: "50 Days Badge 2026",
    latestBadgeIcon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png",
  });

  // Hardcoded Codolio snapshot (as requested)
  const codolioData = {
    total: 208,
    activeDays: 129,
    easy: 146,
    medium: 52,
    hard: 10,
    label: "Codolio", color: "text-hl-rose", barColor: "bg-hl-rose",
    link: `https://codolio.com/profile/${codolioUsername}`,
  };

  const leetcodeMeta = {
    label: "LeetCode",
    color: "text-yellow-500",
    barColor: "bg-yellow-500",
    link: `https://leetcode.com/u/${leetcodeUsername}`,
  };

  const leetcodeBarTotal = Math.max(1, leetcodeData.easy + leetcodeData.medium + leetcodeData.hard);
  const codolioBarTotal = Math.max(1, codolioData.easy + codolioData.medium + codolioData.hard);

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
        
        const contributionMap = new Map<string, { count: number, level: number }>();
        if (data?.contributions) {
            data.contributions.forEach((d: any) => {
                contributionMap.set(d.date, { count: d.count, level: d.level });
            });
        }

        const weeks: ContributionDay[][] = [];
        let currentWeek: ContributionDay[] = [];
        
        const startDate = new Date(selectedYear, 0, 1);
        const endDate = new Date(selectedYear, 11, 31);

        const startDayOfWeek = startDate.getDay(); 
        for (let i = 0; i < startDayOfWeek; i++) {
            currentWeek.push({ date: "", count: 0, level: 0 });
        }

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

  useEffect(() => {
    let isMounted = true;
    const CACHE_KEY = `leetcode_live_stats_${leetcodeUsername}`;

    const hydrateFromCache = () => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return;
        const cached = JSON.parse(raw) as LeetCodeStats;
        setLeetcodeData(cached);
        setLeetcodeSyncStatus("cached");
      } catch {
        // ignore bad cache payloads
      }
    };

    hydrateFromCache();

    const fetchLeetCodeStats = async (retries = 1): Promise<void> => {
      try {
        setLeetcodeSyncStatus("syncing");
        const [profileRes, contestRes, badgesRes, calendarRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/profile`),
          fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/contest`),
          fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/badges`),
          fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/calendar`),
        ]);

        if (!profileRes.ok || !contestRes.ok || !badgesRes.ok || !calendarRes.ok) {
          throw new Error("LeetCode API request failed");
        }

        const profile = await profileRes.json();
        const contest = await contestRes.json();
        const badges = await badgesRes.json();
        const calendar = await calendarRes.json();

        const badgeIconRaw = badges?.activeBadge?.icon || badges?.badges?.[0]?.icon || "";
        const normalizedBadgeIcon = badgeIconRaw
          ? (badgeIconRaw.startsWith("http") ? badgeIconRaw : `https://leetcode.com${badgeIconRaw}`)
          : "";

        const normalizedStats: LeetCodeStats = {
          total: profile?.totalSolved ?? 0,
          activeDays: calendar?.totalActiveDays ?? 0,
          easy: profile?.easySolved ?? 0,
          medium: profile?.mediumSolved ?? 0,
          hard: profile?.hardSolved ?? 0,
          ranking: profile?.ranking ?? 0,
          contestRating: Math.round(contest?.contestRating ?? 0),
          contests: contest?.contestAttend ?? 0,
          streak: calendar?.streak ?? 0,
          badgesCount: badges?.badgesCount ?? 0,
          latestBadgeName: badges?.activeBadge?.displayName || badges?.badges?.[0]?.displayName || "No badge yet",
          latestBadgeIcon: normalizedBadgeIcon,
        };

        if (!isMounted) return;

        setLeetcodeData(normalizedStats);
        setLeetcodeSyncStatus("live");
        localStorage.setItem(CACHE_KEY, JSON.stringify(normalizedStats));
      } catch {
        if (retries > 0) {
          await fetchLeetCodeStats(retries - 1);
          return;
        }
        if (isMounted) setLeetcodeSyncStatus("cached");
      } finally {
        if (isMounted) setLeetcodeLoading(false);
      }
    };

    fetchLeetCodeStats();
    const interval = setInterval(fetchLeetCodeStats, 1000 * 60 * 10);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [leetcodeUsername]);

  const renderMonthLabels = () => {
    if (!githubData?.weeks) return null;
    const months: { name: string; index: number }[] = [];
    
    githubData.weeks.forEach((week, weekIndex) => {
        const firstValidDay = week.find(d => d.date !== "");
        if (!firstValidDay) return;
        
        const date = new Date(firstValidDay.date);
        const month = date.toLocaleString('default', { month: 'short' });
        
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

        {/* ✅ SMOOTH SCROLL CONTAINER */}
        <div className="relative group">
            <div 
                ref={scrollRef}
                className="overflow-x-auto pb-4 scroll-smooth w-full"
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

      {/* LeetCode Stats Card */}
      <a href={leetcodeMeta.link} target="_blank" rel="noopener noreferrer" className="block group w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full space-y-4 rounded-xl border border-hl-border bg-hl-panel p-6 transition-all hover:shadow-lg hover:border-yellow-500/50 hover:shadow-yellow-500/10"
        >
          <div className="flex items-center justify-between border-b border-hl-border pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-hl-card">
                <Terminal className={`h-5 w-5 ${leetcodeMeta.color}`} />
              </div>
              <span className={`font-bold tracking-wide ${leetcodeMeta.color}`}>
                {leetcodeMeta.label} Stats
              </span>
            </div>
            <span className="text-xs text-hl-muted">
              @{leetcodeUsername} {leetcodeSyncStatus === "syncing" ? "(syncing...)" : leetcodeSyncStatus === "cached" ? "(cached)" : "(live)"}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-1">
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-hl-cyan" />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Solved</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{leetcodeData.total}</p>
            </div>
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className={`h-4 w-4 ${leetcodeMeta.color}`} />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Rating</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{leetcodeData.contestRating || "-"}</p>
            </div>
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Streak</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{leetcodeData.streak}</p>
            </div>
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-hl-cyan" />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Active Days</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{leetcodeData.activeDays}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Medal className={`h-4 w-4 ${leetcodeMeta.color}`} />
                  <span className="text-[10px] uppercase tracking-wider text-hl-muted">Global Rank</span>
                </div>
                <span className="text-xs text-hl-muted">Contests: {leetcodeData.contests}</span>
              </div>
              <p className="text-2xl font-bold text-hl-text mt-2">
                {leetcodeData.ranking ? `#${leetcodeData.ranking.toLocaleString()}` : "-"}
              </p>
            </div>
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Badges: {leetcodeData.badgesCount}</span>
                {leetcodeData.latestBadgeIcon ? (
                  <img src={leetcodeData.latestBadgeIcon} alt={leetcodeData.latestBadgeName} className="w-10 h-10 object-contain" loading="lazy" />
                ) : null}
              </div>
              <p className="text-sm font-semibold text-hl-text mt-2 truncate" title={leetcodeData.latestBadgeName}>
                {leetcodeData.latestBadgeName}
              </p>
            </div>
          </div>

           <div className="space-y-3 pt-1">
             <div className="flex h-3 w-full overflow-hidden rounded-full bg-hl-card border border-hl-border/20">
                <div className="bg-hl-moss" style={{ width: `${(leetcodeData.easy/leetcodeBarTotal)*100}%` }} />
                <div className="bg-hl-cyan" style={{ width: `${(leetcodeData.medium/leetcodeBarTotal)*100}%` }} />
                <div className={leetcodeMeta.barColor} style={{ width: `${(leetcodeData.hard/leetcodeBarTotal)*100}%` }} />
             </div>
             <div className="flex justify-between text-xs font-medium opacity-90 px-1">
               <span className="text-hl-moss">Easy: {leetcodeData.easy}</span>
               <span className="text-hl-cyan">Med: {leetcodeData.medium}</span>
               <span className={leetcodeMeta.color}>Hard: {leetcodeData.hard}</span>
             </div>
           </div>
        </motion.div>
      </a>

      {/* Codolio Stats Card */}
      <a href={codolioData.link} target="_blank" rel="noopener noreferrer" className="block group w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full space-y-4 rounded-xl border border-hl-border bg-hl-panel p-6 transition-all hover:shadow-lg hover:border-hl-rose/50 hover:shadow-hl-rose/10"
        >
          <div className="flex items-center justify-between border-b border-hl-border pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-hl-card">
                <Code2 className={`h-5 w-5 ${codolioData.color}`} />
              </div>
              <span className={`font-bold tracking-wide ${codolioData.color}`}>
                {codolioData.label} Stats
              </span>
            </div>
            <span className="text-xs text-hl-muted">@{codolioUsername}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 py-2">
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-hl-cyan" />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Solved</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{codolioData.total}</p>
            </div>
            <div className="bg-hl-card rounded-xl p-4 border border-hl-border">
              <div className="flex items-center gap-2 mb-1">
                <Activity className={`h-4 w-4 ${codolioData.color}`} />
                <span className="text-[10px] uppercase tracking-wider text-hl-muted">Active Days</span>
              </div>
              <p className="text-3xl font-bold text-hl-text">{codolioData.activeDays}</p>
            </div>
          </div>

           <div className="space-y-3 pt-1">
             <div className="flex h-3 w-full overflow-hidden rounded-full bg-hl-card border border-hl-border/20">
                <div className="bg-hl-moss" style={{ width: `${(codolioData.easy/codolioBarTotal)*100}%` }} />
                <div className="bg-hl-cyan" style={{ width: `${(codolioData.medium/codolioBarTotal)*100}%` }} />
                <div className={codolioData.barColor} style={{ width: `${(codolioData.hard/codolioBarTotal)*100}%` }} />
             </div>
             <div className="flex justify-between text-xs font-medium opacity-90 px-1">
               <span className="text-hl-moss">Easy: {codolioData.easy}</span>
               <span className="text-hl-cyan">Med: {codolioData.medium}</span>
               <span className={codolioData.color}>Hard: {codolioData.hard}</span>
             </div>
           </div>
        </motion.div>
      </a>
    </div>
  );
}