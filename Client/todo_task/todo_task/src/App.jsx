import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import TodoForm from './pages/TodoForm';
import NavbarComponent from './components/Navbar';
import FooterComponent from './components/Footer';
import TodoList from './pages/TodoList';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        console.log(response.data)
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle form submission (create user)
  const handleFormSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('course', data.course);
      formData.append('fees', data.fees);
      formData.append('gender', data.gender);
      formData.append('image', data.image); // File object

      const response = await axios.post('http://localhost:5000/api/users/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
      alert('Failed to create user: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  // Handle edit
  const handleEdit = async (id, updatedTodo) => {
    try {
      console.log(id, updatedTodo)
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="container my-4">
        <TodoForm onSubmit={handleFormSubmit} />
        <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;