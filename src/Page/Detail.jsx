import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import { ListOfOrchids } from '../ListOfOrchids';
import FeedbackSection from '../Components/FeedbackSection';
import './Detail.css';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const orchid = ListOfOrchids.find(item => item.Id === parseInt(id));

  if (!orchid) {
    return (
      <Container className="detail-container">
        <div className="text-center py-5">
          <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: '4rem' }}></i>
          <h2 className="mt-3">Orchid Not Found</h2>
          <p className="text-muted">The orchid you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            <i className="bi bi-house-door"></i> Back to Home
          </Button>
        </div>
      </Container>
    );
  }

  const countryFlags = {
    'Taiwan': 'https://flagcdn.com/w320/tw.png',
    'Vietnam': 'https://flagcdn.com/w320/vn.png',
    'Thailand': 'https://flagcdn.com/w320/th.png',
    'China': 'https://flagcdn.com/w320/cn.png',
    'Japan': 'https://flagcdn.com/w320/jp.png',
    'Korea': 'https://flagcdn.com/w320/kr.png',
    'Malaysia': 'https://flagcdn.com/w320/my.png',
    'Singapore': 'https://flagcdn.com/w320/sg.png',
    'Indonesia': 'https://flagcdn.com/w320/id.png',
    'Philippines': 'https://flagcdn.com/w320/ph.png',
    'Brazil': 'https://flagcdn.com/w320/br.png',
    'Netherlands': 'https://flagcdn.com/w320/nl.png',
    'Australia': 'https://flagcdn.com/w320/au.png',
  };

  const colorMap = {
    'pink': '#ff69b4',
    'purple': '#9370db',
    'yellow': '#ffd700',
    'white': '#ffffff',
    'red': '#dc143c',
    'orange': '#ff8c00',
    'blue': '#4169e1',
    'green': '#32cd32',
  };

  const renderStars = (rating) => {
    return (
      <span className="rating-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? '#ffd700' : '#ddd', fontSize: '1.5rem' }}>
            ★
          </span>
        ))}
      </span>
    );
  };

  const themeNames = {
    'tet': 'Lunar New Year',
    'women': "Women's Day (March 8th)",
    'teacher': "Teacher's Day (November 20th)"
  };

  return (
    <div className="detail-page">
      <Container className="detail-container">
        <Button 
          variant="outline-primary" 
          className="back-btn mb-4"
          onClick={() => navigate('/')}
        >
          <i className="bi bi-arrow-left"></i> Back to Collection
        </Button>

        <Row className="detail-content">
          <Col lg={6} className="mb-4">
            <div className="detail-image-wrapper">
              <img src={orchid.image} alt={orchid.name} className="detail-image" />
              <div className="badge-container">
                {orchid.isSpecial && (
                  <Badge bg="warning" text="dark" className="detail-badge">
                    <i className="bi bi-star-fill"></i> Special Edition
                  </Badge>
                )}
                {orchid.isNatural && (
                  <Badge bg="success" className="detail-badge">
                    <i className="bi bi-leaf"></i> 100% Natural
                  </Badge>
                )}
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="detail-info">
              <h1 className="detail-title">{orchid.name}</h1>
              
              <div className="detail-rating mb-3">
                {renderStars(orchid.rating)}
                <span className="ms-2 text-muted">({orchid.rating}/5)</span>
              </div>

              <div className="detail-price mb-4">
                <span className="price">${orchid.price}</span>
              </div>

              <Card className="info-card mb-4">
                <Card.Body>
                  <Row>
                    <Col md={6} className="mb-3">
                      <div className="info-item">
                        <i className="bi bi-tag-fill text-primary"></i>
                        <div>
                          <strong>Category</strong>
                          <p className="mb-0">{orchid.category}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="info-item">
                        <i className="bi bi-geo-alt-fill text-danger"></i>
                        <div>
                          <strong>Origin</strong>
                          <p className="mb-0">
                            {countryFlags[orchid.origin] && (
                              <img 
                                src={countryFlags[orchid.origin]} 
                                alt={orchid.origin}
                                style={{ 
                                  width: '24px', 
                                  height: '16px', 
                                  objectFit: 'cover', 
                                  marginRight: '8px',
                                  borderRadius: '2px',
                                  verticalAlign: 'middle'
                                }}
                              />
                            )}
                            {orchid.origin}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="info-item">
                        <i className="bi bi-palette-fill text-info"></i>
                        <div>
                          <strong>Color</strong>
                          <p className="mb-0">
                            <span 
                              style={{
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: colorMap[orchid.color.toLowerCase()] || orchid.color,
                                border: orchid.color.toLowerCase() === 'white' ? '1px solid #ddd' : 'none',
                                verticalAlign: 'middle',
                                marginRight: '8px'
                              }}
                            ></span>
                            {orchid.color}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="info-item">
                        <i className="bi bi-heart-fill text-danger"></i>
                        <div>
                          <strong>Popularity</strong>
                          <p className="mb-0">{orchid.numberOfLike} likes</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="info-item">
                        <i className="bi bi-calendar-event-fill text-success"></i>
                        <div>
                          <strong>Theme</strong>
                          <p className="mb-0">{themeNames[orchid.theme] || orchid.theme}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="info-item">
                        <i className="bi bi-speedometer2 text-warning"></i>
                        <div>
                          <strong>Care Level</strong>
                          <p className="mb-0">{orchid.careLevel}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <div className="description-section mb-4">
                <h4><i className="bi bi-file-text"></i> Description</h4>
                <p className="description-text">{orchid.description}</p>
              </div>

              <div className="action-buttons">
                <Button variant="success" size="lg" className="w-100 mb-2">
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </Button>
                <Button variant="outline-info" size="lg" className="w-100">
                  <i className="bi bi-heart"></i> Add to Wishlist
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Feedback Section */}
        <FeedbackSection orchidId={orchid.Id} orchidName={orchid.name} />

        {/* Related Orchids Section */}
        <div className="related-section mt-5">
          <h3 className="section-title">
            <i className="bi bi-collection"></i> Related Orchids
          </h3>
          <Row>
            {ListOfOrchids
              .filter(item => item.category === orchid.category && item.Id !== orchid.Id)
              .slice(0, 3)
              .map(item => (
                <Col key={item.Id} md={4} className="mb-4">
                  <Card className="related-card" onClick={() => navigate(`/detail/${item.Id}`)}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">{item.category}</span>
                        <span className="fw-bold text-success">${item.price}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Detail;
