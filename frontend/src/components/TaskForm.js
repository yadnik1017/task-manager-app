import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function TaskForm({ show, onHide, onSubmit, editTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        priority: editTask.priority
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium'
      });
    }
  }, [editTask, show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <div style={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: 'none'
      }}>
        <Modal.Header 
          closeButton 
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '1.5rem'
          }}
        >
          <Modal.Title style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            {editTask ? '✏️ Edit Task' : '➕ Create New Task'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ padding: '2rem' }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#333', fontSize: '1rem' }}>
                📝 Title
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  borderRadius: '10px',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#333', fontSize: '1rem' }}>
                📄 Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{
                  borderRadius: '10px',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#333', fontSize: '1rem' }}>
                📊 Status
              </Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  borderRadius: '10px',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              >
                <option value="pending">⏳ Pending</option>
                <option value="in-progress">🔄 In Progress</option>
                <option value="completed">✅ Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#333', fontSize: '1rem' }}>
                🎯 Priority
              </Form.Label>
              <Form.Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  borderRadius: '10px',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              >
                <option value="low">💡 Low</option>
                <option value="medium">⚡ Medium</option>
                <option value="high">🔥 High</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ border: 'none', padding: '1.5rem' }}>
            <Button 
              variant="secondary" 
              onClick={onHide}
              style={{
                borderRadius: '10px',
                padding: '0.75rem 1.5rem',
                fontWeight: '600',
                border: 'none',
                background: '#6c757d'
              }}
            >
              ❌ Cancel
            </Button>
            <Button 
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                padding: '0.75rem 1.5rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {editTask ? '💾 Update Task' : '✨ Create Task'}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
}

export default TaskForm;