import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Nutrition({ user, supabase }) {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [goals, setGoals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNutritionData();
    }
  }, [user]);

  const fetchNutritionData = async () => {
    try {
      // FIXED: First get the user record using discord_id
      const { data: userRecord } = await supabase
        .from('users')
        .select('id, daily_protein_goal, daily_carbs_goal, daily_fats_goal')
        .eq('discord_id', user.id)
        .single();

      if (!userRecord) {
        throw new Error('User not found');
      }

      setGoals({
        protein: userRecord?.daily_protein_goal || 150,
        carbs: userRecord?.daily_carbs_goal || 200,
        fats: userRecord?.daily_fats_goal || 50,
      });

      const today = new Date().toISOString().split('T')[0];
      // FIXED: Now use userRecord.id (Supabase UUID) instead of user.id (Discord ID)
      const { data: todayMeals } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userRecord.id)
        .eq('meal_date', today);

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

      setDailyData({
        calories: Math.round(totalCalories),
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fats: Math.round(totalFats),
        meals: todayMeals || [],
      });

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

      // FIXED: Use userRecord.id instead of user.id
      const { data: weekMeals } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userRecord.id)
        .gte('meal_date', sevenDaysAgoStr);

      if (weekMeals) {
        const dayMap = {};
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          dayMap[dateStr] = { date: dateStr, calories: 0, protein: 0 };
        }

        weekMeals.forEach(meal => {
          const date = meal.meal_date;
          if (dayMap.hasOwnProperty(date)) {
            dayMap[date].calories += meal.calories || 0;
            dayMap[date].protein += meal.protein || 0;
          }
        });

        const chartData = Object.values(dayMap).map(day => ({
          date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          calories: Math.round(day.calories),
          protein: Math.round(day.protein),
        }));

        setWeeklyData(chartData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-white text-center">Loading nutrition data...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">🥗 Nutrition Tracker</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">Today's Intake</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MacroCard label="Calories" value={dailyData?.calories || 0} goal={2500} unit="kcal" color="blue" />
          <MacroCard label="Protein" value={dailyData?.protein || 0} goal={goals?.protein || 150} unit="g" color="green" />
          <MacroCard label="Carbs" value={dailyData?.carbs || 0} goal={goals?.carbs || 200} unit="g" color="yellow" />
          <MacroCard label="Fats" value={dailyData?.fats || 0} goal={goals?.fats || 50} unit="g" color="orange" />
        </div>

        {dailyData?.meals && dailyData.meals.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold mb-4">Meals Logged</h3>
            <div className="space-y-2">
              {dailyData.meals.map((meal, idx) => (
                <div key={idx} className="bg-gray-700 p-3 rounded flex justify-between">
                  <span>{meal.food_name}</span>
                  <span className="text-gray-300">{meal.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-400">No meals logged today yet.</div>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Weekly Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="protein" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8">
        <h2 className="text-2xl font-bold mb-4">💡 Nutrition Tips</h2>
        <ul className="space-y-2 text-gray-300">
          <li>✅ Aim for {goals?.protein || 150}g of protein daily for muscle recovery</li>
          <li>✅ Balance your macros: {goals?.carbs || 200}g carbs, {goals?.fats || 50}g fats</li>
          <li>✅ Log meals consistently to track trends</li>
          <li>✅ Hydration is key - drink plenty of water!</li>
        </ul>
      </div>
    </div>
  );
}

function MacroCard({ label, value, goal, unit, color }) {
  const percentage = Math.round((value / goal) * 100);
  const colors = { blue: 'bg-blue-600', green: 'bg-green-600', yellow: 'bg-yellow-600', orange: 'bg-orange-600' };

  return (
    <div className={`${colors[color]} p-4 rounded-lg`}>
      <div className="text-gray-200 text-sm mb-2">{label}</div>
      <div className="text-3xl font-bold">{value}<span className="text-lg text-gray-300">/{goal}</span></div>
      <div className="text-xs text-gray-300 mt-1">{unit}</div>
      <div className="w-full bg-gray-800 rounded h-2 mt-2">
        <div className="bg-white h-2 rounded" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
      </div>
      <div className="text-xs text-gray-300 mt-1">{percentage}% of goal</div>
    </div>
  );
}

export default Nutrition;
