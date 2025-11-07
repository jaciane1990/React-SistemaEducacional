import React, { useEffect, useState } from "react";
import GradeTable from "../components/GradeTable";

interface Class {
  id: number;
  name: string;
}

const GradesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const fetchClasses = async () => {
    const res = await fetch("https://api-estudo-educacao-1.onrender.com/classes");
    const data = await res.json();
    setClasses(data);
    if (data.length > 0) setSelectedClassId(data[0].id);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Notas</h2>
      <select
        value={selectedClassId || ""}
        onChange={(e) => setSelectedClassId(Number(e.target.value))}
      >
        {classes.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {selectedClassId && <GradeTable classId={selectedClassId} />}
    </div>
  );
};

export default GradesPage;
