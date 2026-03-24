import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function Login() {
  const { login, loginWithGoogle, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const googleButtonRef = useRef(null);
  const googleInitializedRef = useRef(false);

  const isGoogleConfigured =
    typeof GOOGLE_CLIENT_ID === 'string' &&
    GOOGLE_CLIENT_ID.trim().length > 0 &&
    !GOOGLE_CLIENT_ID.includes('YOUR_');

  const handleGoogleResponse = useCallback(
    async (response) => {
      setError('');
      setLoading(true);

      try {
        if (!response?.credential) {
          throw new Error('Không nhận được credential từ Google.');
        }

        const decoded = jwtDecode(response.credential);

        const userEmail = decoded?.email || '';
        const userName = decoded?.name || 'Google User';
        const userPicture = decoded?.picture || '';

        if (!userEmail) {
          throw new Error('Không lấy được email từ tài khoản Google.');
        }

        await loginWithGoogle(userEmail, userName, userPicture);
        navigate('/');
      } catch (err) {
        console.error('Google login error:', err);
        setError('Đăng nhập Google thất bại: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    },
    [loginWithGoogle, navigate]
  );

  useEffect(() => {
    console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID);
console.log('window.google:', window.google);
console.log('googleButtonRef.current:', googleButtonRef.current);
    if (!isGoogleConfigured) return;

    const waitForGoogle = () => {
      if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id ||
        !googleButtonRef.current
      ) {
        return false;
      }

      if (googleInitializedRef.current) {
        return true;
      }

      try {
        googleInitializedRef.current = true;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        googleButtonRef.current.innerHTML = '';

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: 350,
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        });

        return true;
      } catch (err) {
        console.error('Google Sign-In initialization error:', err);
        setError('Lỗi khởi tạo Google Sign-In: ' + (err.message || 'Unknown error'));
        googleInitializedRef.current = false;
        return true;
      }
    };

    if (waitForGoogle()) return;

    const intervalId = setInterval(() => {
      if (waitForGoogle()) {
        clearInterval(intervalId);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [handleGoogleResponse, isGoogleConfigured]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error('Email login error:', err);
      setError('Có lỗi xảy ra trong quá trình đăng nhập');
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

  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={10} lg={8}>
            <Card className="login-card shadow-lg">
              <Row className="g-0">
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

                <Col md={6} className="login-form-section">
                  <div className="login-form-content">
                    <h3 className="text-center mb-4">Đăng nhập</h3>

                    {error && (
                      <Alert variant="danger" dismissible onClose={() => setError('')}>
                        {error}
                      </Alert>
                    )}

                    {!isGoogleConfigured && (
                      <Alert variant="warning">
                        <Alert.Heading>
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          Cần cấu hình Google Client ID
                        </Alert.Heading>
                        <p className="mb-2">Để sử dụng đăng nhập Google, vui lòng:</p>
                        <ol className="mb-0 small">
                          <li>Tạo Client ID tại Google Cloud Console</li>
                          <li>
                            Thêm vào file <code>.env</code>:
                            <br />
                            <code>VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com</code>
                          </li>
                          <li>
                            Khởi động lại server: <code>npm run dev</code>
                          </li>
                        </ol>
                      </Alert>
                    )}

                    {isGoogleConfigured && (
                      <div className="mb-3">
                        <div ref={googleButtonRef} className="d-flex justify-content-center"></div>
                        <div className="text-center mt-2">
                          <small className="text-muted">
                            <i className="bi bi-shield-check me-1"></i>
                            Đăng nhập an toàn với Google
                          </small>
                        </div>
                      </div>
                    )}

                    <div className="divider">
                      <span>{isGoogleConfigured ? 'hoặc' : 'Đăng nhập bằng Email'}</span>
                    </div>

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