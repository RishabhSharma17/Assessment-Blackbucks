import { useEffect, useState } from "react";
import { getMyProjects, createProject } from "../../api/ProjectApi";
import { useNavigate } from "react-router-dom";

export default function ManagerProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const data = await getMyProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    if (!name || !desc) return;
    await createProject({ name, description: desc });
    setName("");
    setDesc("");
    fetchProjects();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>

      <div className="bg-white p-4 shadow mb-6 flex gap-3">
        <input
          className="border p-2 flex-1"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Project description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4"
        >
          Create
        </button>
      </div>

      {projects.map((p) => (
        <div
          key={p.id}
          onClick={() => navigate(`/manager/projects/${p.id}`)}
          className="p-3 border mb-2 cursor-pointer bg-white"
        >
          <p className="font-semibold">{p.name}</p>
          <p className="text-sm text-gray-500">{p.description}</p>
        </div>
      ))}
    </div>
  );
}