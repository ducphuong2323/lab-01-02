# Hướng dẫn cài đặt Google Sign-In / Google Sign-In Setup Guide

## Tiếng Việt

### Bước 1: Tạo Google Client ID

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo một project mới hoặc chọn project có sẵn
3. Vào **APIs & Services** > **Credentials**
4. Nhấn **Create Credentials** > **OAuth client ID**
5. Chọn **Application type**: Web application
6. **Authorized JavaScript origins**: Thêm:
   - `http://localhost:5173`
   - `http://localhost:3000`
7. **Authorized redirect URIs**: Có thể để trống cho Google Identity Services
8. Nhấn **Create** và copy **Client ID**

### Bước 2: Cập nhật Client ID trong code

Mở file `src/Page/Login.jsx` và thay thế dòng này:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR-ACTUAL-CLIENT-ID.apps.googleusercontent.com';
```

Với Client ID thực tế của bạn:

```javascript
const GOOGLE_CLIENT_ID = '123456789-abcdefghijklmnop.apps.googleusercontent.com';
```

### Bước 3: Chạy ứng dụng

```bash
npm run dev
```

### Sử dụng

- **Nút Google chính thức**: Sẽ xuất hiện nếu bạn đã cấu hình Client ID đúng
- **Nút "Continue with Google (Demo)"**: Sử dụng cho demo mà không cần Client ID thật

---

## English

### Step 1: Create Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Application type**: Web application
6. **Authorized JavaScript origins**: Add:
   - `http://localhost:5173`
   - `http://localhost:3000`
7. **Authorized redirect URIs**: Can leave empty for Google Identity Services
8. Click **Create** and copy the **Client ID**

### Step 2: Update Client ID in code

Open `src/Page/Login.jsx` and replace this line:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR-ACTUAL-CLIENT-ID.apps.googleusercontent.com';
```

With your actual Client ID:

```javascript
const GOOGLE_CLIENT_ID = '123456789-abcdefghijklmnop.apps.googleusercontent.com';
```

### Step 3: Run the application

```bash
npm run dev
```

### Usage

- **Official Google Button**: Will appear if you configured the Client ID correctly
- **"Continue with Google (Demo)" Button**: Use for demo without a real Client ID

---

## Test Accounts (Email/Password Login)

- **Admin**: `admin@orchidparadise.com` / `admin123`
- **Member**: `member@example.com` / `member123`

## Features with Google Login

When you sign in with Google, the app will:
- ✅ Get your real name from Google
- ✅ Get your email address
- ✅ Get your profile picture
- ✅ Automatically create a user profile
- ✅ Remember you across sessions (localStorage)

## Notes

- Google Sign-In works in development (localhost)
- For production, add your production domain to Authorized JavaScript origins
- The demo button asks for email and name via prompts (fallback method)
