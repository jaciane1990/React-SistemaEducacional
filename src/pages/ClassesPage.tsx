import React, { useEffect, useState } from "react";
// import ClassForm from "../components/ClassForm"; // Lembre de criar este componente!
import api from "../services/api";

interface Course {
  id: number;
  name: string;
}

interface Class {
  id: number;
  room: string;
  courseId: number;
  // courseName é removido, pois será buscado localmente
}

// NOTE: Componente Mock para o formulário.
const ClassForm = ({ editingClass, courses, onSaved }: { editingClass: Class | null, courses: Course[], onSaved: () => void }) => {
    return (
        <form>
            <h3>{editingClass ? 'Editar Turma' : 'Adicionar Nova Turma'}</h3>
            <input type="text" placeholder="Sala (Ex: B201)" required />
            <select required>
                <option value="">Selecione um Curso</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button type="submit" onClick={(e) => { e.preventDefault(); onSaved(); }}>Salvar Turma</button>
        </form>
    );
};

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true); // Adicionado loading

  // Função helper para encontrar o nome do curso
  const getCourseName = (courseId: number): string => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : `ID ${courseId} (Carregando...)`;
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      setClasses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        // Garante que as duas buscas sejam concluídas antes de parar o loading
        await Promise.all([fetchClasses(), fetchCourses()]); 
        setLoading(false); 
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Confirma a exclusão desta turma?")) return;
    try {
      await api.delete(`/classes/${id}`);
      setClasses(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
    }
  };

  // Exibição do loading
  if (loading) return <p>Carregando turmas e cursos...</p>;

  return (
    <div>
      <h2>Turmas</h2>
      <ClassForm
        editingClass={editingClass}
        courses={courses}
        onSaved={() => {
          setEditingClass(null);
          fetchClasses(); // Recarrega a lista de turmas após salvar
        }}
      />
      
      <ul>
        {classes.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>(Nenhuma turma disponível)</p>
        ) : (
            classes.map(c => (
              <li key={c.id}>
                <span>
                    Sala **{c.room}** ({getCourseName(c.courseId)})
                </span>
                <div>
                  <button className="edit" onClick={() => setEditingClass(c)}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(c.id)}>Excluir</button>
                </div>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default ClassesPage;