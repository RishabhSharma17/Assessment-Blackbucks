import { db } from "../db";
import { users,roles,projects,tasks,projectMembers } from "../db/schema";
import { eq } from "drizzle-orm";

export const findAllUsersRepo = async () => {
  const result = await db
    .select({
      user: users,
      role: roles,
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id));

  return result.map((row) => ({
    ...row.user,
    role: row.role,
  }));
};

export const findAllProjectsRepo = async () => {
  const result = await db
    .select({
      project: projects,
      manager: users,
      taskId: tasks.id,
      memberId: projectMembers.id,
    })
    .from(projects)
    .leftJoin(users, eq(projects.createdBy, users.id))
    .leftJoin(tasks, eq(tasks.projectId, projects.id))
    .leftJoin(projectMembers, eq(projectMembers.projectId, projects.id));

  const map = new Map<number, any>();

  for (const row of result) {
    if (!map.has(row.project.id)) {
      map.set(row.project.id, {
        ...row.project,
        manager: row.manager
          ? {
              id: row.manager.id,
              name: row.manager.name,
              email: row.manager.email,
            }
          : null,
        tasksCount: 0,
        membersCount: 0,
        _taskSet: new Set<number>(),
        _memberSet: new Set<number>(),
      });
    }

    const current = map.get(row.project.id);

    if (row.taskId && !current._taskSet.has(row.taskId)) {
      current._taskSet.add(row.taskId);
      current.tasksCount++;
    }

    if (row.memberId && !current._memberSet.has(row.memberId)) {
      current._memberSet.add(row.memberId);
      current.membersCount++;
    }
  }

  return Array.from(map.values()).map((p) => {
    delete p._taskSet;
    delete p._memberSet;
    return p;
  });
};

export const findRoleByNameRepo = async (name: string) => {
  const result = await db
    .select()
    .from(roles)
    .where(eq(roles.name, name));

  return result[0];
};

export const createUserRepo = async (data: {
  name: string;
  email: string;
  password: string;
  roleId: number;
}) => {
  const user = await db.insert(users).values(data).returning();
  return user[0];
};

export const updateUserRepo = async (
  id: number,
  data: Partial<{
    name: string;
    email: string;
    password: string;
    roleId: number;
  }>
) => {
  const updated = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  return updated[0];
};

export const deleteUserRepo = async (id: number) => {
  const deleted = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  return deleted[0];
};
