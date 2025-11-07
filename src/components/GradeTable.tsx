import React, { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  grade?: { prova?: number; trabalho?: number };
}

interface Props {
  classId: number;
}

const GradeTable: React.FC<Props> = ({ classId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/students?classId=${classId}`);
        setStudents(data);
      } catch (err) {
        console.error("Erro ao buscar estudantes:", err);
        alert("Erro ao carregar estudantes!");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [classId]);

  const handleChange = (id: number, field: "prova" | "trabalho", value: number) => {
    setStudents(students.map(s => s.id === id ? {
      ...s,
      grade: { ...s.grade, [field]: value }
    } : s));
  };

  const handleSave = async (student: Student) => {
    try {
      await axios.put(`/grades/${student.id}`, student.grade);
      alert("Notas salvas!");
    } catch (err) {
      console.error("Erro ao salvar notas:", err);
      alert("Erro ao salvar notas!");
    }
  };

  if (loading) return <p>Carregando estudantes...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Estudante</th>
          <th>Prova</th>
          <th>Trabalho</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>
              <input
                type="number"
                value={s.grade?.prova ?? 0}
                onChange={(e) => handleChange(s.id, "prova", Number(e.target.value))}
              />
            </td>
            <td>
              <input
                type="number"
                value={s.grade?.trabalho ?? 0}
                onChange={(e) => handleChange(s.id, "trabalho", Number(e.target.value))}
              />
            </td>
            <td>
              <button className="edit" onClick={() => handleSave(s)}>Salvar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradeTable;
