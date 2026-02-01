type Row = {
  project: any;
  member: any | null;
  user: any | null;
  task: any | null;
};

export function groupProjectRows(rows: Row[]) {
  const map = new Map<number, any>();

  for (const row of rows) {
    const { project, member, user, task } = row;

    if (!map.has(project.id)) {
      map.set(project.id, {
        ...project,
        members: [],
        tasks: [],
      });
    }

    const current = map.get(project.id);

    if (member && user) {
      const exists = current.members.some((m: any) => m.id === member.id);
      if (!exists) {
        current.members.push({ ...member, user });
      }
    }

    if (task) {
      const exists = current.tasks.some((t: any) => t.id === task.id);
      if (!exists) {
        current.tasks.push(task);
      }
    }
  }

  return Array.from(map.values());
}