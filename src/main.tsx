import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import CoursesPage from "./pages/CoursesPage";
import ClassesPage from "./pages/ClassesPage";
import StudentsPage from "./pages/StudentsPage";
import GradesPage from "./pages/GradesPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/courses">Cursos</Link> |{" "}
        <Link to="/classes">Turmas</Link> |{" "}
        <Link to="/students">Estudantes</Link> |{" "}
        <Link to="/grades">Notas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/grades" element={<GradesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
