import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HabitBoard({ habits, setHabits, loadHabits }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    let a = new Array(31);
    for (let i = 0; i < 31; i++) {
      a[i] = i + 1;
    }
    setNodes(a);
    loadHabits();
  }, []);

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
