import React, { useEffect, useState } from "react";
import api from "../services/api";
import CourseForm from "../components/CourseForm";

interface Course {
  id: number;
  name: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses");
      console.log("Resposta da API:", response.data);

      // Suporte para API que retorna array direto ou objeto { courses: [...] }
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else if (response.data.courses && Array.isArray(response.data.courses)) {
        setCourses(response.data.courses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };

  return (
    <div className="container">
      <h2>Cursos</h2>
      <CourseForm
        editingCourse={editingCourse}
        onSaved={() => {
          setEditingCourse(null);
          fetchCourses();
        }}
      />
      <ul className="course-list">
        {courses.length === 0 && <p>(Nenhum curso disponível)</p>}
        {courses.map(c => (
          <li key={c.id}>
            {c.name || "(Sem nome)"}
            <div>
              <button className="edit" onClick={() => setEditingCourse(c)}>Editar</button>
              <button className="delete" onClick={() => handleDelete(c.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;
