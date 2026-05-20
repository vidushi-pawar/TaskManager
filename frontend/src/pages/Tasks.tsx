import { useState } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import type { Task } from '../api/tasks';

type Filter = 'all' | 'pending' | 'completed';

export default function Tasks() {
  const { query, create, update, remove } = useTasks();
  const [filter, setFilter] = useState<Filter>('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const tasks = query.data ?? [];
  const filtered = tasks.filter((t) => filter === 'all' || t.status === filter);

  const handleCreate = (data: { title: string; description: string }) => {
    create.mutate(data, { onSuccess: () => setShowForm(false) });
  };

  const handleUpdate = (data: { title: string; description: string }) => {
    if (!editing) return;
    update.mutate({ id: editing._id, data }, { onSuccess: () => setEditing(null) });
  };

  const handleToggle = (task: Task) => {
    update.mutate({ id: task._id, data: { status: task.status === 'pending' ? 'completed' : 'pending' } });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this task?')) remove.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">My Tasks</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            + Add Task
          </button>
        </div>

        <FilterBar active={filter} onChange={setFilter} />

        <div className="mt-6 space-y-3">
          {query.isLoading && (
            <p className="text-center text-gray-400 py-8">Loading tasks…</p>
          )}
          {query.isError && (
            <p className="text-center text-red-400 py-8">Failed to load tasks.</p>
          )}
          {!query.isLoading && filtered.length === 0 && (
            <p className="text-center text-gray-400 py-8">No tasks found.</p>
          )}
          {filtered.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={setEditing}
              onDelete={handleDelete}
              onToggleStatus={handleToggle}
            />
          ))}
        </div>
      </main>

      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          loading={create.isPending}
        />
      )}
      {editing && (
        <TaskForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          loading={update.isPending}
        />
      )}
    </div>
  );
}
