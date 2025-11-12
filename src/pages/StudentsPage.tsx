import React, { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";

interface Class {
  id: number;
  name: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  registeredAt?: string;
  classId: number;
  className?: string;
}

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch("https://api-estudo-educacao-1.onrender.com/students");
      const data: Student[] = await res.json();

      // Adiciona o nome da classe em cada estudante
      const updatedStudents = data.map(s => {
        const classInfo = classes.find(c => c.id === s.classId);
        return { ...s, className: classInfo?.name };
      });

      setStudents(updatedStudents);
    } catch (err) {
      console.error("Erro ao buscar estudantes:", err);
      alert("Erro ao carregar estudantes!");
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch("https://api-estudo-educacao-1.onrender.com/classes");
      const data: Class[] = await res.json();
      setClasses(data);
    } catch (err) {
      console.error("Erro ao buscar classes:", err);
      alert("Erro ao carregar classes!");
    }
  };

  useEffect(() => {
    // Primeiro busca as classes e depois os estudantes
    const loadData = async () => {
      await fetchClasses();
    };
    loadData();
  }, []);

  // Atualiza estudantes após buscar as classes
  useEffect(() => {
    if (classes.length > 0) {
      fetchStudents();
    }
  }, [classes]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://api-estudo-educacao-1.onrender.com/students/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      console.error("Erro ao excluir estudante:", err);
      alert("Não foi possível excluir o estudante!");
    }
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
            {s.firstName} {s.lastName} ({s.className || `Turma ID: ${s.classId}`})
            <button className="edit" onClick={() => setEditingStudent(s)}>Editar</button>
            <button className="delete" onClick={() => handleDelete(s.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsPage;
