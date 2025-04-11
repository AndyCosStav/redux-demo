import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleComplete,
} from './redux/todoSlice';

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo({text:input, dueDate, user}));
      setInput('');
      setDueDate('');
      setUser('');
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDueDate(todo.dueDate || '');
    setEditDueDate(todo.user || '');
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: editingId, newText: editText }));
      setEditingId(null);
      setEditText('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Redux Todo App Demo</h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
          style={{ flex: 1 }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Show: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleComplete(todo.id))}
            />

            {editingId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1 }}
                /> 
                <input
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  style={{ flex: 1 }}
                />
                
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    flex: 1,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  style={{ color: 'red' }}
                >
                  Delete
                </button>
              </>
            )}
          {todo.dueDate && (
        <small style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: 'gray' }}>
          Due: {todo.dueDate}
        </small>
)}
      {todo.user && (
        <p style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: 'white' }}>
          set By: {todo.user}
        </p>
      )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
