import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard({ user, supabase }) {
  const [stats, setStats] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data: todayWorkouts } = await supabase
        .from('rep_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('logged_at', today);

      const { data: todayMeals } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', user.id)
        .eq('meal_date', today);

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

      const { data: weekWorkouts } = await supabase
        .from('rep_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('logged_at', sevenDaysAgoStr);

      let totalVolume = 0;
      let workoutCount = new Set();
      if (todayWorkouts) {
        todayWorkouts.forEach(log => {
          totalVolume += log.sets_completed * log.reps_per_set * (log.weight || 0);
          workoutCount.add(log.exercise_name);
        });
      }

      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      if (todayMeals) {
        todayMeals.forEach(meal => {
          totalCalories += meal.calories || 0;
          totalProtein += meal.protein || 0;
          totalCarbs += meal.carbs || 0;
          totalFats += meal.fats || 0;
        });
      }

      setStats({
        volume: Math.round(totalVolume),
        exercisesLogged: workoutCount.size,
        workoutCount: todayWorkouts?.length || 0,
        streak: user.current_streak || 0,
      });

      setNutrition({
        calories: Math.round(totalCalories),
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fats: Math.round(totalFats),
        mealCount: todayMeals?.length || 0,
      });

      if (weekWorkouts && weekWorkouts.length > 0) {
        const dayMap = {};
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          dayMap[dateStr] = 0;
        }

        weekWorkouts.forEach(log => {
          const date = log.logged_at.split('T')[0];
          if (dayMap.hasOwnProperty(date)) {
            dayMap[date] += log.sets_completed * log.reps_per_set * (log.weight || 0);
          }
        });

        const chartData = Object.entries(dayMap).map(([date, volume]) => ({
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          volume: Math.round(volume),
        }));

        setWeeklyData(chartData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-white text-center">Loading dashboard...</div>;
  }

  const nutritionChartData = [
    { name: 'Protein', value: nutrition?.protein || 0, color: '#3b82f6' },
    { name: 'Carbs', value: nutrition?.carbs || 0, color: '#10b981' },
    { name: 'Fats', value: nutrition?.fats || 0, color: '#f59e0b' },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Welcome back, {user?.username}! 💪
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Today's Volume" value={stats?.volume || 0} unit="lbs" icon="📊" color="bg-blue-600" />
        <StatCard title="Exercises" value={stats?.exercisesLogged || 0} unit="logged" icon="💪" color="bg-purple-600" />
        <StatCard title="Current Streak" value={stats?.streak || 0} unit="days 🔥" icon="🔥" color="bg-red-600" />
        <StatCard title="Calories" value={nutrition?.calories || 0} unit="kcal" icon="🥗" color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">📈 Weekly Volume Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              <Bar dataKey="volume" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">🥗 Today's Macros</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={nutritionChartData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="value">
                {nutritionChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 mt-4">
            {nutritionChartData.map(item => (
              <div key={item.name} className="text-center">
                <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }}></div>
                <div className="text-sm">{item.name}: {item.value}g</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8">
        <h2 className="text-2xl font-bold mb-4">🍽️ Nutrition Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="text-3xl font-bold text-blue-400">{nutrition?.calories || 0}</div>
            <div className="text-gray-400">Calories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-500">{nutrition?.protein || 0}g</div>
            <div className="text-gray-400">Protein</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-500">{nutrition?.carbs || 0}g</div>
            <div className="text-gray-400">Carbs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-500">{nutrition?.fats || 0}g</div>
            <div className="text-gray-400">Fats</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">{nutrition?.mealCount || 0}</div>
            <div className="text-gray-400">Meals</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, icon, color }) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-xl`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-gray-200 text-sm">{title}</div>
      <div className="text-4xl font-bold">{value}<span className="text-lg ml-1">{unit}</span></div>
    </div>
  );
}

export default Dashboard;
