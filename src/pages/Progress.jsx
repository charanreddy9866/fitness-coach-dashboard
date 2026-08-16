import { useEffect, useState } from 'react';

function Progress({ user, supabase }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data: userRecord } = await supabase
        .from('users')
        .select('id')
        .eq('discord_id', user.id)
        .maybeSingle();

      if (!userRecord) return;

      const { data } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userRecord.id)
        .order('created_at', { ascending: false })
        .limit(10);

      setWorkouts(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-glow-cyan">Loading...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold text-glow-cyan mb-8">📈 Progress</h1>
      <div className="neon-card border-neon-cyan p-8">
        <h2 className="text-2xl font-bold text-glow-magenta mb-4">Recent Workouts</h2>
        {workouts.length > 0 ? (
          <div className="space-y-4">
            {workouts.map((workout, idx) => (
              <div key={idx} className="neon-card border-neon-lime p-4">
                <p className="text-neon-lime font-bold">{workout.name}</p>
                <p className="text-neon-cyan text-sm">{workout.duration} min</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neon-cyan">No workouts yet. Start training!</p>
        )}
      </div>
    </div>
  );
}

export default Progress;
