import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

function Profile() {
  const { user, updateProfile, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || ''
  });
  const [success, setSuccess] = useState(false);

  // Redirect if not logged in
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      bio: user?.bio || ''
    });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            {success && (
              <Alert variant="success" dismissible onClose={() => setSuccess(false)}>
                <i className="bi bi-check-circle-fill me-2"></i>
                Profile updated successfully!
              </Alert>
            )}

            <Card className="profile-card shadow">
              <Card.Body>
                <Row>
                  {/* Left Side - Profile Image & Info */}
                  <Col md={4} className="profile-sidebar">
                    <div className="text-center">
                      <div className="profile-avatar-wrapper">
                        <img
                          src={user?.photoUrl}
                          alt={user?.name}
                          className="profile-avatar"
                        />
                        {user?.role === 'admin' && (
                          <div className="admin-badge">
                            <i className="bi bi-shield-check-fill"></i> Admin
                          </div>
                        )}
                      </div>
                      <h3 className="mt-3">{user?.name}</h3>
                      <p className="text-muted">{user?.email}</p>
                      <div className="role-badge">
                        <i className={`bi ${user?.role === 'admin' ? 'bi-shield-fill' : 'bi-person-fill'}`}></i>
                        {user?.role === 'admin' ? 'Administrator' : 'Member'}
                      </div>
                      <p className="text-muted small mt-3">
                        <i className="bi bi-calendar3"></i> Joined {new Date(user?.joinedDate).toLocaleDateString()}
                      </p>
                      
                      <Button
                        variant="outline-danger"
                        className="mt-3 w-100"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </Button>
                    </div>
                  </Col>

                  {/* Right Side - Profile Form */}
                  <Col md={8} className="profile-content">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4>
                        <i className="bi bi-person-circle me-2"></i>
                        Profile Information
                      </h4>
                      {!editing && (
                        <Button
                          variant="primary"
                          onClick={() => setEditing(true)}
                        >
                          <i className="bi bi-pencil me-2"></i>
                          Edit Profile
                        </Button>
                      )}
                    </div>

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-person me-2"></i>
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-envelope me-2"></i>
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          readOnly
                        />
                        <Form.Text className="text-muted">
                          Email cannot be changed
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-telephone me-2"></i>
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          disabled={!editing}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-geo-alt me-2"></i>
                          Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          disabled={!editing}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-chat-left-text me-2"></i>
                          Bio
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Tell us about yourself and your love for orchids..."
                          disabled={!editing}
                        />
                      </Form.Group>

                      {editing && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="success"
                            type="submit"
                            className="flex-fill"
                          >
                            <i className="bi bi-check-lg me-2"></i>
                            Save Changes
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={handleCancel}
                            className="flex-fill"
                          >
                            <i className="bi bi-x-lg me-2"></i>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Additional Info Cards */}
            <Row className="mt-4">
              <Col md={6}>
                <Card className="info-card">
                  <Card.Body>
                    <h5><i className="bi bi-star-fill text-warning me-2"></i>My Feedback</h5>
                    <p className="text-muted">You can leave feedback on orchids you've purchased or experienced.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                      Browse Orchids
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="info-card">
                  <Card.Body>
                    <h5><i className="bi bi-heart-fill text-danger me-2"></i>My Favorites</h5>
                    <p className="text-muted">Save your favorite orchids to your collection.</p>
                    <Button variant="outline-primary" onClick={() => navigate('/')}>
                      View Collection
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
