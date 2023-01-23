import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { compareAsc, startOfDay } from "date-fns";

export default function Home() {
  const [habits, setHabits] = useState([]);
  let today = startOfDay(new Date());
  useEffect(() => {
    changeForDate();
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const result = await axios.get("http://localhost:8080/habits");
    setHabits(result.data);
  };
  const changeForDate = async () => {
    const result = await axios.get("http://localhost:8080/habits");
    let habitList = result.data;
    for (let i = 0; i < habitList.length; i++) {
      let habit = habitList[0];
      let lastDate = new Date(habit.lastDateModified);
      if (compareAsc(today, lastDate) > 0) {
        habit.doneToday = false;
        changeUser(habit);
      }
    }
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/habit/${id}`);
    loadHabits();
  };

  const changeUser = async (habit) => {
    await axios.put(`http://localhost:8080/habit/${habit.id}`, habit);
    loadHabits();
  };

  const booleanToString = (boolean) => {
    if (boolean) {
      return "true";
    } else {
      return "false";
    }
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
      changeLastDateModified(habit);
    } else {
      if (event.target.checked) {
        habit.streak++;
        habit.doneToday = true;
        changeUser(habit);
      } else {
        habit.streak--;
        habit.doneToday = false;
        changeUser(habit);
      }
    }
  };

  return (
    <div className="container">
      <div className="py-4">
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
    </div>
  );
}
