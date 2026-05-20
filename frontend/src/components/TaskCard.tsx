import type { Task } from '../api/tasks';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }: Props) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm p-4 flex gap-3 items-start transition ${task.status === 'completed' ? 'opacity-60' : ''}`}>
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => onToggleStatus(task)}
        className="mt-1 h-4 w-4 accent-indigo-600 cursor-pointer flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-gray-800 truncate ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>
        )}
        <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {task.status === 'completed' ? 'Completed' : 'Pending'}
        </span>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="text-sm text-indigo-600 hover:text-indigo-800 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm text-red-500 hover:text-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
