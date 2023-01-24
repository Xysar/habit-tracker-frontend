import React, { useEffect, useState } from "react";

export default function HabitBoard() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    let a = new Array(31);
    for (let i = 0; i < 31; i++) {
      a[i] = "";
    }
    setNodes(a);
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
          <tr className="row-container">
            <th className="row-header" scope="row">
              Habit:
            </th>
            {nodes.map((num, index) => (
              <td className="node-container" key={index}>
                <div className="node"></div>
              </td>
            ))}
          </tr>
          <tr className="row-container">
            <th className="row-header" scope="row">
              Habit:
            </th>
            {nodes.map((num, index) => (
              <td className="node-container" key={index}>
                <div className="node"></div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
