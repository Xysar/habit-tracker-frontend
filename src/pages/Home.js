import React, { useState } from "react";
import HabitTable from "../components/HabitTable";
import HabitBoard from "../components/HabitBoard";
import { startOfDay } from "date-fns";
import axios from "axios";

export default function Home() {
  const [habits, setHabits] = useState([]);

  let today = startOfDay(new Date());

  var month = today.toLocaleString("default", { month: "long" });
  const loadHabits = async () => {
    const result = await axios.get(
      "https://habit-tracker-backend-production.up.railway.app/habits"
    );
    setHabits(result.data);
  };

  return (
    <div className="container">
      <HabitTable
        today={today}
        habits={habits}
        setHabits={setHabits}
        loadHabits={() => loadHabits()}
      />
      <h3>{month}</h3>
      <HabitBoard
        today={today}
        habits={habits}
        setHabits={setHabits}
        loadHabits={() => loadHabits()}
      />
    </div>
  );
}
