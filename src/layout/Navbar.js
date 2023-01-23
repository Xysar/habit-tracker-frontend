import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Habit Tracker
          </a>

          <Link className="btn btn-outline-light" to="/addhabit">
            Add Habit
          </Link>
        </div>
      </nav>
    </div>
  );
}
