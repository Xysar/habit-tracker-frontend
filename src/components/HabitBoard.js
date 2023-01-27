import React, { useEffect, useState } from "react";
import axios from "axios";
import { isSameMonth } from "date-fns";
export default function HabitBoard({ habits, setHabits, loadHabits, today }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    let a = new Array(31);
    for (let i = 0; i < 31; i++) {
      a[i] = i + 1;
    }
    changeForMonth();
    setNodes(a);
    loadHabits();
  }, []);

  const changeForMonth = async () => {
    const result = await axios.get(
      "https://habit-tracker-backend-production.up.railway.app/habits"
    );
    let habitList = result.data;

    let habit = habitList[0];
    let lastDate = new Date(habit.lastDateModified);

    if (!isSameMonth(lastDate, today)) {
      for (let i = 0; i < habitList.length; i++) {
        habit = habitList[i];
        let dates = Array(31).fill(false);
        habit.datesModified = dates;
        changeUser(habit);
      }
    }
  };

  const changeUser = async (habit) => {
    await axios.put(
      `https://habit-tracker-backend-production.up.railway.app/habit/${habit.id}`,
      habit
    );
    loadHabits();
  };

  return (
    <div className="habit-board py-4">
      <table className=" border shadow">
        <thead>
          <tr>
            <th scope="col"></th>
            {nodes.map((num, index) => (
              <th className="board-column" key={index} scope="col">
                {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => (
            <tr key={index} className="row-container">
              <th className="row-header" scope="row">
                {habit.habit}
              </th>
              {nodes.map((num, i) => {
                if (habit.datesModified[i + 1] === "true") {
                  return (
                    <td className="node-container" key={index * 100 + i}>
                      <div
                        className="node"
                        style={{ backgroundColor: `${habit.color}` }}
                      ></div>
                    </td>
                  );
                } else {
                  return (
                    <td className="node-container" key={index * 100 + i}>
                      <div
                        className="node"
                        style={{ backgroundColor: `white` }}
                      ></div>
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
