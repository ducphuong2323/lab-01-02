import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <Container className="about-container py-5">
        {/* Header Section */}
        <div className="about-header text-center mb-5">
          <h1 className="about-title">
            <i className="bi bi-info-circle-fill"></i> About Orchid Paradise
          </h1>
          <p className="about-subtitle">
            Your trusted destination for premium orchids since 2020
          </p>
        </div>

        {/* Story Section */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800"
                alt="About Orchid Paradise"
                className="about-image"
              />
            </div>
          </Col>
          <Col lg={6}>
            <h2 className="section-title">Our Story</h2>
            <p className="about-text">
              Founded in 2020, Orchid Paradise has become a leading destination for orchid enthusiasts
              and collectors worldwide. Our passion for these magnificent flowers drives us to provide
              the highest quality orchids and exceptional customer service.
            </p>
            <p className="about-text">
              With over 500+ varieties sourced from the best growers across Asia, Europe, and the Americas,
              we ensure each orchid receives the care and attention it deserves. Our team of dedicated
              horticulturists works tirelessly to maintain the health and beauty of every plant.
            </p>
            <p className="about-text">
              Whether you're celebrating Lunar New Year, Women's Day, Teacher's Day, or any special occasion,
              we have the perfect orchid to make your moments memorable.
            </p>
          </Col>
        </Row>

        {/* Statistics Section */}
        <div className="stats-section mb-5">
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card className="stat-card text-center">
                <Card.Body>
                  <i className="bi bi-flower2 stat-icon"></i>
                  <h3 className="stat-number">500+</h3>
                  <p className="stat-label">Orchid Varieties</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="stat-card text-center">
                <Card.Body>
                  <i className="bi bi-people-fill stat-icon"></i>
                  <h3 className="stat-number">10,000+</h3>
                  <p className="stat-label">Happy Customers</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="stat-card text-center">
                <Card.Body>
                  <i className="bi bi-globe stat-icon"></i>
                  <h3 className="stat-number">15+</h3>
                  <p className="stat-label">Countries</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="stat-card text-center">
                <Card.Body>
                  <i className="bi bi-star-fill stat-icon"></i>
                  <h3 className="stat-number">98%</h3>
                  <p className="stat-label">Satisfaction Rate</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Mission & Vision */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="mission-card">
              <Card.Body>
                <h3>
                  <i className="bi bi-bullseye text-primary"></i> Our Mission
                </h3>
                <p>
                  To provide premium quality orchids and exceptional customer service while educating
                  our community about proper orchid care and cultivation. We strive to make the beauty
                  and elegance of orchids accessible to everyone.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="vision-card">
              <Card.Body>
                <h3>
                  <i className="bi bi-eye-fill text-success"></i> Our Vision
                </h3>
                <p>
                  To become the world's most trusted orchid supplier, known for our commitment to quality,
                  sustainability, and customer satisfaction. We envision a future where everyone can
                  experience the joy of growing and caring for orchids.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Values Section */}
        <div className="values-section">
          <h2 className="section-title text-center mb-4">Our Values</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="value-card">
                <Card.Body className="text-center">
                  <i className="bi bi-shield-check value-icon"></i>
                  <h4>Quality</h4>
                  <p>
                    We never compromise on the quality of our orchids. Each plant is carefully
                    selected and inspected to ensure it meets our high standards.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card">
                <Card.Body className="text-center">
                  <i className="bi bi-heart-fill value-icon"></i>
                  <h4>Passion</h4>
                  <p>
                    Our love for orchids drives everything we do. We're not just selling plants;
                    we're sharing our passion with fellow enthusiasts.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card">
                <Card.Body className="text-center">
                  <i className="bi bi-headset value-icon"></i>
                  <h4>Service</h4>
                  <p>
                    Customer satisfaction is our top priority. Our expert team is always ready
                    to help you with care advice and support.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card">
                <Card.Body className="text-center">
                  <i className="bi bi-recycle value-icon"></i>
                  <h4>Sustainability</h4>
                  <p>
                    We're committed to sustainable practices in cultivation and packaging,
                    protecting the environment for future generations.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card">
                <Card.Body className="text-center">
                  <i className="bi bi-mortarboard-fill value-icon"></i>
                  <h4>Education</h4>
                  <p>
                    We believe in empowering our customers with knowledge about orchid care,
                    cultivation techniques, and best practices.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card">
                <Card.Body className="text-center">
                  <i className="bi bi-award-fill value-icon"></i>
                  <h4>Excellence</h4>
                  <p>
                    We continuously strive for excellence in every aspect of our business,
                    from sourcing to delivery and customer care.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Certifications */}
        <div className="certifications-section mt-5">
          <h2 className="section-title text-center mb-4">Certifications & Awards</h2>
          <Row className="g-4 justify-content-center">
            <Col md={3} sm={6}>
              <Card className="cert-card text-center">
                <Card.Body>
                  <i className="bi bi-patch-check-fill cert-icon"></i>
                  <h5>ISO 9001</h5>
                  <p>Quality Management</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="cert-card text-center">
                <Card.Body>
                  <i className="bi bi-trophy-fill cert-icon"></i>
                  <h5>Best Orchid Supplier</h5>
                  <p>2024 Award</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="cert-card text-center">
                <Card.Body>
                  <i className="bi bi-leaf-fill cert-icon"></i>
                  <h5>Eco-Friendly</h5>
                  <p>Sustainable Practices</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="cert-card text-center">
                <Card.Body>
                  <i className="bi bi-star-fill cert-icon"></i>
                  <h5>5-Star Rating</h5>
                  <p>Customer Reviews</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default About;
