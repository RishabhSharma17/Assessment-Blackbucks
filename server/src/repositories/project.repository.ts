import { db } from "../db";
import { projects,projectMembers,users,tasks } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { groupProjectRows } from "../utils/groupProjectRows";

export const findProjectsByManagerRepo = async (managerId: number) => {
  const rows = await db
    .select({
      project: projects,
      member: projectMembers,
      user: users,
      task: tasks,
    })
    .from(projects)
    .leftJoin(projectMembers, eq(projectMembers.projectId, projects.id))
    .leftJoin(users, eq(users.id, projectMembers.userId))
    .leftJoin(tasks, eq(tasks.projectId, projects.id))
    .where(eq(projects.createdBy, managerId));

  return groupProjectRows(rows);
};

export const findProjectsofManagerRepo = async (managerId: number) => {
  return await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
    })
    .from(projects)
    .where(eq(projects.createdBy, managerId));
};

export const createProjectRepo = async (data: {
  name: string;
  description?: string;
  createdBy: number;
}) => {
  const project = await db.insert(projects).values(data).returning();
  return project[0];
};

export const findProjectByIdAndManagerRepo = async (
  projectId: number,
  managerId: number
) => {
  const project = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, projectId),
        eq(projects.createdBy, managerId)
      )
    );

  return project[0];
};

export const addMemberRepo = async (
  projectId: number,
  userId: number
) => {
  const member = await db
    .insert(projectMembers)
    .values({ projectId, userId })
    .returning();

  return member[0];
};

export const updateProjectRepo = async (
  projectId: number,
  data: { name?: string; description?: string }
) => {
  const updated = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, projectId))
    .returning();

  return updated[0];
};

export const deleteProjectRepo = async (projectId: number) => {
  const deleted = await db
    .delete(projects)
    .where(eq(projects.id, projectId))
    .returning();

  return deleted[0];
};