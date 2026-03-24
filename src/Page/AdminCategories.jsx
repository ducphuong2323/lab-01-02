import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import './AdminCategories.css';

function AdminCategories() {
  const { isAdmin, isLoggedIn } = useAuth();
  
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [alert, setAlert] = useState(null);

  // Redirect if not admin
  if (!isLoggedIn() || !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Load categories from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin_categories');
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      // Initialize with default categories
      const defaultCategories = [
        { id: 1, name: 'Cattleya', description: 'Known for their large, fragrant flowers', orchidCount: 0 },
        { id: 2, name: 'Dendrobium', description: 'One of the largest orchid genera', orchidCount: 0 },
        { id: 3, name: 'Phalaenopsis', description: 'Moth orchids, popular for beginners', orchidCount: 0 },
        { id: 4, name: 'Vanda', description: 'Tropical orchids with vibrant colors', orchidCount: 0 }
      ];
      setCategories(defaultCategories);
      localStorage.setItem('admin_categories', JSON.stringify(defaultCategories));
    }
  }, []);

  // Update orchid counts
  useEffect(() => {
    const orchids = JSON.parse(localStorage.getItem('admin_orchids') || '[]');
    const updatedCategories = categories.map(cat => ({
      ...cat,
      orchidCount: orchids.filter(o => o.category === cat.name).length
    }));
    setCategories(updatedCategories);
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const category = categories.find(c => c.id === id);
    
    if (category.orchidCount > 0) {
      showAlert(`Cannot delete "${category.name}". It has ${category.orchidCount} orchid(s) assigned.`, 'danger');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      const updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      localStorage.setItem('admin_categories', JSON.stringify(updated));
      showAlert('Category deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for duplicate name
    const duplicate = categories.find(
      c => c.name.toLowerCase() === formData.name.toLowerCase() && c.id !== editingCategory?.id
    );
    
    if (duplicate) {
      showAlert('A category with this name already exists', 'danger');
      return;
    }

    let updated;
    if (editingCategory) {
      // Update existing
      updated = categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, name: formData.name, description: formData.description }
          : c
      );
      showAlert('Category updated successfully');
    } else {
      // Add new
      const newId = Math.max(...categories.map(c => c.id), 0) + 1;
      updated = [...categories, { id: newId, ...formData, orchidCount: 0 }];
      showAlert('Category added successfully');
    }
    
    setCategories(updated);
    localStorage.setItem('admin_categories', JSON.stringify(updated));
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-categories">
      <Container className="py-5">
        {/* Header */}
        <div className="admin-header mb-4">
          <Row className="align-items-center">
            <Col>
              <h1><i className="bi bi-tags me-2"></i>Category Management</h1>
              <p className="text-muted">Organize your orchid collection</p>
            </Col>
            <Col className="text-end">
              <Button variant="primary" onClick={handleAdd}>
                <i className="bi bi-plus-circle me-2"></i>
                Add New Category
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

        {/* Statistics */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h3>{categories.length}</h3>
                <p><i className="bi bi-tags me-2"></i>Total Categories</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h3>{categories.reduce((sum, c) => sum + c.orchidCount, 0)}</h3>
                <p><i className="bi bi-flower2 me-2"></i>Total Orchids</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h3>
                  {categories.length > 0 
                    ? (categories.reduce((sum, c) => sum + c.orchidCount, 0) / categories.length).toFixed(1)
                    : 0
                  }
                </h3>
                <p><i className="bi bi-bar-chart me-2"></i>Avg per Category</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Categories Grid */}
        <Row>
          {categories.map(category => (
            <Col md={6} lg={4} key={category.id} className="mb-4">
              <Card className="category-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h4>{category.name}</h4>
                    <Badge bg="primary" pill>{category.orchidCount}</Badge>
                  </div>
                  <p className="text-muted">{category.description}</p>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <i className="bi bi-pencil me-1"></i>Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      disabled={category.orchidCount > 0}
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Categories Table */}
        <Card className="categories-table-card mt-4">
          <Card.Header>
            <h5><i className="bi bi-table me-2"></i>Detailed View</h5>
          </Card.Header>
          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Orchid Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td><strong>{category.name}</strong></td>
                    <td>{category.description}</td>
                    <td>
                      <Badge bg={category.orchidCount > 0 ? 'success' : 'secondary'} pill>
                        {category.orchidCount}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(category)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                        disabled={category.orchidCount > 0}
                        title={category.orchidCount > 0 ? 'Cannot delete category with orchids' : 'Delete category'}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Modal for Add/Edit */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Category Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Cattleya, Dendrobium"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of this category"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingCategory ? 'Update' : 'Add'} Category
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default AdminCategories;
