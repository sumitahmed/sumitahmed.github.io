import { useState, useEffect } from 'react';
import { Code, Music, Gamepad2, Radio } from 'lucide-react';

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Array<{
    name: string;
    type: number;
    details?: string;
    state?: string;
    assets?: {
      large_text?: string;
      small_text?: string;
    };
  }>;
  spotify?: {
    song: string;
    artist: string;
    album: string;
  } | null;
  listening_to_spotify: boolean;
}

export function LiveActivity() {
  const [activity, setActivity] = useState<string>('Loading activity...');
  const [icon, setIcon] = useState<'code' | 'music' | 'game' | 'idle'>('idle');

  // REPLACE THIS WITH YOUR DISCORD USER ID
  const DISCORD_USER_ID = '608572578231091240';

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const data = await response.json();

        if (data.success) {
          const presence: LanyardData = data.data;

          // Priority 1: Spotify
          if (presence.listening_to_spotify && presence.spotify) {
            setActivity(`Listening to ${presence.spotify.song} by ${presence.spotify.artist}`);
            setIcon('music');
            return;
          }

          // Priority 2: Custom activities (VS Code, games, etc.)
          if (presence.activities && presence.activities.length > 0) {
            const mainActivity = presence.activities[0];
            
            // Check for VS Code
            if (mainActivity.name === 'Visual Studio Code') {
              const fileName = mainActivity.details || 'a file';
              setActivity(`Coding: ${fileName}`);
              setIcon('code');
              return;
            }

            // Check for games
            if (mainActivity.type === 0) { // Type 0 = Playing
              setActivity(`Playing ${mainActivity.name}`);
              setIcon('game');
              return;
            }

            // Generic activity
            setActivity(mainActivity.name);
            setIcon('idle');
            return;
          }

          // Fallback: Just online
          setActivity('Online');
          setIcon('idle');
        }
      } catch (error) {
        console.error('Failed to fetch Discord activity:', error);
        setActivity('Offline');
      }
    };

    // Fetch immediately
    fetchActivity();

    // Update every 5 seconds
    const interval = setInterval(fetchActivity, 5000);

    return () => clearInterval(interval);
  }, [DISCORD_USER_ID]);

  const getIcon = () => {
    switch (icon) {
      case 'code':
        return <Code className="w-3 h-3 text-blue-400" />;
      case 'music':
        return <Music className="w-3 h-3 text-green-400" />;
      case 'game':
        return <Gamepad2 className="w-3 h-3 text-purple-400" />;
      default:
        return <Radio className="w-3 h-3 text-yellow-400" />;
    }
  };

  return (
    <div className="flex items-center gap-1.5 animate-in fade-in duration-500">
      {getIcon()}
      <span className="text-hl-muted max-w-xs truncate">{activity}</span>
    </div>
  );
}
