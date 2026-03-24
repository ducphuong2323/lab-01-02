import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

// Get Google Client ID from environment variable
// Create a .env file and add: VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function Login() {
  const { login, loginWithGoogle, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);
  const isGoogleConfigured = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID.length > 0 && !GOOGLE_CLIENT_ID.includes('YOUR_');

  // Redirect if already logged in
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    // Only initialize Google Sign-In if Client ID is configured
    if (isGoogleConfigured && window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      // Render the Google Sign-In button
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with',
            shape: 'rectangular',
          }
        );
      }
    }
  }, [isGoogleConfigured]);

  const handleGoogleResponse = async (response) => {
    setError('');
    setLoading(true);

    try {
      // Decode the JWT token to get user info
      const decoded = jwtDecode(response.credential);
      
      // Extract user information
      const userEmail = decoded.email;
      const userName = decoded.name;
      const userPicture = decoded.picture;

      console.log('Google user info:', { userEmail, userName, userPicture });

      // Login with Google
      await loginWithGoogle(userEmail, userName, userPicture);
      navigate('/');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Đăng nhập Google thất bại: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleTestAccounts = (accountType) => {
    if (accountType === 'admin') {
      setEmail('admin@orchidparadise.com');
      setPassword('admin123');
    } else {
      setEmail('member@example.com');
      setPassword('member123');
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={10} lg={8}>
            <Card className="login-card shadow-lg">
              <Row className="g-0">
                {/* Left Side - Welcome Section */}
                <Col md={6} className="login-welcome">
                  <div className="welcome-content">
                    <i className="bi bi-flower1 welcome-icon"></i>
                    <h2>Chào mừng đến</h2>
                    <h1>Orchid Paradise</h1>
                    <p>Khám phá và chia sẻ đam mê của bạn về những loài lan tuyệt đẹp</p>
                    <div className="welcome-features">
                      <div className="feature-item">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Đánh giá và nhận xét về lan</span>
                      </div>
                      <div className="feature-item">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Quản lý bộ sưu tập của bạn</span>
                      </div>
                      <div className="feature-item">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Kết nối với những người đam mê</span>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Right Side - Login Form */}
                <Col md={6} className="login-form-section">
                  <div className="login-form-content">
                    <h3 className="text-center mb-4">Đăng nhập</h3>

                    {error && (
                      <Alert variant="danger" dismissible onClose={() => setError('')}>
                        {error}
                      </Alert>
                    )}

                    {/* Warning if Google Client ID not configured */}
                    {!isGoogleConfigured && (
                      <Alert variant="warning">
                        <Alert.Heading><i className="bi bi-exclamation-triangle me-2"></i>Cần cấu hình Google Client ID</Alert.Heading>
                        <p className="mb-2">Để sử dụng đăng nhập Google, vui lòng:</p>
                        <ol className="mb-0 small">
                          <li>Tạo Client ID tại <Alert.Link href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</Alert.Link></li>
                          <li>Thêm vào file <code>.env</code>: <code>VITE_GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com</code></li>
                          <li>Khởi động lại server: <code>npm run dev</code></li>
                        </ol>
                        <hr />
                        <p className="mb-0 small">Xem hướng dẫn chi tiết trong file <strong>GOOGLE_SETUP.md</strong></p>
                      </Alert>
                    )}

                    {/* Google Sign-In Button (Official) - Only show if configured */}
                    {isGoogleConfigured && (
                      <div ref={googleButtonRef} className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}></div>
                    )}

                    <div className="divider">
                      <span>{isGoogleConfigured ? 'hoặc' : 'Đăng nhập bằng Email'}</span>
                    </div>

                    {/* Email/Password Form */}
                    <Form onSubmit={handleEmailLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Nhập email của bạn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                      </Button>
                    </Form>

                    {/* Test Accounts Section */}
                    <div className="test-accounts mt-4">
                      <p className="text-muted text-center small mb-2">Tài khoản dùng thử:</p>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="flex-fill"
                          onClick={() => handleTestAccounts('admin')}
                        >
                          <i className="bi bi-shield-check me-1"></i> Admin
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="flex-fill"
                          onClick={() => handleTestAccounts('member')}
                        >
                          <i className="bi bi-person me-1"></i> Member
                        </Button>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <p className="text-muted small mb-0">
                        Chưa có tài khoản? <a href="#" className="text-primary">Đăng ký</a>
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
