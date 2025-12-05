import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../utils/api';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      setFormData({
        name: response.data.name,
        email: response.data.email
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');
    setError('');

    try {
      const response = await api.put('/auth/profile', formData);
      const user = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({
        ...user,
        name: response.data.name,
        email: response.data.email
      }));
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div style={{ fontSize: '3rem' }}>⏳</div>
        <p style={{ color: 'white', fontSize: '1.2rem' }}>Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <Card style={{
            border: 'none',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <Card.Body style={{ padding: '3rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  margin: '0 auto 1rem',
                  boxShadow: '0 5px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  👤
                </div>
                <h2 style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>My Profile</h2>
                <p style={{ color: '#666' }}>Manage your account information</p>
              </div>

              {message && (
                <Alert 
                  variant="success" 
                  style={{ 
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    color: 'white',
                    fontWeight: '600',
                    marginBottom: '1.5rem'
                  }}
                >
                  ✅ {message}
                </Alert>
              )}
              {error && (
                <Alert 
                  variant="danger" 
                  style={{ 
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: '600',
                    marginBottom: '1.5rem'
                  }}
                >
                  ❌ {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: '600', color: '#333' }}>👤 Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
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

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: '600', color: '#333' }}>📧 Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
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

                <Button
                  type="submit"
                  className="w-100"
                  disabled={updating}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.75rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!updating) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {updating ? '🔄 Updating...' : '💾 Update Profile'}
                </Button>
              </Form>

              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 20%)',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <p style={{ 
                  color: 'white', 
                  margin: 0, 
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  🎯 Keep your profile up to date!
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Profile;