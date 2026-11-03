# BÀI THỰC HÀNH BUỔI 2 - THIẾT KẾ WEB - LAB 2

- **Họ và tên:** Lê Võ Đức Huy
- **Mã số sinh viên (MSSV):** `6651071098`
- **Tên Repository GitHub:** `6651071098-lab2-bat-dong-san`
- **Link Website Vercel:** `https://batdongsan-three.vercel.app/`
- **Link Video Demo:** `https://drive.google.com/file/d/1MgmJUHLKlZ-M1YmHR7B6_1r48U7lQfgf/view?usp=sharing`
- **Chủ đề website ($D = 13$):** Bất động sản (EmeraldLand Real Estate)
- **Màu chủ đạo ($C = 1$):** Emerald (`#059669`)
- **Bộ 3 tính năng bắt buộc ($F = 8$):**
  1. **Phân trang (Pagination):** Hiển thị danh sách BĐS với điều hướng trang trước/sau, danh sách số trang, trạng thái trang hiện tại active màu Emerald.
  2. **Form nhiều bước có validate (Multi-step Form):** Đăng tin BĐS qua 3 bước (Thông tin cơ bản $\rightarrow$ Vị trí & Tiện ích $\rightarrow$ Liên hệ & Xác nhận) kèm kiểm tra tính hợp lệ dữ liệu và Toast thông báo.
  3. **Biểu đồ thống kê (Recharts):** Trực quan hóa giá bán trung bình theo khu vực (Biểu đồ cột) và Cơ cấu phân bổ loại hình BĐS (Biểu đồ tròn).

---

## 1. CÔNG NGHỆ ÁP DỤNG
- **Ngôn ngữ:** TypeScript (bật `strict: true`, tuyệt đối không dùng `any`).
- **Build tool:** Vite 8.
- **UI Library:** React 18 (Functional Components & Hooks).
- **Styling:** Tailwind CSS (Màu chủ đạo Emerald `#059669`).
- **Routing:** React Router v6 (Điều hướng `<Link>`, các route `/`, `/property/:id`, `/item/:id`, `/stats`, `/post-property`).
- **State Management:** React Context API & `useState` (không dùng thư viện ngoài).
- **Charts:** Recharts.
- **Icons:** Lucide React.
- **Unit Testing:** Vitest (pass 100% 7 test cases của 4 hàm `utils.ts`).
- **Linter:** ESLint flat config (0 lỗi, 0 cảnh báo).

---

## 2. HƯỚNG DẪN CÀI ĐẶT & CHẠY THỰC TẾ

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển (Dev server)
npm run dev

# 3. Kiểm tra chất lượng TypeScript (Yêu cầu: 0 lỗi)
npx tsc --noEmit

# 4. Kiểm tra quy chuẩn ESLint (Yêu cầu: 0 lỗi, 0 cảnh báo)
npx eslint .

# 5. Chạy toàn bộ Unit Tests bằng Vitest (Yêu cầu: Pass 100%)
npm run test

# 6. Đóng gói ứng dụng cho Production
npm run build
```

---

## 3. ĐOẠN GIẢI THÍCH KỸ THUẬT (MỤC V.7)
*Tính năng: Form đăng tin bất động sản nhiều bước có kiểm tra tính hợp lệ dữ liệu (Multi-step Form with Validation)*

Tính năng Form nhiều bước được xây dựng nhằm tối ưu trải nghiệm người dùng (UX) khi nhập liệu thông tin bất động sản phức tạp. Quy trình được phân tách thành 3 bước tuần tự thông qua state quản lý `currentStep` (từ 1 đến 3): Bước 1 thu thập thông tin cơ bản (tiêu đề, loại hình, giá bán, diện tích); Bước 2 ghi nhận vị trí địa lý, tiện ích và mô tả; Bước 3 xác nhận thông tin liên hệ của môi giới. 

Tại mỗi bước, hệ thống áp dụng hàm xác thực chuyên biệt (`validateStep1`, `validateStep2`, `validateStep3`) trước khi cho phép người dùng chuyển sang bước tiếp theo. Dữ liệu giá bán và diện tích bắt buộc phải là số dương lớn hơn 0; địa chỉ và tiêu đề được kiểm tra độ dài tối thiểu; đặc biệt, trường email liên hệ tại bước 3 được kiểm thử trực tiếp qua hàm `validateEmail` sử dụng Regular Expression chuẩn RFC. 

Giao diện được trang bị thanh tiến trình (Stepper Indicator) trực quan với màu sắc chủ đạo Emerald (`#059669`). Khi dữ liệu hợp lệ và người dùng xác nhận gửi form, hàm `addProperty` từ Context API sẽ cập nhật tài sản mới vào đầu danh sách `properties` mà không cần tải lại trang, đồng thời kích hoạt component `Toast` hiển thị thông báo thành công tức thì.
