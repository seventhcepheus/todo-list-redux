import React from 'react';
import { ITodo } from './todoSlice';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const getDeadlineColor = () => {
    if (todo.completed) return 'gray';
    if (!todo.deadline) return 'black';

    const deadline = new Date(todo.deadline);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const diffHours = diff / (1000 * 60 * 60);

    if (diff < 0) return 'red';
    if (diffHours < 24) return 'orange';
    return 'green';
  };

  return (
    <div
      style={{
        margin: '8px 0',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        textDecoration: todo.completed ? 'line-through' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={{ marginRight: '8px' }}
        />
        <span style={{ flex: 1 }}>{todo.text}</span>
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: 'none',
            border: 'none',
            color: 'red',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ×
        </button>
      </div>
      {todo.deadline && (
        <div
          style={{
            color: getDeadlineColor(),
            fontSize: '0.8em',
            marginTop: '4px',
          }}
        >
          Deadline: {new Date(todo.deadline).toLocaleString()}
        </div>
      )}
      {todo.completedAt && (
        <div style={{ color: 'gray', fontSize: '0.8em', marginTop: '4px' }}>
          Completed: {new Date(todo.completedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default TodoItem;