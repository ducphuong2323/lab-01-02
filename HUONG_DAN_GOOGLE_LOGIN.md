# Hướng dẫn cài đặt Google Sign-In

## 📋 Tổng quan

Ứng dụng này sử dụng **Google Identity Services** để cho phép người dùng đăng nhập bằng tài khoản Google thật. Bạn cần tạo **Google OAuth 2.0 Client ID** để kích hoạt tính năng này.

---

## 🚀 Bước 1: Tạo Google Cloud Project

### 1.1. Truy cập Google Cloud Console
- Mở trình duyệt và vào: [https://console.cloud.google.com/](https://console.cloud.google.com/)
- Đăng nhập bằng tài khoản Google của bạn

### 1.2. Tạo Project mới
1. Nhấn vào dropdown **Select a project** ở góc trên bên trái
2. Nhấn nút **NEW PROJECT**
3. Điền thông tin:
   - **Project name**: `Orchid Paradise` (hoặc tên tùy ý)
   - **Organization**: Để mặc định (No organization)
4. Nhấn **CREATE**
5. Đợi vài giây để project được tạo

---

## 🔐 Bước 2: Cấu hình OAuth Consent Screen

### 2.1. Vào OAuth consent screen
1. Trong menu bên trái, vào **APIs & Services** → **OAuth consent screen**
2. Chọn **External** (cho phép bất kỳ ai có tài khoản Google đăng nhập)
3. Nhấn **CREATE**

### 2.2. Điền thông tin App
**Tab 1: OAuth consent screen**
- **App name**: `Orchid Paradise`
- **User support email**: Chọn email của bạn từ dropdown
- **App logo**: (Tùy chọn, có thể bỏ qua)
- **Application home page**: `http://localhost:5173`
- **Authorized domains**: Bỏ trống khi develop
- **Developer contact information**: Nhập email của bạn

Nhấn **SAVE AND CONTINUE**

**Tab 2: Scopes**
- Nhấn **ADD OR REMOVE SCOPES**
- Chọn 3 scope sau:
  - ✅ `.../auth/userinfo.email`
  - ✅ `.../auth/userinfo.profile`
  - ✅ `openid`
- Nhấn **UPDATE** → **SAVE AND CONTINUE**

**Tab 3: Test users** (Tùy chọn)
- Có thể thêm email test users hoặc bỏ qua
- Nhấn **SAVE AND CONTINUE**

**Tab 4: Summary**
- Kiểm tra lại thông tin
- Nhấn **BACK TO DASHBOARD**

---

## 🎯 Bước 3: Tạo OAuth 2.0 Client ID

### 3.1. Tạo Credentials
1. Vào **APIs & Services** → **Credentials**
2. Nhấn **+ CREATE CREDENTIALS** ở trên
3. Chọn **OAuth client ID**

### 3.2. Cấu hình Web Application
1. **Application type**: Chọn **Web application**
2. **Name**: `Orchid Paradise Web Client`
3. **Authorized JavaScript origins**:
   - Nhấn **+ ADD URI**
   - Thêm: `http://localhost:5173`
   - Nhấn **+ ADD URI** lần nữa
   - Thêm: `http://localhost:3000` (backup cho port khác)
4. **Authorized redirect URIs**: 
   - Có thể để trống (Google Identity Services không cần)
5. Nhấn **CREATE**

### 3.3. Lấy Client ID
- Cửa sổ popup hiện ra với **Client ID** và **Client Secret**
- **COPY** chuỗi Client ID (dạng: `123456789-abc...xyz.apps.googleusercontent.com`)
- Nhấn **OK**

---

## ⚙️ Bước 4: Cấu hình ứng dụng

### 4.1. Tạo file .env
1. Mở VS Code
2. Tại thư mục gốc project (cùng cấp với `package.json`)
3. Tạo file mới tên `.env`
4. Thêm nội dung (thay `YOUR_CLIENT_ID` bằng Client ID thật):

```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijk.apps.googleusercontent.com
```

**Ví dụ thực tế:**
```env
VITE_GOOGLE_CLIENT_ID=461234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

### 4.2. Kiểm tra .gitignore
File `.gitignore` đã được cập nhật để bảo vệ `.env`:
```
.env
.env.local
```

**⚠️ LƯU Ý**: Không commit file `.env` lên Git để bảo mật Client ID!

---

## 🏃 Bước 5: Chạy ứng dụng

### 5.1. Khởi động lại server
```bash
npm run dev
```

### 5.2. Mở trình duyệt
- Truy cập: [http://localhost:5173/login](http://localhost:5173/login)
- Bạn sẽ thấy nút **Google Sign-In** chính thức

### 5.3. Test đăng nhập
1. Nhấn nút Google Sign-In
2. Chọn tài khoản Google
3. Cho phép ứng dụng truy cập thông tin
4. Đăng nhập thành công! ✅

---

## ✨ Tính năng sau khi đăng nhập

Khi đăng nhập bằng Google, ứng dụng sẽ tự động:
- ✅ Lấy **tên thật** từ Google profile
- ✅ Lấy **email** đã xác thực
- ✅ Lấy **ảnh đại diện** từ Google
- ✅ Hiển thị avatar trên navbar
- ✅ Lưu thông tin vào localStorage
- ✅ Cho phép đánh giá và feedback orchids

---

## 🔍 Xử lý lỗi thường gặp

### Lỗi: "The OAuth client was not found"
**Nguyên nhân**: Client ID sai hoặc chưa cấu hình
**Giải pháp**: 
- Kiểm tra lại Client ID trong file `.env`
- Đảm bảo không có khoảng trắng thừa
- Khởi động lại server

### Lỗi: "Invalid origin"
**Nguyên nhân**: URL không nằm trong **Authorized JavaScript origins**
**Giải pháp**:
- Vào Google Cloud Console → Credentials → Edit OAuth client
- Thêm chính xác URL đang chạy (vd: `http://localhost:5173`)
- Không có dấu `/` ở cuối

### Lỗi: "Access blocked: This app's request is invalid"
**Nguyên nhân**: OAuth consent screen chưa cấu hình đúng
**Giải pháp**:
- Quay lại **OAuth consent screen**
- Đảm bảo đã điền đầy đủ thông tin bắt buộc
- Thêm scope: `userinfo.email`, `userinfo.profile`, `openid`

### Không thấy nút Google Sign-In
**Nguyên nhân**: File `.env` chưa được load hoặc thiếu Client ID
**Giải pháp**:
1. Kiểm tra file `.env` tồn tại ở thư mục gốc
2. Kiểm tra tên biến: `VITE_GOOGLE_CLIENT_ID` (đúng định dạng Vite)
3. Restart server: `Ctrl+C` rồi `npm run dev` lại

---

## 📝 Tài khoản test Email/Password

Nếu không muốn dùng Google, có thể dùng tài khoản test:

- **Admin**: 
  - Email: `admin@orchidparadise.com`
  - Password: `admin123`
  
- **Member**: 
  - Email: `member@example.com`
  - Password: `member123`

---

## 🌐 Deploy lên Production

Khi deploy lên server thật (vd: Vercel, Netlify):

1. **Thêm production domain vào Google Cloud Console**:
   - Vào Credentials → Edit OAuth client
   - Thêm domain production vào **Authorized JavaScript origins**
   - Vd: `https://orchid-paradise.vercel.app`

2. **Cập nhật biến môi trường**:
   - Thêm `VITE_GOOGLE_CLIENT_ID` vào environment variables của hosting
   - Không dùng file `.env` trên production

3. **Publish OAuth Consent Screen**:
   - Vào OAuth consent screen
   - Nhấn **PUBLISH APP** (nếu muốn public)
   - Hoặc giữ ở chế độ Testing với danh sách test users

---

## 📚 Tài liệu tham khảo

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web/guides/overview)
- [OAuth 2.0 for Web Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 💡 Tips

- **Development**: Dùng localhost freely
- **Testing**: Có thể add nhiều test users trong OAuth consent screen
- **Production**: Nhớ verify domain và publish app
- **Security**: Không commit `.env` file lên Git
- **Debugging**: Mở Console (F12) để xem error logs

---

**Có vấn đề?** Kiểm tra:
1. ✅ Client ID đã đúng trong `.env`
2. ✅ Server đã restart sau khi sửa `.env`
3. ✅ URL trong browser khớp với Authorized origins
4. ✅ OAuth consent screen đã hoàn tất
5. ✅ Đã enable Google Identity Services API (tự động enable khi tạo credentials)

Chúc bạn thành công! 🎉
