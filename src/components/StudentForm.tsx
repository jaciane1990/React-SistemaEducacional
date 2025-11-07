import React, { useEffect, useState } from "react";

interface Student {
  id?: number;
  name: string;
  classId: number;
}

interface Class {
  id: number;
  name: string;
}

interface Props {
  editingStudent: Student | null;
  classes: Class[];
  onSaved: () => void;
}

const StudentForm: React.FC<Props> = ({ editingStudent, classes, onSaved }) => {
  const [name, setName] = useState("");
  const [classId, setClassId] = useState<number>(classes[0]?.id || 0);

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setClassId(editingStudent.classId);
    } else {
      setName("");
      setClassId(classes[0]?.id || 0);
    }
  }, [editingStudent, classes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      await fetch(`https://api-estudo-educacao-1.onrender.com/students/${editingStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, classId }),
      });
    } else {
      await fetch("https://api-estudo-educacao-1.onrender.com/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, classId }),
      });
    }
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do estudante"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={classId} onChange={(e) => setClassId(Number(e.target.value))}>
        {classes.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button className="edit" type="submit">
        {editingStudent ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default StudentForm;
