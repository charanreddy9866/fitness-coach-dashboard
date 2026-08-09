import React, { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Progress({ user, supabase }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgressData();
    }
  }, [user]);

  const fetchProgressData = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

      const { data: allWorkouts } = await supabase
        .from('rep_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('logged_at', thirtyDaysAgoStr);

      if (allWorkouts) {
        const dayMap = {};
        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          dayMap[dateStr] = { date: dateStr, volume: 0, workoutCount: 0, exercises: new Set() };
        }

        let totalVolume = 0;
        let maxDay = 0;
        let workoutDays = 0;

        allWorkouts.forEach(log => {
          const date = log.logged_at.split('T')[0];
          if (dayMap.hasOwnProperty(date)) {
            const volume = log.sets_completed * log.reps_per_set * (log.weight || 0);
            dayMap[date].volume += volume;
            dayMap[date].workoutCount++;
            dayMap[date].exercises.add(log.exercise_name);
            totalVolume += volume;
            if (dayMap[date].volume > maxDay) maxDay = dayMap[date].volume;
            if (dayMap[date].volume > 0) workoutDays++;
          }
        });

        const chartData = Object.values(dayMap).map(day => ({
          date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          volume: day.volume,
          workoutCount: day.workoutCount,
        }));

        setMonthlyData(chartData);
        setStats({
          totalVolume: Math.round(totalVolume),
          maxDay: Math.round(maxDay),
          workoutDays: workoutDays,
          avgPerDay: Math.round(totalVolume / workoutDays) || 0,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-white text-center">Loading progress...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">📈 Progress Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-600 p-6 rounded-lg">
          <div className="text-gray-200 text-sm mb-2">30-Day Total</div>
          <div className="text-4xl font-bold">{stats?.totalVolume || 0} lbs</div>
        </div>
        <div className="bg-purple-600 p-6 rounded-lg">
          <div className="text-gray-200 text-sm mb-2">Best Day</div>
          <div className="text-4xl font-bold">{stats?.maxDay || 0} lbs</div>
        </div>
        <div className="bg-green-600 p-6 rounded-lg">
          <div className="text-gray-200 text-sm mb-2">Workout Days</div>
          <div className="text-4xl font-bold">{stats?.workoutDays || 0}</div>
        </div>
        <div className="bg-orange-600 p-6 rounded-lg">
          <div className="text-gray-200 text-sm mb-2">Average/Day</div>
          <div className="text-4xl font-bold">{stats?.avgPerDay || 0} lbs</div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Volume Trend (Last 30 Days)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} formatter={(value) => `${value} lbs`} />
            <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8">
        <h2 className="text-2xl font-bold mb-4">💡 Insights</h2>
        <div className="space-y-3">
          {stats?.workoutDays > 20 && (
            <div className="p-3 bg-green-900 text-green-200 rounded">
              ✅ Excellent consistency! You've worked out {stats.workoutDays} days this month.
            </div>
          )}
          {stats?.totalVolume > 100000 && (
            <div className="p-3 bg-blue-900 text-blue-200 rounded">
              🏆 Outstanding volume! You've lifted {Math.round(stats.totalVolume / 1000)}k lbs total.
            </div>
          )}
          {stats?.avgPerDay > 5000 && (
            <div className="p-3 bg-purple-900 text-purple-200 rounded">
              💪 Great average! You're averaging {stats.avgPerDay} lbs per workout day.
            </div>
          )}
          <div className="p-3 bg-gray-700 text-gray-200 rounded">
            📊 Keep tracking to see your progress over time. Consistency is key!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
