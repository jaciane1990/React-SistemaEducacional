import { Routes, Route, Link } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import ClassesPage from "./pages/ClassesPage";
import StudentsPage from "./pages/StudentsPage";
import GradesPage from "./pages/GradesPage";
import './App.css';

function App() {
  return (
    <div>
      <header>
        <h1>Gerenciamento Educacional</h1>
        <nav>
          <Link to="/courses">Cursos</Link>
          <Link to="/classes">Turmas</Link>
          <Link to="/students">Estudantes</Link>
          <Link to="/grades">Notas</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route
            path="/"
            element={
              <div>
                <h2>Bem-vindo ao Sistema de Gerenciamento Educacional!</h2>
                <p>Use o menu acima para navegar entre cursos, turmas, estudantes e notas.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
