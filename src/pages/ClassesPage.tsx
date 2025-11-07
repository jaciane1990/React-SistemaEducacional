import React, { useEffect, useState } from "react";
import ClassForm from "../components/ClassForm";

interface Course {
  id: number;
  name: string;
}

interface Class {
  id: number;
  name: string;
  courseId: number;
  courseName?: string;
}

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const fetchClasses = async () => {
    const res = await fetch("https://api-estudo-educacao-1.onrender.com/classes");
    const data = await res.json();
    setClasses(data);
  };

  const fetchCourses = async () => {
    const res = await fetch("https://api-estudo-educacao-1.onrender.com/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchClasses();
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`https://api-estudo-educacao-1.onrender.com/classes/${id}`, { method: "DELETE" });
    setClasses(classes.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2>Turmas</h2>
      <ClassForm
        editingClass={editingClass}
        courses={courses}
        onSaved={() => {
          setEditingClass(null);
          fetchClasses();
        }}
      />
      <ul>
        {classes.map(c => (
          <li key={c.id}>
            {c.name} ({c.courseName || `Curso ID: ${c.courseId}`})
            <button className="edit" onClick={() => setEditingClass(c)}>Editar</button>
            <button className="delete" onClick={() => handleDelete(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesPage;
