import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { compareAsc, startOfDay, getDate } from "date-fns";

export default function HabitTable({ habits, setHabits, loadHabits, today }) {
  useEffect(() => {
    changeForDate();
    loadHabits();
  }, []);

  const changeForDate = async () => {
    const result = await axios.get(
      "https://habit-tracker-backend-production.up.railway.app/habits"
    );
    let habitList = result.data;
    for (let i = 0; i < habitList.length; i++) {
      let habit = habitList[i];
      let lastDate = new Date(habit.lastDateModified);
      if (compareAsc(today, lastDate) > 0) {
        habit.doneToday = false;
        changeUser(habit);
      }
    }
  };
  const deleteUser = async (id) => {
    await axios.delete(
      `https://habit-tracker-backend-production.up.railway.app/habit/${id}`
    );
    loadHabits();
  };

  const changeUser = async (habit) => {
    await axios.put(
      `https://habit-tracker-backend-production.up.railway.app/habit/${habit.id}`,
      habit
    );
    loadHabits();
  };

  const changeLastDateModified = async (habit) => {
    habit.lastDateModified = today.toLocaleDateString();
    changeUser(habit);
  };

  const handleDoneChange = (event, habit) => {
    let lastDate = new Date(habit.lastDateModified);

    if (compareAsc(today, lastDate) > 0) {
      habit.streak++;
      habit.doneToday = true;
      habit.datesModified[getDate(today)] = true;
      changeLastDateModified(habit);
    } else {
      if (event.target.checked) {
        habit.streak++;
        habit.datesModified[getDate(today)] = true;
        habit.doneToday = true;
        changeUser(habit);
      } else {
        habit.streak--;
        habit.datesModified[getDate(today)] = false;
        habit.doneToday = false;
        changeUser(habit);
      }
    }
  };

  return (
    <div className="habit-table py-4">
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Habit</th>
            <th scope="col">Streak</th>
            <th scope="col">Done Today?</th>

            <th className="action-col" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => (
            <tr
              className="habit-row"
              key={index}
              style={{ borderLeft: `5px solid ${habit.color}` }}
            >
              <td>{habit.habit}</td>
              <td>{habit.streak}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={(event) => handleDoneChange(event, habit)}
                  defaultChecked={habit.doneToday}
                />
              </td>

              <td>
                <Link
                  to={`/viewhabit/${habit.id}`}
                  className="btn btn-primary mx-2"
                >
                  View
                </Link>
                <Link
                  to={`/edithabit/${habit.id}`}
                  className="btn btn-outline-primary mx-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(habit.id)}
                  className="btn btn-danger mx-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
