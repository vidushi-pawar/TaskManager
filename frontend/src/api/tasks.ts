import api from './axiosInstance';

export type TaskStatus = 'pending' | 'completed';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
}

export interface CreateTaskPayload { title: string; description?: string }
export interface UpdateTaskPayload { title?: string; description?: string; status?: TaskStatus }

export const fetchTasks = () => api.get<Task[]>('/tasks').then((r) => r.data);
export const fetchTask = (id: string) => api.get<Task>(`/tasks/${id}`).then((r) => r.data);
export const createTask = (data: CreateTaskPayload) => api.post<Task>('/tasks', data).then((r) => r.data);
export const updateTask = (id: string, data: UpdateTaskPayload) => api.put<Task>(`/tasks/${id}`, data).then((r) => r.data);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`).then((r) => r.data);
