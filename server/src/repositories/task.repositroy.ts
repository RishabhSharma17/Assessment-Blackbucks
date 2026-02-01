import { db } from "../db";
import { projects,projectMembers,tasks,users } from "../db/schema";
import { eq, and } from "drizzle-orm";

export const findProjectByIdAndManagerRepo = async (
  projectId: number,
  managerId: number
) => {
  const result = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, projectId),
        eq(projects.createdBy, managerId)
      )
    );

  return result[0];
};

export const findProjectByIdRepo = async (projectId: number) => {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId));

  return result[0];
};

export const findProjectMemberRepo = async (
  projectId: number,
  userId: number
) => {
  const result = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, userId)
      )
    );

  return result[0];
};

export const createTaskRepo = async (data: {
  title: string;
  description?: string;
  projectId: number;
  assignedTo: number;
}) => {
  const task = await db.insert(tasks).values(data).returning();
  return task[0];
};

export const findTasksByProjectAndUserRepo = async (userId: number) => {
  const result = await db
    .select({
      task: tasks,
      project: projects,
    })
    .from(tasks)
    .leftJoin(projects, eq(tasks.projectId, projects.id))
    .where(eq(tasks.assignedTo, userId));

  return result.map((row) => ({
    ...row.task,
    project: row.project,
  }));
};

export const findTasksByProjectRepo = async (projectId: number) => {
  return await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      assignedToId: users.id,
      assignedToName: users.name,
    })
    .from(tasks)
    .leftJoin(users, eq(users.id, tasks.assignedTo))
    .where(eq(tasks.projectId, projectId));
};


export const findTaskByIdRepo = async (taskId: number) => {
  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.id, taskId));

  return result[0];
};

export const updateTaskStatusRepo = async (
  taskId: number,
  status: string
) => {
  const updated = await db
    .update(tasks)
    .set({ status })
    .where(eq(tasks.id, taskId))
    .returning();

  return updated[0];
};


export const deleteTaskRepo = async (taskId: number) => {
  const deleted = await db
    .delete(tasks)
    .where(eq(tasks.id, taskId))
    .returning();

  return deleted[0];
};
