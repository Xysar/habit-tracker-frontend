import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();
  const habitElementInput = useRef();
  const streakElementInput = useRef();
  const doneElementInput = useRef();
  const colorElementInput = useRef();

  useEffect(() => {
    loadHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      habit: habitElementInput.current.value,
      streak: streakElementInput.current.value,
      doneToday: doneElementInput.current.value,
      color: colorElementInput.current.value,
    };
    await axios.put(`http://localhost:8080/habit/${id}`, data);
    navigate("/");
  };

  const loadHabits = async (e) => {
    let result = await axios.get(`http://localhost:8080/habit/${id}`);
    let { habit, streak, doneToday, color } = result.data;
    habitElementInput.current.value = habit;
    streakElementInput.current.value = streak;
    doneElementInput.current.value = doneToday;
    colorElementInput.current.value = color;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
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
              />
              <label htmlFor="Streak" className="form-label">
                Streak Number
              </label>
              <input
                ref={streakElementInput}
                type={"text"}
                className="form-control"
                placeholder="Enter 0"
                name="streak"
              />
              <label htmlFor="DoneToday" className="form-label">
                Did you do today?
              </label>
              <input
                ref={doneElementInput}
                type={"text"}
                className="form-control"
                placeholder="Enter if done today"
                name="doneToday"
              />
              <label htmlFor="Color" className="form-label">
                Pick a Color
              </label>
              <input
                ref={colorElementInput}
                type={"text"}
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
