// TodoList.js
import React, { useState } from 'react';
import { Table, Button, Image, Modal } from 'react-bootstrap';
import TodoForm from './TodoForm';

const TodoList = ({ todos, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleEditClick = (todo, index) => {
    setSelectedTodo(todo);
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleModalSave = (updatedTodo) => {
    onEdit(selectedIndex, updatedTodo);
    setShowModal(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, idx) => (
            <tr key={idx}>
              <td>
                {todo.image && (
                  <Image
                    src={typeof todo.image === 'string' ? todo.image : URL.createObjectURL(todo.image)}
                    alt="img"
                    width="60"
                    height="60"
                    rounded
                  />
                )}
              </td>
              <td>{todo.name}</td>
              <td>{todo.gender}</td>
              <td>{todo.course}</td>
              <td>{todo.fees}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(todo, todo?._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(todo?._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit ToDo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTodo && (
            <TodoForm
              initialData={selectedTodo}
              onSubmit={handleModalSave}
              isEdit
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TodoList;
