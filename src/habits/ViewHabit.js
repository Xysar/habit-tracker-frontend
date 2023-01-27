import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function AddUser() {
  useEffect(() => {
    loadHabits();
  }, []);
  const { id } = useParams();

  const [data, setData] = useState({
    habit: "",
    streak: "",
    doneToday: "",
    color: "",
  });

  const loadHabits = async (e) => {
    let result = await axios.get(
      `habit-tracker-backend-production.up.railway.app/habit/${id}`
    );
    setData(result.data);
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
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <div className="mb-3">
            <label htmlFor="Habit" className="form-label">
              Habit Name
            </label>
            <div>{data.habit}</div>
            <label htmlFor="Streak" className="form-label">
              Streak Number
            </label>
            <div>{data.streak}</div>
            <label htmlFor="DoneToday" className="form-label">
              Did you do today?
            </label>
            <div>{booleanToString(data.doneToday)}</div>
            <label htmlFor="Color" className="form-label">
              Pick a Color
            </label>
            <div>{data.color}</div>
          </div>

          <Link to="/" className="btn btn-primary">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
