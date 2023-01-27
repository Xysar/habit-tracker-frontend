import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();
  axios.defaults.baseURL =
    "https://habit-tracker-backend-production.up.railway.app";
  const habitElementInput = useRef();
  const colorElementInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let defaultDate = new Date(1970, 0, 1);

    let dates = Array(31).fill(false);
    const data = {
      habit: capitalizeActivity(habitElementInput.current.value),
      streak: 0,
      doneToday: false,
      color: colorElementInput.current.value,
      lastDateModified: defaultDate.toLocaleDateString(),
      datesModified: dates,
    };

    await axios.post("/habit", data);
    navigate("/");
  };

  const capitalizeActivity = (activity) => {
    const newString = activity.charAt(0).toUpperCase() + activity.slice(1);
    return newString;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Habit" className="form-label">
                Habit Name
              </label>
              <input
                ref={habitElementInput}
                type={"text"}
                className="form-control"
                placeholder="Enter new habit"
                name="habit"
                required
              />

              <label htmlFor="Color" className="form-label">
                Pick a Color
              </label>
              <input
                ref={colorElementInput}
                type="color"
                className="form-control"
                placeholder="Enter a color"
                name="name"
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-danger">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
