import React, { useEffect, useState } from "react";

interface GradeTableProps {
  classId: number;
}

interface Student {
  id: number;
  name: string;
  grade: number;
}

const GradeTable: React.FC<GradeTableProps> = ({ classId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui você poderia substituir por fetch real
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Simulação de fetch
        await new Promise((res) => setTimeout(res, 500));
        const fakeData: Student[] = [
          { id: 1, name: "João Silva", grade: 8.5 },
          { id: 2, name: "Maria Souza", grade: 9.2 },
          { id: 3, name: "Carlos Pereira", grade: 7.8 },
        ];
        setStudents(fakeData);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [classId]);

  if (loading) return <p>Carregando notas...</p>;
  if (students.length === 0) return <p>Nenhum aluno encontrado nesta turma.</p>;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#2196F3", color: "#fff" }}>
          <th style={{ padding: "10px", textAlign: "left" }}>Aluno</th>
          <th style={{ padding: "10px", textAlign: "center" }}>Nota</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id} style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "10px" }}>{s.name}</td>
            <td style={{ padding: "10px", textAlign: "center" }}>{s.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradeTable;
