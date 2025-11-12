// App.tsx (Refatorado)

import { Routes, Route } from "react-router-dom";
// Importe o novo componente de Layout e a HomePage
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage"; 
import CoursesPage from "./pages/CoursesPage";
import ClassesPage from "./pages/ClassesPage";
import StudentsPage from "./pages/StudentsPage";
import GradesPage from "./pages/GradesPage";
import './App.css'; 
// OBS: Você não precisa mais importar Link no App.tsx

function App() {
  return (
    <Routes>
      {/* 1. A rota pai (path="/") usa o componente Layout.
        2. O Layout contém o Header/Nav e o componente <Outlet />
      */}
      <Route path="/" element={<Layout />}>
        
        {/* A rota 'index' renderiza a HomePage quando o caminho for exatamente "/" */}
        <Route index element={<HomePage />} />
        
        {/* As rotas filhas herdam o Layout (o caminho é relativo à rota pai) */}
        <Route path="courses" element={<CoursesPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="grades" element={<GradesPage />} />
        
        {/* Opcional: Rota 404 */}
        <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
      </Route>
    </Routes>
  );
}

export default App;