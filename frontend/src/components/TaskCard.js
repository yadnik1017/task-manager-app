import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function TaskCard({ task, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
      case 'in-progress':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      default:
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
      case 'medium':
        return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
      default:
        return 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      default:
        return '⏳';
    }
  };

  const getPriorityEmoji = (priority) => {
    switch (priority) {
      case 'high':
        return '🔥';
      case 'medium':
        return '⚡';
      default:
        return '💡';
    }
  };

  return (
    <Card 
      className="mb-3 card" 
      style={{
        border: 'none',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        background: 'rgba(255, 255, 255, 0.95)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        background: getStatusColor(task.status)
      }} />
      
      <Card.Body style={{ padding: '1.5rem' }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title style={{
            fontSize: '1.3rem',
            fontWeight: '700',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            {task.title}
          </Card.Title>
          <div className="d-flex gap-2">
            <Badge 
              style={{
                background: getPriorityColor(task.priority),
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontWeight: '600',
                fontSize: '0.85rem',
                color: '#333',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              {getPriorityEmoji(task.priority)} {task.priority}
            </Badge>
            <Badge 
              style={{
                background: getStatusColor(task.status),
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontWeight: '600',
                fontSize: '0.85rem',
                color: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              {getStatusEmoji(task.status)} {task.status}
            </Badge>
          </div>
        </div>
        
        <Card.Text style={{
          color: '#666',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '1.5rem'
        }}>
          {task.description}
        </Card.Text>
        
        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onEdit(task)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1.5rem',
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
            ✏️ Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(task._id)}
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1.5rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 15px rgba(245, 87, 108, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            🗑️ Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;