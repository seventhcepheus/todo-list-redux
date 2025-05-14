import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTodo, toggleComplete, deleteTodo } from './todoSlice';
import TodoItem from './TodoItem';
import { ITodo } from './todoSlice';

const TodoList: React.FC = () => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo({ 
        text, 
        deadline: deadline || undefined 
      }));
      setText('');
      setDeadline('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const groupedTodos = filteredTodos.reduce<Record<string, ITodo[]>>(
    (groups, todo) => {
      const date = todo.deadline
        ? new Date(todo.deadline).toDateString()
        : 'No deadline';
      if (!groups[date]) groups[date] = [];
      groups[date].push(todo);
      return groups;
    },
    {}
  );

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>

      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px' 
      }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
          style={{ 
            flex: 1, 
            padding: '8px' 
          }}
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={{ 
            padding: '8px' 
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Add
        </button>
      </div>

      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '16px',
      }}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? '#ddd' : 'transparent',
              padding: '4px 8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {Object.entries(groupedTodos).map(([date, todos]) => (
          <div 
            key={date} 
            style={{ 
              marginBottom: '24px' 
            }}
          >
            <h3
              style={{
                borderBottom: '1px solid #eee',
                paddingBottom: '4px',
                marginBottom: '8px',
              }}
            >
              {date}
            </h3>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(id) => dispatch(toggleComplete(id))}
                onDelete={(id) => dispatch(deleteTodo(id))}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;