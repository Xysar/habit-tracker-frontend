import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddHabit from "./habits/AddHabit";
import EditHabit from "./habits/EditHabit";
import ViewHabit from "./habits/ViewHabit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addhabit" element={<AddHabit />} />
          <Route path="/edithabit/:id" element={<EditHabit />} />
          <Route path="/viewhabit/:id" element={<ViewHabit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
