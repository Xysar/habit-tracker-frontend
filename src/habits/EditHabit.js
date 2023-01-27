import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  axios.defaults.baseURL =
    "https://habit-tracker-backend-production.up.railway.app";
  const { id } = useParams();
  let [info, setInfo] = useState();

  const habitElementInput = useRef();
  const colorElementInput = useRef();

  useEffect(() => {
    loadHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...info,
      habit: habitElementInput.current.value,
      color: colorElementInput.current.value,
    };
    await axios.put(`/habit/${id}`, data);
    navigate("/");
  };

  const loadHabits = async (e) => {
    let result = await axios.get(`/habit/${id}`);
    let { habit, color } = result.data;
    setInfo(result.data);
    habitElementInput.current.value = habit;
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
