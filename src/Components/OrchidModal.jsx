import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './OrchidModal.css';

function OrchidModal({ show, onHide, orchid }) {
  if (!orchid) return null;

  // Map countries to flag images
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

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg" 
      centered
      className="orchid-modal"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>
          <i className="bi bi-flower1 me-2"></i>
          {orchid.name}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="modal-body-custom">
        <div className="modal-content-grid">
          <div className="modal-image-section">
            <img 
              src={orchid.image} 
              alt={orchid.name} 
              className="modal-orchid-image"
            />
            <div className="image-badges">
              {orchid.isSpecial && (
                <span className="badge-special">
                  <i className="bi bi-star-fill"></i> Special
                </span>
              )}
              {orchid.isNatural && (
                <span className="badge-natural">
                  <i className="bi bi-leaf"></i> Natural
                </span>
              )}
            </div>
          </div>
          
          <div className="modal-info-section">
            <div className="price-section">
              <span className="price">${orchid.price}</span>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`bi bi-star${i < orchid.rating ? '-fill' : ''}`}
                  ></i>
                ))}
                <span className="rating-text">({orchid.rating}/5)</span>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <i className="bi bi-palette"></i>
                <div>
                  <strong>Color</strong>
                  <p>
                    <span 
                      style={{
                        display: 'inline-block',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: ({
                          'pink': '#ff69b4',
                          'purple': '#9370db',
                          'yellow': '#ffd700',
                          'white': '#ffffff',
                          'red': '#dc143c',
                          'orange': '#ff8c00',
                          'blue': '#4169e1',
                          'green': '#32cd32',
                        }[orchid.color.toLowerCase()] || orchid.color),
                        border: orchid.color.toLowerCase() === 'white' ? '1px solid #ddd' : '1px solid rgba(0,0,0,0.1)',
                        verticalAlign: 'middle',
                        marginRight: '8px'
                      }}
                    ></span>
                    {orchid.color}
                  </p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="bi bi-geo-alt"></i>
                <div>
                  <strong>Origin</strong>
                  <p>
                    {countryFlags[orchid.origin] ? (
                      <img 
                        src={countryFlags[orchid.origin]} 
                        alt={orchid.origin}
                        style={{ 
                          width: '28px', 
                          height: '18px', 
                          objectFit: 'cover', 
                          marginRight: '8px', 
                          borderRadius: '2px',
                          verticalAlign: 'middle'
                        }}
                      />
                    ) : (
                      <span style={{ marginRight: '8px' }}>🌍</span>
                    )}
                    {orchid.origin}
                  </p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="bi bi-tag"></i>
                <div>
                  <strong>Category</strong>
                  <p>{orchid.category}</p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="bi bi-speedometer2"></i>
                <div>
                  <strong>Care Level</strong>
                  <p>{orchid.careLevel}</p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="bi bi-heart-fill"></i>
                <div>
                  <strong>Likes</strong>
                  <p>{orchid.numberOfLike}</p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="bi bi-calendar-event"></i>
                <div>
                  <strong>Theme</strong>
                  <p className="theme-tag">
                    {orchid.theme === 'tet' && '🎊 Hoa Tết'}
                    {orchid.theme === 'women' && '💐 Hoa 8-3'}
                    {orchid.theme === 'teacher' && '📚 Hoa 20-10'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="description-section-bottom">
          <h5><i className="bi bi-info-circle"></i> Description</h5>
          <p>{orchid.description}</p>
        </div>
      </Modal.Body>
      
      <Modal.Footer className="modal-footer-custom">
        <Button variant="outline-secondary" onClick={onHide}>
          <i className="bi bi-x-circle"></i> Close
        </Button>
        <Button variant="primary" className="btn-add-cart">
          <i className="bi bi-cart-plus"></i> Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrchidModal;
