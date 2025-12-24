import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [aiResult, setAiResult] = useState("");

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  useEffect(() => {
    fetch("/api/habits")
      .then(res => res.json())
      .then(data => setHabits(data || []));
  }, []);

  const saveHabits = async (updated) => {
    setHabits(updated);
    await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;
    const habit = {
      name: newHabit,
      days: Array(daysInMonth).fill(0),
      streak: 0
    };
    saveHabits([...habits, habit]);
    setNewHabit("");
  };

  const toggleDay = (hIndex, dIndex) => {
    const updated = [...habits];
    updated[hIndex].days[dIndex] ^= 1;

    let streak = 0;
    for (let i = updated[hIndex].days.length - 1; i >= 0; i--) {
      if (updated[hIndex].days[i]) streak++;
      else break;
    }
    updated[hIndex].streak = streak;

    saveHabits(updated);
  };

  const getAIAdvice = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goal: "",
        habits: habits.map(h => h.name)
      })
    });
    const data = await res.json();
    setAiResult(data.result);
  };

  if (!session) return null;

  return (
    <div className="container">
      <header>
        <h2>Dashboard</h2>
        <div>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      </header>

      <div className="card">
        <input
          placeholder="Add new habit"
          value={newHabit}
          onChange={e => setNewHabit(e.target.value)}
        />
        <button className="btn" onClick={addHabit}>Add Habit</button>
      </div>

      <div className="habit-grid">
        {habits.map((habit, hIndex) => (
          <div key={hIndex} className="habit-row">
            <div className="habit-title">
              {habit.name}
              <small className={habit.streak > 2 ? "streak-glow" : ""}>
                🔥 {habit.streak}
              </small>
            </div>

            {habit.days.map((done, dIndex) => (
              <div
                key={dIndex}
                className={`day-box ${done ? "active" : ""}`}
                onClick={() => toggleDay(hIndex, dIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="card">
        <button className="btn" onClick={getAIAdvice}>
          🤖 AI Habit Advice
        </button>
        {aiResult && <pre>{aiResult}</pre>}
      </div>
    </div>
  );
}
