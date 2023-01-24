import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { compareAsc, startOfDay } from "date-fns";
import HabitTable from "../components/HabitTable";
import HabitBoard from "../components/HabitBoard";

export default function Home() {
  return (
    <div className="container">
      <HabitTable />
      <HabitBoard />
    </div>
  );
}
