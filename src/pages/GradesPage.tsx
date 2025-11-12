import React, { useEffect, useState } from "react";
import GradeTable from "../components/GradeTable";

interface Class {
  id: number;
  title: string;
}

const GradesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      const res = await fetch("https://api-estudo-educacao-1.onrender.com/classes");
      if (!res.ok) throw new Error(`Erro na requisição: ${res.statusText}`);
      const data = await res.json();
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao buscar classes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  if (loading) return <p>Carregando classes...</p>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;
  if (classes.length === 0) return <p>Nenhuma turma disponível.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#333", marginBottom: "15px" }}>Notas</h1>

      <select
        value={selectedClassId || ""}
        onChange={(e) => setSelectedClassId(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      >
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {selectedClassId ? (
        <GradeTable classId={selectedClassId} />
      ) : (
        <p>Selecione uma turma para ver as notas.</p>
      )}
    </div>
  );
};

export default GradesPage;
