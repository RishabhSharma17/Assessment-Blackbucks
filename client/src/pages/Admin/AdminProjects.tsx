import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../../features/projects/projectSlice";
import type { RootState } from "../../app/store";

export default function AdminProjects() {
  const dispatch = useDispatch<any>();
  const { projects, loading } = useSelector(
    (s: RootState) => s.projects
  );

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchAllProjects());
    }
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Project Name</th>
            <th className="p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p: any) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects.length === 0 && (
        <p className="mt-4 text-gray-500">No projects found</p>
      )}
    </div>
  );
}