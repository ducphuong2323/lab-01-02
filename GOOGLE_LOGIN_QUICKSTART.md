# 🚀 Kích hoạt Google Sign-In - Hướng dẫn nhanh

## Bước 1: Lấy Google Client ID

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới
3. Vào **APIs & Services** → **OAuth consent screen** → Cấu hình app
4. Vào **Credentials** → **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Chọn **Web application**
6. **Authorized JavaScript origins**: Thêm `http://localhost:5173`
7. Nhấn **CREATE** và copy Client ID

## Bước 2: Thêm vào file .env

Tạo file `.env` ở thư mục gốc:

```env
VITE_GOOGLE_CLIENT_ID=YOUR-CLIENT-ID.apps.googleusercontent.com
```

## Bước 3: Restart server

```bash
npm run dev
```

## ✅ Xong!

Truy cập `/login` và bạn sẽ thấy nút Google Sign-In chính thức!

---

📖 **Xem hướng dẫn chi tiết**: [HUONG_DAN_GOOGLE_LOGIN.md](HUONG_DAN_GOOGLE_LOGIN.md)
