import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTask, deleteTask, fetchTasks, updateTask } from '../api/tasks';
import type { CreateTaskPayload, UpdateTaskPayload } from '../api/tasks';

export function useTasks() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['tasks'] });

  const query = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });

  const create = useMutation({ mutationFn: (data: CreateTaskPayload) => createTask(data), onSuccess: invalidate });
  const update = useMutation({ mutationFn: ({ id, data }: { id: string; data: UpdateTaskPayload }) => updateTask(id, data), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: (id: string) => deleteTask(id), onSuccess: invalidate });

  return { query, create, update, remove };
}
