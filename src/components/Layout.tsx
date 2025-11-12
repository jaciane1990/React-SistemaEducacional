// src/components/Layout.tsx

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="main-header">
        <h1>Gerenciamento Educacional</h1>
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/courses">Cursos</Link>
          <Link to="/classes">Turmas</Link>
          <Link to="/students">Estudantes</Link>
          <Link to="/grades">Notas</Link>
        </nav>
      </header>

      {/* Container para o conteúdo principal com padding e centralização */}
      <div className="content-container">
        <main>
          <Outlet /> {/* Aqui o conteúdo da rota filha será renderizado */}
        </main>
      </div>
    </>
  );
};

export default Layout;