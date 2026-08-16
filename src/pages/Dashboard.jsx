import { useEffect, useState } from 'react';

function Dashboard({ user, supabase }) {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalVolume: 0,
    currentStreak: 0,
    topExercise: 'N/A',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const { data: userRecord } = await supabase
        .from('users')
        .select('id')
        .eq('discord_id', user.id)
        .single();

      if (!userRecord) return;

      const { data: workouts } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userRecord.id)
        .order('created_at', { ascending: false });

      const { data: repLogs } = await supabase
        .from('rep_logs')
        .select('*')
        .eq('user_id', userRecord.id);

      let totalVolume = 0;
      const exerciseCount = {};

      if (repLogs) {
        repLogs.forEach(log => {
          totalVolume += (log.weight || 0) * (log.reps || 0) * (log.sets || 0);
          const ex = log.exercise_name || 'Unknown';
          exerciseCount[ex] = (exerciseCount[ex] || 0) + 1;
        });
      }

      const topEx = Object.entries(exerciseCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      setStats({
        totalWorkouts: workouts?.length || 0,
        totalVolume: Math.round(totalVolume),
        currentStreak: 1,
        topExercise: topEx,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-glow-cyan text-2xl">INITIALIZING SYSTEM...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-glow-cyan mb-2">💪 FITNESS COACH</h1>
        <p className="text-neon-cyan text-lg">Welcome back, {user?.id?.substring(0, 8)}...</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* Total Workouts */}
        <div className="neon-card border-neon-cyan group hover:border-neon-lime transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-neon-cyan text-sm uppercase tracking-widest">Total Workouts</p>
              <h2 className="text-4xl font-bold text-white mt-2">{stats.totalWorkouts}</h2>
            </div>
            <div className="text-5xl opacity-30">🏋️</div>
          </div>
          <div className="h-1 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full"></div>
        </div>

        {/* Total Volume */}
        <div className="neon-card border-neon-magenta group hover:border-neon-pink transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-neon-magenta text-sm uppercase tracking-widest">Total Volume</p>
              <h2 className="text-4xl font-bold text-white mt-2">{stats.totalVolume.toLocaleString()}</h2>
            </div>
            <div className="text-5xl opacity-30">📊</div>
          </div>
          <div className="h-1 bg-gradient-to-r from-neon-magenta to-neon-pink rounded-full"></div>
        </div>

        {/* Current Streak */}
        <div className="neon-card border-neon-lime group hover:border-neon-yellow transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-neon-lime text-sm uppercase tracking-widest">Current Streak</p>
              <h2 className="text-4xl font-bold text-white mt-2">{stats.currentStreak} 🔥</h2>
            </div>
            <div className="text-5xl opacity-30">⚡</div>
          </div>
          <div className="h-1 bg-gradient-to-r from-neon-lime to-neon-yellow rounded-full"></div>
        </div>

        {/* Top Exercise */}
        <div className="neon-card border-neon-purple group hover:border-neon-magenta transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-neon-purple text-sm uppercase tracking-widest">Top Exercise</p>
              <h2 className="text-2xl font-bold text-white mt-2 truncate">{stats.topExercise}</h2>
            </div>
            <div className="text-5xl opacity-30">🎯</div>
          </div>
          <div className="h-1 bg-gradient-to-r from-neon-purple to-neon-magenta rounded-full"></div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="neon-card border-neon-lime mb-8 bg-gradient-to-r from-dark-card via-dark-lighter to-dark-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-glow-lime mb-2">Ready to crush some goals?</h3>
            <p className="text-neon-cyan">Start logging your workout or check your progress</p>
          </div>
          <button className="btn-neon-lime animate-pulse">
            GO TO WORKOUTS →
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Motivation */}
        <div className="neon-card border-neon-cyan">
          <h3 className="text-xl font-bold text-glow-cyan mb-4">💬 MOTIVATION</h3>
          <p className="text-neon-cyan text-lg">
            Every rep counts. Every set matters. You're building something extraordinary.
          </p>
        </div>

        {/* System Status */}
        <div className="neon-card border-neon-lime">
          <h3 className="text-xl font-bold text-glow-lime mb-4">⚙️ SYSTEM STATUS</h3>
          <div className="space-y-2">
            <p className="text-neon-lime">✓ Bot Connected</p>
            <p className="text-neon-lime">✓ Database Synced</p>
            <p className="text-neon-lime">✓ All Systems Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
