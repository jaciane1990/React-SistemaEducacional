// src/pages/CoursesPage.tsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
// NOTE: Você precisará criar o componente CourseForm

interface Course {
  id: number;
  code: string;
  title: string;
  credits: number;
}

// NOTE: Este é um componente mock para que o código compile, substitua pelo seu
const CourseForm = ({ editingCourse, onSaved }: { editingCourse: Course | null, onSaved: () => void }) => {
    return (
        <form>
            <h3>{editingCourse ? 'Editar Curso' : 'Adicionar Novo Curso'}</h3>
            <input type="text" placeholder="Código do Curso" required />
            <input type="text" placeholder="Título" required />
            <input type="number" placeholder="Créditos" required />
            <button type="submit">Salvar</button>
        </form>
    );
};

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses");
      setCourses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      // Você pode adicionar um estado de erro aqui: setError("Falha ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) return;
    try {
      await api.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };

  if (loading) return <p>Carregando cursos...</p>;

  return (
    <div>
      <h2>Cursos</h2>
      <CourseForm
        editingCourse={editingCourse}
        onSaved={() => {
          setEditingCourse(null);
          fetchCourses(); // Recarrega a lista após salvar
        }}
      />
      
      {/* Seu UL com os estilos profissionais */}
      <ul>
        {courses.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>(Nenhum curso disponível)</p>
        ) : (
          courses.map(c => (
            <li key={c.id}>
              <span><strong>{c.code}</strong> - {c.title} ({c.credits} créditos)</span>
              <div>
                <button className="edit" onClick={() => setEditingCourse(c)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(c.id)}>Excluir</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CoursesPage;