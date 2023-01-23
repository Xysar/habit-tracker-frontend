import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const habitElementInput = useRef();
  const streakElementInput = useRef();
  const doneElementInput = useRef();
  const colorElementInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      habit: habitElementInput.current.value,
      streak: streakElementInput.current.value,
      doneToday: doneElementInput.current.value,
      color: colorElementInput.current.value,
    };
    await axios.post("http://localhost:8080/habit", data);
    navigate("/");
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
