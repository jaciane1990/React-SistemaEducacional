import React, { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";

interface Class {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  classId: number;
  className?: string;
}

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    const res = await fetch("https://api-estudo-educacao-1.onrender.com/students");
    const data = await res.json();
    setStudents(data);
  };

  const fetchClasses = async () => {
    const res = await fetch("https://api-estudo-educacao-1.onrender.com/classes");
    const data = await res.json();
    setClasses(data);
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`https://api-estudo-educacao-1.onrender.com/students/${id}`, { method: "DELETE" });
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div>
      <h2>Estudantes</h2>
      <StudentForm
        editingStudent={editingStudent}
        classes={classes}
        onSaved={() => {
          setEditingStudent(null);
          fetchStudents();
        }}
      />
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} ({s.className || `Turma ID: ${s.classId}`})
            <button className="edit" onClick={() => setEditingStudent(s)}>Editar</button>
            <button className="delete" onClick={() => handleDelete(s.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsPage;
