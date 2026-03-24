import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Contact.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      program: 0,
      message: '',
      agree: false
    },
    onSubmit: (values) => {
      setSubmitted(true);
      alert(JSON.stringify(values, null, 2));
      console.log('Form submitted:', values);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        formik.resetForm();
        setSubmitted(false);
      }, 3000);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required.')
        .min(2, 'Must be 2 characters or more'),
      email: Yup.string()
        .required('Required.')
        .email('Invalid email'),
      phone: Yup.number()
        .integer()
        .typeError('Please enter a valid number'),
      program: Yup.number()
        .integer()
        .min(1, 'Please select a program.')
        .typeError('Please select a program.'),
      message: Yup.string()
        .required('Required.')
        .min(10, 'Must be 10 characters or more'),
      agree: Yup.boolean()
        .oneOf([true], 'The terms and conditions must be accepted.')
    })
  });

  return (
    <div className="contact-page">
      <Container className="contact-container">
        {/* Header Section */}
        <div className="contact-header text-center mb-5">
          <h1 className="contact-title">
            <i className="bi bi-envelope-heart"></i> Contact Us
          </h1>
          <p className="contact-subtitle">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <Row className="g-4">
          {/* Contact Information Cards */}
          <Col lg={4}>
            <Card className="contact-info-card mb-4">
              <Card.Body>
                <div className="info-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <h4>Our Location</h4>
                <p>123 Orchid Street, District 1</p>
                <p>Ho Chi Minh City, Vietnam</p>
              </Card.Body>
            </Card>

            <Card className="contact-info-card mb-4">
              <Card.Body>
                <div className="info-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <h4>Phone Number</h4>
                <p>+84 123 456 789</p>
                <p>+84 987 654 321</p>
              </Card.Body>
            </Card>

            <Card className="contact-info-card mb-4">
              <Card.Body>
                <div className="info-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <h4>Email Address</h4>
                <p>info@orchidparadise.com</p>
                <p>support@orchidparadise.com</p>
              </Card.Body>
            </Card>

            <Card className="contact-info-card">
              <Card.Body>
                <div className="info-icon">
                  <i className="bi bi-clock-fill"></i>
                </div>
                <h4>Working Hours</h4>
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </Card.Body>
            </Card>

            {/* Social Media */}
            <Card className="social-card mt-4">
              <Card.Body className="text-center">
                <h4 className="mb-3">Follow Us</h4>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-link instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="social-link twitter">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="social-link youtube">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={8}>
            <Card className="contact-form-card">
              <Card.Body>
                <h3 className="mb-4">
                  <i className="bi bi-chat-dots"></i> Send us a Message
                </h3>
                
                {submitted && (
                  <div className="alert alert-success" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Thank you for contacting us! We'll get back to you soon.
                  </div>
                )}

                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-person"></i> Your Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          isInvalid={formik.touched.name && formik.errors.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-envelope"></i> Email Address *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          isInvalid={formik.touched.email && formik.errors.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-telephone"></i> Phone Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          isInvalid={formik.touched.phone && formik.errors.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.phone}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="bi bi-book"></i> Program of Study *
                        </Form.Label>
                        <Form.Select
                          name="program"
                          value={formik.values.program}
                          onChange={formik.handleChange}
                          isInvalid={formik.touched.program && formik.errors.program}
                        >
                          <option value={0}>Please select</option>
                          <option value={1}>Software Engineering</option>
                          <option value={2}>Information System</option>
                          <option value={3}>Information Assurance</option>
                          <option value={4}>Internet of Things</option>
                          <option value={5}>Artificial Intelligence</option>
                          <option value={6}>Digital Art & Design</option>
                        </Form.Select>
                        {formik.touched.program && formik.errors.program && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.program}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      <i className="bi bi-chat-text"></i> Your Message *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      placeholder="Write your message here..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.message && formik.errors.message}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      name="agree"
                      label="I agree to the terms and conditions *"
                      checked={formik.values.agree}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.agree && formik.errors.agree}
                    />
                    {formik.touched.agree && formik.errors.agree && (
                      <div style={{ color: '#dc3545', fontSize: '0.875em', marginTop: '0.25rem' }}>
                        {formik.errors.agree}
                      </div>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" size="lg" className="w-100 submit-btn">
                    <i className="bi bi-send"></i> Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Map Section */}
            <Card className="map-card mt-4">
              <Card.Body>
                <h4 className="mb-3">
                  <i className="bi bi-map"></i> Find Us Here
                </h4>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3258261088436!2d106.69753631533369!3d10.787318192312894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xd02d7d944830c411!2sBen%20Thanh%20Market!5e0!3m2!1sen!2s!4v1649000000000!5m2!1sen!2s"
                    width="100%"
                    height="350"
                    style={{ border: 0, borderRadius: '10px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Orchid Paradise Location"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <div className="faq-section mt-5">
          <h2 className="text-center mb-4">
            <i className="bi bi-question-circle"></i> Frequently Asked Questions
          </h2>
          <Row>
            <Col md={6}>
              <Card className="faq-card mb-3">
                <Card.Body>
                  <h5><i className="bi bi-chevron-right text-primary"></i> What are your shipping options?</h5>
                  <p>We offer standard and express shipping. All orchids are carefully packaged to ensure safe delivery.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="faq-card mb-3">
                <Card.Body>
                  <h5><i className="bi bi-chevron-right text-primary"></i> Do you offer care instructions?</h5>
                  <p>Yes! Each orchid comes with detailed care instructions tailored to its specific variety.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="faq-card mb-3">
                <Card.Body>
                  <h5><i className="bi bi-chevron-right text-primary"></i> What is your return policy?</h5>
                  <p>We offer a 30-day satisfaction guarantee. If you're not happy, we'll make it right.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="faq-card mb-3">
                <Card.Body>
                  <h5><i className="bi bi-chevron-right text-primary"></i> Can I visit your nursery?</h5>
                  <p>Yes! We welcome visitors during business hours. Please call ahead to schedule a tour.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Contact;
