import { useEffect, useState } from "react";
import { getMyTasks, updateTaskStatus } from "../../api/ProjectApi";

export default function UserTasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    const data = await getMyTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {tasks.map((t) => (
        <div
          key={t.id}
          className="p-3 border mb-2 bg-white flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{t.title}</p>
            <p className="text-sm text-gray-500">
              Project: {t.project?.name}
            </p>
          </div>

          <select
            className="border p-1"
            value={t.status}
            onChange={async (e) => {
              await updateTaskStatus(t.id, e.target.value);
              fetchTasks();
            }}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      ))}

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks assigned</p>
      )}
    </div>
  );
}
