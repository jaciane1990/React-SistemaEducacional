import React, { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  id: number;
  name: string;
}

interface Class {
  id?: number;
  name: string;
  courseId: number;
}

interface Props {
  editingClass: Class | null;
  courses: Course[];
  onSaved: () => void;
}

const ClassForm: React.FC<Props> = ({ editingClass, courses, onSaved }) => {
  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState<number>(courses[0]?.id || 0);

  useEffect(() => {
    if (editingClass) {
      setName(editingClass.name);
      setCourseId(editingClass.courseId);
    } else {
      setName("");
      setCourseId(courses[0]?.id || 0);
    }
  }, [editingClass, courses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await axios.put(`/classes/${editingClass.id}`, { name, courseId });
      } else {
        await axios.post("/classes", { name, courseId });
      }
      onSaved();
    } catch (err) {
      console.error("Erro ao salvar turma:", err);
      alert("Erro ao salvar turma!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da turma"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={courseId} onChange={(e) => setCourseId(Number(e.target.value))}>
        {courses.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button className="edit" type="submit">
        {editingClass ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default ClassForm;
