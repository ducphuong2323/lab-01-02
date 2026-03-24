import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import './FeedbackSection.css';

function FeedbackSection({ orchidId, orchidName }) {
  const { user, isLoggedIn } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [userFeedback, setUserFeedback] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  // Load feedbacks from localStorage
  useEffect(() => {
    const storedFeedbacks = localStorage.getItem(`feedback_${orchidId}`);
    if (storedFeedbacks) {
      const parsed = JSON.parse(storedFeedbacks);
      setFeedbacks(parsed);
      
      // Check if current user has already left feedback
      if (user) {
        const existing = parsed.find(f => f.author === user.email);
        if (existing) {
          setUserFeedback(existing);
        }
      }
    }
  }, [orchidId, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn() || !user) {
      alert('Please login to leave feedback');
      return;
    }

    const newFeedback = {
      rating: parseInt(rating),
      comment: comment.trim(),
      author: user.email,
      authorName: user.name,
      date: new Date().toISOString()
    };

    let updatedFeedbacks;
    if (editing && userFeedback) {
      // Update existing feedback
      updatedFeedbacks = feedbacks.map(f => 
        f.author === user.email ? newFeedback : f
      );
    } else {
      // Add new feedback
      updatedFeedbacks = [...feedbacks, newFeedback];
    }

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(`feedback_${orchidId}`, JSON.stringify(updatedFeedbacks));
    
    setUserFeedback(newFeedback);
    setShowForm(false);
    setEditing(false);
    setComment('');
    setRating(5);
  };

  const handleEdit = () => {
    if (userFeedback) {
      setRating(userFeedback.rating);
      setComment(userFeedback.comment);
      setEditing(true);
      setShowForm(true);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your feedback?')) {
      const updatedFeedbacks = feedbacks.filter(f => f.author !== user.email);
      setFeedbacks(updatedFeedbacks);
      localStorage.setItem(`feedback_${orchidId}`, JSON.stringify(updatedFeedbacks));
      setUserFeedback(null);
      setShowForm(false);
      setEditing(false);
      setComment('');
      setRating(5);
    }
  };

  const renderStars = (count, interactive = false, size = 'normal') => {
    const sizeClass = size === 'large' ? 'star-large' : size === 'small' ? 'star-small' : '';
    
    return (
      <div className={`star-rating ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${sizeClass} ${star <= count ? 'filled' : ''}`}
            onClick={() => interactive && setRating(star)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  return (
    <div className="feedback-section">
      <Card className="feedback-card">
        <Card.Header className="feedback-header">
          <div>
            <h4><i className="bi bi-chat-square-text me-2"></i>Feedback & Ratings</h4>
            <p className="text-muted mb-0">
              {feedbacks.length} {feedbacks.length === 1 ? 'review' : 'reviews'}
              {feedbacks.length > 0 && (
                <span className="ms-2">
                  • Average: {renderStars(Math.round(averageRating), false, 'small')} ({averageRating})
                </span>
              )}
            </p>
          </div>
        </Card.Header>
        
        <Card.Body>
          {/* Login prompt */}
          {!isLoggedIn() && (
            <Alert variant="info">
              <i className="bi bi-info-circle me-2"></i>
              Please <a href="/login" className="alert-link">login</a> to leave your feedback on this orchid.
            </Alert>
          )}

          {/* User feedback status */}
          {isLoggedIn() && !userFeedback && !showForm && (
            <div className="text-center mb-4">
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
                className="feedback-btn"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Leave Your Feedback
              </Button>
            </div>
          )}

          {/* User's existing feedback */}
          {isLoggedIn() && userFeedback && !showForm && (
            <Alert variant="success" className="user-feedback-alert">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <strong><i className="bi bi-check-circle me-2"></i>Your Feedback</strong>
                  <div className="mt-2">
                    {renderStars(userFeedback.rating, false, 'small')}
                    <p className="mt-2 mb-0">{userFeedback.comment}</p>
                    <small className="text-muted">
                      {new Date(userFeedback.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" onClick={handleEdit}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </div>
            </Alert>
          )}

          {/* Feedback form */}
          {showForm && (
            <Card className="feedback-form-card mb-4">
              <Card.Body>
                <h5 className="mb-3">
                  {editing ? 'Edit Your Feedback' : 'Share Your Experience'}
                </h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Rating *</Form.Label>
                    <div>
                      {renderStars(rating, true, 'large')}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Comment *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about this orchid..."
                      required
                      minLength={10}
                    />
                    <Form.Text className="text-muted">
                      Minimum 10 characters
                    </Form.Text>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      <i className="bi bi-send me-2"></i>
                      {editing ? 'Update Feedback' : 'Submit Feedback'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowForm(false);
                        setEditing(false);
                        setComment('');
                        setRating(5);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}

          {/* All feedbacks list */}
          {feedbacks.length > 0 && (
            <div className="feedbacks-list">
              <h5 className="mb-3">All Reviews ({feedbacks.length})</h5>
              <ListGroup>
                {feedbacks.map((feedback, index) => (
                  <ListGroup.Item key={index} className="feedback-item">
                    <div className="feedback-item-header">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(feedback.authorName || feedback.author)}&background=random`}
                          alt={feedback.authorName || feedback.author}
                          className="feedback-avatar"
                        />
                        <div>
                          <strong>{feedback.authorName || feedback.author}</strong>
                          <div>{renderStars(feedback.rating, false, 'small')}</div>
                        </div>
                      </div>
                      <small className="text-muted">
                        {new Date(feedback.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </small>
                    </div>
                    <p className="feedback-comment">{feedback.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          {feedbacks.length === 0 && (
            <div className="no-feedbacks text-center py-4">
              <i className="bi bi-chat-dots text-muted" style={{ fontSize: '3rem' }}></i>
              <p className="text-muted mt-3">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default FeedbackSection;
