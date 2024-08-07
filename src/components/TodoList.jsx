import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, toggleTodo, addTodo, fetchTodos, editTodo } from '../redux/actions/todoActions';
import { logout } from '../redux/actions/authActions';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState('');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'

  const todos = useSelector(state => state.todos.todos);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchTodos(user.id));
    }
  }, [dispatch, user]);

  const handleAddTodo = () => {
    if (!user || !user.id) {
      alert('User not logged in or user ID is missing');
      return;
    }

    if (newTodo.trim()) {
      dispatch(addTodo({
        title: newTodo,
        completed: false,
        userId: user.id,
      }));
      setNewTodo('');
    }
  };

  const handleEditTodo = (id) => {
    if (editTodoTitle.trim()) {
      dispatch(editTodo(id, { title: editTodoTitle }));
      setEditTodoId(null);
      setEditTodoTitle('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id, completed) => {
    dispatch(toggleTodo(id, !completed));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Filter todos based on the selected filter and search query
  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'Completed') return todo.completed;
      if (filter === 'Incomplete') return !todo.completed;
      return true; // Show all todos if filter is 'All'
    })
    .filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Sort todos based on the selected sort order
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title); // Sort by title
    } else {
      return b.title.localeCompare(a.title); // Sort by title
    }
  });

  return (
    <div className="container mt-4">
      <div style={{ display: "flex", justifyContent: "space-between", margin: "25px" }}>
        <h1 className="mb-4">To-do List</h1>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <h3>{user.userName}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New To-do"
        />
        <button
          className="btn btn-primary"
          onClick={handleAddTodo}>
          Add To-do
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search To-do"
        />
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          className={`btn ${filter === 'All' ? 'btn-secondary' : 'btn-outline-secondary'} me-2`}
          onClick={() => setFilter('All')}>
          All
        </button>
        <button
          className={`btn ${filter === 'Completed' ? 'btn-secondary' : 'btn-outline-secondary'} me-2`}
          onClick={() => setFilter('Completed')}>
          Completed
        </button>
        <button
          className={`btn ${filter === 'Incomplete' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('Incomplete')}>
          Incomplete
        </button>
      </div>

      {/* Sort Buttons */}
      <div className="mb-4">
        <button
          className={`btn ${sortOrder === 'asc' ? 'btn-secondary' : 'btn-outline-secondary'} me-2`}
          onClick={() => setSortOrder('asc')}>
          Sort A-Z
        </button>
        <button
          className={`btn ${sortOrder === 'desc' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setSortOrder('desc')}>
          Sort Z-A
        </button>
      </div>

      <ul className="list-group">
        {sortedTodos.map(todo => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                  placeholder="Edit To-do"
                />
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleEditTodo(todo.id)}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditTodoId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className={`me-3 ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                  {todo.title}
                </span>
                <div>
                  <button
                    className={`btn ${todo.completed ? 'btn-warning' : 'btn-success'} me-2`}
                    onClick={() => handleToggle(todo.id, todo.completed)}>
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      setEditTodoId(todo.id);
                      setEditTodoTitle(todo.title);
                    }}>
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
