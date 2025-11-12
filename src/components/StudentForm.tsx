import React, { useEffect, useState } from "react";

interface Student {
  id?: number;
  firstName: string;
  lastName: string;
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classId, setClassId] = useState<number>(classes[0]?.id || 0);

  useEffect(() => {
    if (editingStudent) {
      setFirstName(editingStudent.firstName);
      setLastName(editingStudent.lastName);
      setClassId(editingStudent.classId);
    } else {
      setFirstName("");
      setLastName("");
      setClassId(classes[0]?.id || 0);
    }
  }, [editingStudent, classes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { firstName, lastName, classId };

    try {
      if (editingStudent) {
        await fetch(`https://api-estudo-educacao-1.onrender.com/students/${editingStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("https://api-estudo-educacao-1.onrender.com/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      onSaved();
    } catch (err) {
      console.error("Erro ao salvar estudante:", err);
      alert("Não foi possível salvar o estudante!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Sobrenome"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
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
