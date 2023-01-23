import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const result = await axios.get("http://localhost:8080/habits");
    setHabits(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/habit/${id}`);
    loadHabits();
  };

  const booleanToString = (boolean) => {
    if (boolean) {
      return "true";
    } else {
      return "false";
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
                  <input type="checkbox" defaultChecked={habit.doneToday} />
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
