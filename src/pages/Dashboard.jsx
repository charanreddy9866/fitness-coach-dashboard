import { useCallback, useEffect, useState } from 'react';

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n) {
  const d = startOfToday();
  d.setDate(d.getDate() - n);
  return d;
}

function Dashboard({ user, supabase }) {
  const [stats, setStats] = useState({
    workoutsThisWeek: 0,
    minutesThisWeek: 0,
    caloriesToday: 0,
    proteinToday: 0,
  });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    try {
      const { data: userRecord, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('discord_id', user.id)
        .maybeSingle();

      if (userError) throw userError;
      if (!userRecord) {
        setLoading(false);
        return;
      }

      const weekStart = daysAgo(6).toISOString();
      const todayStart = startOfToday().toISOString();

      const [workoutsRes, mealsRes] = await Promise.all([
        supabase
          .from('workouts')
          .select('*')
          .eq('user_id', userRecord.id)
          .gte('created_at', weekStart)
          .order('created_at', { ascending: false }),
        supabase
          .from('meals')
          .select('calories, protein')
          .eq('user_id', userRecord.id)
          .gte('created_at', todayStart),
      ]);

      if (workoutsRes.error) throw workoutsRes.error;
      if (mealsRes.error) throw mealsRes.error;

      const workouts = workoutsRes.data || [];
      const meals = mealsRes.data || [];

      setStats({
        workoutsThisWeek: workouts.length,
        minutesThisWeek: workouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0),
        caloriesToday: Math.round(meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0)),
        proteinToday: Math.round(meals.reduce((sum, m) => sum + (Number(m.protein) || 0), 0)),
      });
      setRecentWorkouts(workouts.slice(0, 5));
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Could not load your dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [supabase, user.id]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) {
    return <div className="p-8 text-glow-cyan">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold text-glow-cyan mb-2">🏠 Dashboard</h1>
      <p className="text-neon-cyan mb-8">
        Welcome back, <span className="text-glow-lime">{user.username}</span>
      </p>

      {error && (
        <div className="neon-card border-neon-magenta p-4 mb-8 text-neon-magenta">{error}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Workouts (7 days)" value={stats.workoutsThisWeek} border="border-neon-cyan" text="text-neon-cyan" />
        <StatCard label="Minutes (7 days)" value={stats.minutesThisWeek} border="border-neon-magenta" text="text-neon-magenta" />
        <StatCard label="Calories today" value={stats.caloriesToday} border="border-neon-lime" text="text-neon-lime" />
        <StatCard label="Protein today (g)" value={stats.proteinToday} border="border-neon-yellow" text="text-neon-yellow" />
      </div>

      <div className="neon-card border-neon-cyan p-8">
        <h2 className="text-2xl font-bold text-glow-magenta mb-4">Recent Workouts</h2>
        {recentWorkouts.length > 0 ? (
          <div className="space-y-4">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="neon-card border-neon-lime p-4 flex justify-between">
                <div>
                  <p className="text-neon-lime font-bold">{workout.name}</p>
                  <p className="text-neon-cyan text-sm">
                    {new Date(workout.created_at).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <p className="text-neon-cyan">{workout.duration} min</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neon-cyan">
            No workouts in the last 7 days. Log one with the Discord bot to see it here.
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, border, text }) {
  return (
    <div className={`neon-card ${border} p-4`}>
      <p className={`${text} text-xs uppercase tracking-widest mb-2`}>{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export default Dashboard;
