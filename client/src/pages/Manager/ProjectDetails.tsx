import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectTasks,
  createTask,
  updateTaskStatus,
  getMyProjects,
} from "../../api/ProjectApi";
import { getUsers } from "../../api/UserApi";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  // Fetch project info
  const fetchProject = async () => {
    const projects = await getMyProjects();
    const found = projects.find((p: any) => p.id.toString() === id);
    setProject(found);
  };

  // Fetch tasks
  const fetchTasks = async () => {
    const data = await getProjectTasks(id!);
    setTasks(data);
  };

  // Fetch only employees for assignment
  const fetchUsers = async () => {
    const data = await getUsers();
    const onlyUsers = data.filter((u: any) => u.role.name === "USER");
    setUsers(onlyUsers);
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
    fetchUsers();
  }, []);

  const handleCreateTask = async () => {
    if (!taskTitle || !taskDesc || !assignedUser) return;

    await createTask(id!, {
      title: taskTitle,
      description: taskDesc,
      assignedTo: assignedUser,
    });

    setTaskTitle("");
    setTaskDesc("");
    setAssignedUser("");
    fetchTasks();
  };

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => navigate("/manager/projects")}
        className="mb-4 text-blue-600"
      >
        ← Back to Projects
      </button>

      {/* Project Info */}
      {project && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
      )}

      {/* Create Task */}
      <div className="bg-white p-4 shadow mb-6 flex gap-3">
        <input
          className="border p-2 flex-1"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <input
          className="border p-2 flex-1"
          placeholder="Task description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />

        <select
          className="border p-2"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
        >
          <option value="">Assign to user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateTask}
          className="bg-green-600 text-white px-4"
        >
          Add Task
        </button>
      </div>

      {/* Tasks List */}
      {tasks.map((t) => (
        <div
          key={t.id}
          className="p-3 border mb-2 bg-white flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{t.title}</p>
            <p className="text-sm text-gray-500">{t.description}</p>

            <p className="text-xs text-blue-600 mt-1">
              Assigned to: {t.assignedToName ?? "Unassigned"}
            </p>
          </div>


          <select
            value={t.status}
            onChange={async (e) => {
              await updateTaskStatus(t.id, e.target.value);
              fetchTasks();
            }}
            className="border p-1"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      ))}

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks yet</p>
      )}
    </div>
  );
}
