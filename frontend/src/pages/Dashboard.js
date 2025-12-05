import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import api from '../utils/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, filterStatus]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (taskData) => {
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      fetchTasks();
      setShowModal(false);
      setEditTask(null);
    } catch (err) {
      setError('Failed to save task');
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditTask(null);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    return { total, completed, inProgress, pending };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div style={{ fontSize: '3rem' }}>⏳</div>
        <p style={{ color: 'white', fontSize: '1.2rem' }}>Loading your tasks...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ minHeight: '80vh' }}>
      {/* Header Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}>
              📋 My Tasks
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Organize your work and boost productivity!
            </p>
          </div>
          <Button 
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '15px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            ➕ Create New Task
          </Button>
        </div>

        {/* Stats Cards */}
        <Row className="g-3">
          <Col md={3}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              padding: '1.5rem',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>{stats.total}</h3>
              <p style={{ margin: '0', opacity: 0.9 }}>Total Tasks</p>
            </div>
          </Col>
          <Col md={3}>
            <div style={{
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              borderRadius: '15px',
              padding: '1.5rem',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(56, 239, 125, 0.3)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>{stats.completed}</h3>
              <p style={{ margin: '0', opacity: 0.9 }}>Completed</p>
            </div>
          </Col>
          <Col md={3}>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '15px',
              padding: '1.5rem',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(245, 87, 108, 0.3)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>{stats.inProgress}</h3>
              <p style={{ margin: '0', opacity: 0.9 }}>In Progress</p>
            </div>
          </Col>
          <Col md={3}>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderRadius: '15px',
              padding: '1.5rem',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(79, 172, 254, 0.3)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>{stats.pending}</h3>
              <p style={{ margin: '0', opacity: 0.9 }}>Pending</p>
            </div>
          </Col>
        </Row>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')} style={{
        borderRadius: '15px',
        border: 'none',
        boxShadow: '0 5px 15px rgba(220, 53, 69, 0.3)'
      }}>{error}</Alert>}

      {/* Search and Filter Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
      }}>
        <Row className="g-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="🔍 Search tasks by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: '15px',
                padding: '0.75rem 1.5rem',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                borderRadius: '15px',
                padding: '0.75rem 1.5rem',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="all">🎯 All Status</option>
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Tasks List */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        minHeight: '300px'
      }}>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ color: '#666', marginBottom: '1rem' }}>No tasks found</h3>
            <p style={{ color: '#999' }}>Create your first task to get started!</p>
            <Button 
              onClick={() => setShowModal(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '0.75rem 2rem',
                marginTop: '1rem',
                fontWeight: '600'
              }}
            >
              ➕ Create Task
            </Button>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      <TaskForm
        show={showModal}
        onHide={handleCloseModal}
        onSubmit={handleCreateTask}
        editTask={editTask}
      />
    </Container>
  );
}

export default Dashboard;