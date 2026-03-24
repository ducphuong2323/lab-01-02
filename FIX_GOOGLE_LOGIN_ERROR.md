# 🔧 Xử lý lỗi Google Sign-In

## Lỗi: "The given client ID is not found"

### ❌ Lỗi này nghĩa là:
Google không tìm thấy Client ID bạn cung cấp trong hệ thống của họ.

### ✅ Nguyên nhân & Cách sửa:

---

## 1️⃣ Kiểm tra Client ID có đúng không

### Bước 1: Mở Google Cloud Console
1. Vào [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Đảm bảo đã chọn đúng Project

### Bước 2: Tìm OAuth 2.0 Client ID
1. Trong danh sách **OAuth 2.0 Client IDs**
2. Tìm client có type là **Web application**
3. Copy **Client ID** (nhấn vào biểu tượng copy)

### Bước 3: So sánh với file .env
Mở file `.env` và kiểm tra:

```env
VITE_GOOGLE_CLIENT_ID=978326444409-d4ak7nh037519b2edh5b72kq6va8j9jj.apps.googleusercontent.com
```

**Phải khớp chính xác!**
- ❌ Không có khoảng trắng thừa
- ❌ Không có ký tự lạ
- ❌ Không nhầm Client Secret (là một chuỗi khác)

---

## 2️⃣ Cấu hình OAuth Consent Screen

Lỗi này cũng xảy ra nếu bạn **chưa cấu hình OAuth consent screen**.

### Bước 1: Kiểm tra OAuth Consent Screen
1. Vào [https://console.cloud.google.com/apis/credentials/consent](https://console.cloud.google.com/apis/credentials/consent)
2. Đảm bảo có thông tin:
   - ✅ App name
   - ✅ User support email
   - ✅ Developer contact information

### Bước 2: Kiểm tra Scopes
Phải có các scopes sau:
- ✅ `userinfo.email`
- ✅ `userinfo.profile`
- ✅ `openid`

### Bước 3: Publish Status
- Có thể để ở chế độ **Testing** (không cần publish)
- Nếu ở Testing, thêm email test users

---

## 3️⃣ Thêm Authorized JavaScript Origins

### Bước 1: Edit OAuth Client
1. Vào [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Nhấn vào **OAuth 2.0 Client ID** của bạn
3. Nhấn biểu tượng **✏️ Edit**

### Bước 2: Thêm Origins
Trong phần **Authorized JavaScript origins**, thêm:

```
http://localhost:5173
```

**Lưu ý:**
- ❌ KHÔNG có dấu `/` ở cuối: `http://localhost:5173/`
- ❌ KHÔNG dùng `https://` khi develop: `https://localhost:5173`
- ✅ Đúng format: `http://localhost:5173`

### Bước 3: Save
Nhấn **SAVE** và đợi vài giây

---

## 4️⃣ Tạo OAuth Client mới nếu cần

Nếu Client ID không tồn tại hoặc bị lỗi, tạo mới:

### Bước 1: Create Credentials
1. Vào [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Nhấn **+ CREATE CREDENTIALS**
3. Chọn **OAuth client ID**

### Bước 2: Configure
- **Application type**: Web application
- **Name**: Orchid Paradise Web Client
- **Authorized JavaScript origins**:
  - `http://localhost:5173`
  - `http://localhost:3000`

### Bước 3: Copy Client ID
Copy Client ID mới và paste vào file `.env`:

```env
VITE_GOOGLE_CLIENT_ID=YOUR-NEW-CLIENT-ID.apps.googleusercontent.com
```

---

## 5️⃣ Check Browser Console

Mở Chrome DevTools (F12) và xem lỗi chi tiết:

### Các lỗi thường gặp:

**1. "origin_mismatch"**
- Unauthorized JavaScript origin chưa được thêm
- URL không khớp chính xác

**2. "popup_closed_by_user"**
- Người dùng đóng popup login

**3. "access_denied"**
- Người dùng từ chối cấp quyền
- Hoặc không có trong danh sách test users (nếu app ở Testing mode)

**4. "invalid_client"**
- Client ID sai hoặc không tồn tại
- OAuth consent screen chưa được cấu hình

---

## 6️⃣ Restart Server

Sau khi sửa file `.env`:

```bash
# Bấm Ctrl+C để dừng server
npm run dev
```

**Lưu ý**: Vite cần restart để load lại environment variables!

---

## 7️⃣ Clear Browser Cache

Nếu vẫn lỗi, clear cache:

1. Mở Chrome DevTools (F12)
2. Right-click vào nút Reload
3. Chọn **Empty Cache and Hard Reload**

Hoặc:
- `Ctrl + Shift + Delete` → Clear browsing data

---

## 8️⃣ Check Network Tab

Mở Chrome DevTools → Network tab:

1. Reload trang
2. Tìm request đến `accounts.google.com`
3. Xem response:
   - Status 403 → Unauthorized origins
   - Status 400 → Invalid client ID
   - Status 200 → OK

---

## ✅ Checklist cuối cùng:

Trước khi test lại, kiểm tra:

- [ ] OAuth Consent Screen đã cấu hình đầy đủ
- [ ] Client ID đã copy đúng vào `.env`
- [ ] File `.env` có format đúng (không có khoảng trắng)
- [ ] Authorized JavaScript origins có `http://localhost:5173`
- [ ] Đã restart server (`npm run dev`)
- [ ] Đã clear browser cache
- [ ] URL trong browser là `http://localhost:5173/login` (không phải `https://`)

---

## 🆘 Vẫn không được?

### Option 1: Tạo Project mới
1. Tạo Google Cloud Project hoàn toàn mới
2. Cấu hình từ đầu theo hướng dẫn
3. Đảm bảo không bỏ sót bước nào

### Option 2: Dùng tài khoản Email/Password
Tạm thời dùng tài khoản test:
- Admin: `admin@orchidparadise.com` / `admin123`
- Member: `member@example.com` / `member123`

### Option 3: Check Google Cloud Console Status
- Vào [https://status.cloud.google.com/](https://status.cloud.google.com/)
- Kiểm tra xem có sự cố với Google Identity Services không

---

## 📞 Debug Info

Khi báo lỗi, cung cấp thông tin sau:

1. **Client ID** (10 ký tự đầu): `978326444409-...`
2. **URL đang chạy**: `http://localhost:5173`
3. **Error message** từ Console (F12)
4. **Screenshot** của OAuth consent screen
5. **Screenshot** của Authorized JavaScript origins

---

Làm theo checklist này từ đầu đến cuối, 99% sẽ fix được lỗi! 🎯
