// // TodoForm.js
// import React, { useState } from 'react';
// import { Form, Button, Col } from 'react-bootstrap';

// const TodoForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     image: null,
//     name: '',
//     gender: '',
//     course: '',
//     fees: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'image' ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="p-3 border rounded">
//       <Form.Group controlId="formImage" className="mb-3">
//         <h1 className='text-center '>Create Todo</h1>
//         <Form.Label>Image</Form.Label>
//         <Form.Control type="file" name="image" onChange={handleChange} />
//       </Form.Group>

//       <Form.Group controlId="formName" className="mb-3">
//         <Form.Label>Name</Form.Label>
//         <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//       </Form.Group>

//       <Form.Group controlId="formGender" className="mb-3">
//         <Form.Label>Gender</Form.Label>
//         <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </Form.Select>
//       </Form.Group>

//       <Form.Group controlId="formCourse" className="mb-3">
//         <Form.Label>Course</Form.Label>
//         <Form.Control type="text" name="course" value={formData.course} onChange={handleChange} required />
//       </Form.Group>

//       <Form.Group controlId="formFees" className="mb-3">
//         <Form.Label>Fees</Form.Label>
//         <Form.Control type="number" name="fees" value={formData.fees} onChange={handleChange} required />
//       </Form.Group>

//       <div className='text-right'>
//       <Button type="submit"  variant="primary">Add Todo</Button>
//       </div>
//     </Form>
//   );
// };

// export default TodoForm;


// TodoForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const TodoForm = ({ onSubmit, initialData = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    gender: '',
    course: '',
    fees: '',
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.image && typeof initialData.image !== 'string') {
        setPreview(URL.createObjectURL(initialData.image));
      } else if (typeof initialData.image === 'string') {
        setPreview(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEdit) {
      setFormData({ image: null, name: '', gender: '', course: '', fees: '' });
      setPreview(null);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleChange} />
        {preview && <img src={preview} alt="Preview" className="mt-2" width="100" />}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Course</Form.Label>
        <Form.Control type="text" name="course" value={formData.course} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fees</Form.Label>
        <Form.Control type="number" name="fees" value={formData.fees} onChange={handleChange} required />
      </Form.Group>

      <Button type="submit" variant="primary">
        {isEdit ? 'Update ToDo' : 'Add ToDo'}
      </Button>
    </Form>
  );
};

export default TodoForm;

