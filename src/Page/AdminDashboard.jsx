import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Badge, Alert } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { ListOfOrchids as InitialOrchids } from '../ListOfOrchids';
import './AdminDashboard.css';

function AdminDashboard() {
  const { isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [orchids, setOrchids] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);

  // Redirect if not admin
  if (!isLoggedIn() || !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Load orchids from localStorage or use initial data
  useEffect(() => {
    const stored = localStorage.getItem('admin_orchids');
    if (stored) {
      setOrchids(JSON.parse(stored));
    } else {
      setOrchids(InitialOrchids);
      localStorage.setItem('admin_orchids', JSON.stringify(InitialOrchids));
    }
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAdd = () => {
    setEditingOrchid(null);
    setFormData({
      name: '',
      category: 'Cattleya',
      origin: '',
      color: '',
      price: '',
      careLevel: 'Easy',
      isSpecial: false,
      isNatural: false,
      theme: 'tet',
      image: '',
      description: '',
      rating: 5,
      numberOfLike: 0
    });
    setShowModal(true);
  };

  const handleEdit = (orchid) => {
    setEditingOrchid(orchid);
    setFormData(orchid);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this orchid?')) {
      const updated = orchids.filter(o => o.Id !== id);
      setOrchids(updated);
      localStorage.setItem('admin_orchids', JSON.stringify(updated));
      showAlert('Orchid deleted successfully', 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let updated;
    if (editingOrchid) {
      // Update existing
      updated = orchids.map(o => o.Id === editingOrchid.Id ? { ...formData, Id: editingOrchid.Id } : o);
      showAlert('Orchid updated successfully');
    } else {
      // Add new
      const newId = Math.max(...orchids.map(o => o.Id), 0) + 1;
      updated = [...orchids, { ...formData, Id: newId, feedback: [] }];
      showAlert('Orchid added successfully');
    }
    
    setOrchids(updated);
    localStorage.setItem('admin_orchids', JSON.stringify(updated));
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'numberOfLike' || name === 'rating') ? parseFloat(value) : value
    }));
  };

  return (
    <div className="admin-dashboard">
      <Container className="py-5">
        {/* Header */}
        <div className="admin-header mb-4">
          <Row className="align-items-center">
            <Col>
              <h1><i className="bi bi-shield-check me-2"></i>Admin Dashboard</h1>
              <p className="text-muted">Manage your orchid collection</p>
            </Col>
            <Col className="text-end">
              <Button variant="primary" onClick={handleAdd}>
                <i className="bi bi-plus-circle me-2"></i>
                Add New Orchid
              </Button>
            </Col>
          </Row>
        </div>

        {/* Alert */}
        {alert && (
          <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h3>{orchids.length}</h3>
                <p><i className="bi bi-flower2 me-2"></i>Total Orchids</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h3>{orchids.filter(o => o.isSpecial).length}</h3>
                <p><i className="bi bi-star me-2"></i>Special Edition</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h3>{orchids.filter(o => o.isNatural).length}</h3>
                <p><i className="bi bi-leaf me-2"></i>Natural</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h3>${orchids.reduce((sum, o) => sum + (o.price || 0), 0).toFixed(2)}</h3>
                <p><i className="bi bi-currency-dollar me-2"></i>Total Value</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Orchids Table */}
        <Card className="orchids-table-card">
          <Card.Header>
            <h5><i className="bi bi-table me-2"></i>Orchids Management</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Origin</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orchids.map(orchid => (
                    <tr key={orchid.Id}>
                      <td>{orchid.Id}</td>
                      <td>
                        <img
                          src={orchid.image}
                          alt={orchid.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </td>
                      <td><strong>{orchid.name}</strong></td>
                      <td>{orchid.category}</td>
                      <td>{orchid.origin}</td>
                      <td>${orchid.price}</td>
                      <td>
                        {orchid.isSpecial && <Badge bg="warning" text="dark" className="me-1">Special</Badge>}
                        {orchid.isNatural && <Badge bg="success">Natural</Badge>}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(orchid)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(orchid.Id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Modal for Add/Edit */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingOrchid ? 'Edit Orchid' : 'Add New Orchid'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category *</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category || ''}
                      onChange={handleChange}
                      required
                    >
                      <option value="Cattleya">Cattleya</option>
                      <option value="Dendrobium">Dendrobium</option>
                      <option value="Phalaenopsis">Phalaenopsis</option>
                      <option value="Vanda">Vanda</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Origin *</Form.Label>
                    <Form.Control
                      type="text"
                      name="origin"
                      value={formData.origin || ''}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Color *</Form.Label>
                    <Form.Control
                      type="text"
                      name="color"
                      value={formData.color || ''}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price || ''}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Care Level *</Form.Label>
                    <Form.Select
                      name="careLevel"
                      value={formData.careLevel || ''}
                      onChange={handleChange}
                      required
                    >
                      <option value="Easy">Easy</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Theme *</Form.Label>
                    <Form.Select
                      name="theme"
                      value={formData.theme || ''}
                      onChange={handleChange}
                      required
                    >
                      <option value="tet">Tet</option>
                      <option value="women">Women's Day</option>
                      <option value="teacher">Teacher's Day</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Image URL *</Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Check
                    type="checkbox"
                    name="isSpecial"
                    label="Special Edition"
                    checked={formData.isSpecial || false}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={4}>
                  <Form.Check
                    type="checkbox"
                    name="isNatural"
                    label="Natural"
                    checked={formData.isNatural || false}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingOrchid ? 'Update' : 'Add'} Orchid
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default AdminDashboard;
