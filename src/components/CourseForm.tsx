import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Course {
  id?: number;
  name: string;
}

interface Props {
  editingCourse: Course | null;
  onSaved: () => void;
}

const CourseForm: React.FC<Props> = ({ editingCourse, onSaved }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCourse) setName(editingCourse.name);
    else setName("");
  }, [editingCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse && editingCourse.id) {
        await api.put(`/courses/${editingCourse.id}`, { name });
      } else {
        await api.post("/courses", { name });
      }
      onSaved();
      setName("");
    } catch (err) {
      console.error("Erro ao salvar curso:", err);
      alert("Erro ao salvar curso!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do curso"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="edit" type="submit">
        {editingCourse ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default CourseForm;
