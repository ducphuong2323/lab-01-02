import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './Orchids.css';

function Orchids({ orchidId, name, rating, isSpecial, isNatural, image, color, numberOfLike, origin, category, onViewDetail }) {
  const navigate = useNavigate();
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

  // Map color names to hex values
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
          <span key={i} style={{ color: i < rating ? '#ffd700' : '#ddd' }}>
            ★
          </span>
        ))}
      </span>
    );
  };

  return (
    <Card className="orchid-card" style={{ width: '100%', maxWidth: '450px' }}>
      <div style={{ position: 'relative' }}>
        <Card.Img variant="top" src={image} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {isSpecial && (
            <Badge bg="warning" text="dark" style={{ fontSize: '0.85rem', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              <i className="bi bi-star-fill"></i> Special
            </Badge>
          )}
          {isNatural && (
            <Badge bg="success" style={{ fontSize: '0.85rem', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              <i className="bi bi-leaf"></i> Natural
            </Badge>
          )}
        </div>
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="card-info">
          <div style={{ marginBottom: '8px' }}>
            <strong>Rating:</strong> {renderStars(rating)}
          </div>
          
          <div style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>Color:</strong>{' '}
              <span 
                style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: colorMap[color.toLowerCase()] || color,
                  border: color.toLowerCase() === 'white' ? '1px solid #ddd' : 'none',
                  verticalAlign: 'middle',
                  marginLeft: '5px'
                }}
                title={color}
              ></span>
              {' '}{color}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              <i className="bi bi-heart-fill text-danger"></i> {numberOfLike}
            </div>
          </div>
          
          <div style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
            <strong>Origin:</strong>
            {countryFlags[origin] ? (
              <img 
                src={countryFlags[origin]} 
                alt={origin}
                style={{ width: '24px', height: '16px', objectFit: 'cover', marginLeft: '8px', marginRight: '5px', borderRadius: '2px' }}
              />
            ) : (
              <span style={{ marginLeft: '5px', marginRight: '5px' }}>🌍</span>
            )}
            {origin}
          </div>
          
          <div>
            <strong>Category:</strong> {category}
          </div>
        </div>
        <Button 
          variant="info" 
          className="w-100"
          onClick={onViewDetail}
          style={{ marginTop: '15px' }}
        >
          <i className="bi bi-eye"></i> View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Orchids;
