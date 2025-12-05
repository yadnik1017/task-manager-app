import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <BSNavbar 
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        padding: '1rem 0'
      }} 
      variant="dark" 
      expand="lg"
    >
      <Container>
        <BSNavbar.Brand 
          as={Link} 
          to="/" 
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          ✨ Task Manager
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {token ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/dashboard"
                  style={{
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  📊 Dashboard
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/profile"
                  style={{
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  👤 Profile
                </Nav.Link>
                <span className="navbar-text text-white me-3" style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: '500'
                }}>
                  Hello, {user.name}! 👋
                </span>
                <Button 
                  variant="light" 
                  size="sm" 
                  onClick={handleLogout}
                  style={{
                    fontWeight: '600',
                    borderRadius: '20px',
                    padding: '0.5rem 1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8f9fa';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🚪 Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ fontWeight: '500' }}>
                  🔐 Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ fontWeight: '500' }}>
                  📝 Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;