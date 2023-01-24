import React, { useState } from "react";
import HabitTable from "../components/HabitTable";
import HabitBoard from "../components/HabitBoard";

import axios from "axios";

export default function Home() {
  const [habits, setHabits] = useState([]);

  const loadHabits = async () => {
    const result = await axios.get("http://localhost:8080/habits");
    setHabits(result.data);
  };

  return (
    <div className="container">
      <HabitTable
        habits={habits}
        setHabits={setHabits}
        loadHabits={() => loadHabits()}
      />
      <HabitBoard
        habits={habits}
        setHabits={setHabits}
        loadHabits={() => loadHabits()}
      />
    </div>
  );
}
