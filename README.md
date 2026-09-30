<div align="center">
  <img src="public/assets/images/hero-bg.jpg" alt="Midas Background" width="100%" style="border-radius: 12px; margin-bottom: 20px" />
  
  <h1 align="center">👑 MIDAS - HƠN CẢ MỘT CÂU CHUYỆN VỀ VÀNG</h1>
  <p align="center">
    <i>Dự án Website Giáo dục Tương tác kết hợp kiến thức Kinh tế chính trị Mác - Lênin thông qua lăng kính thần thoại Vua Midas.</i>
  </p>
  
  <p align="center">
    <a href="https://ktct-nhom-1-web-project.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Vercel-Live_Demo-black?style=for-the-badge&logo=vercel" alt="Vercel Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  </p>
</div>

---

## ✨ Điểm nhấn Dự án (Features)

Website được thiết kế với phong cách **Ancient Greek Cinematic (Dark Luxury)** cùng hệ thống tính năng tương tác phục vụ thuyết trình trực tiếp trên lớp học.

- 📖 **Đọc Ebook Tương Tác**: Tích hợp Ebook 3D (flipbook) 13 trang phân tích chuyên sâu về bản chất của tiền, vàng và các khái niệm kinh tế chính trị.
- 🗺️ **Sơ Đồ Tư Duy (Mindmap)**: Bản đồ tri thức tương tác tự động cân bằng (Auto-layout Flexbox). Hỗ trợ Zoom/Pan trên Desktop và giao diện Accordion trên Mobile giúp dễ dàng tra cứu kiến thức trong 30 giây.
- 🎮 **Trò Chơi Trắc Nghiệm (Quiz Game)**: 20 câu hỏi thử thách kiến thức với đồng hồ đếm ngược, âm thanh tương tác và giải thích chi tiết.
- 🏆 **Bảng Xếp Hạng & Cơ sở Dữ liệu Thực (Real-time Database)**: 
  - Kết nối trực tiếp **Firebase Firestore**.
  - Xếp hạng sinh viên tự động dựa trên: Số điểm -> Số câu đúng -> Thời gian trả lời.
  - Hỗ trợ lưu trữ offline `localStorage` dự phòng khi mất mạng.
- 🔒 **Admin Panel Quản Trị Khóa Game**: Tính năng ẩn (`?admin=true`) dành riêng cho Nhóm trưởng. Cho phép **Khóa/Mở Khóa Trò Chơi** thời gian thực (giúp sinh viên tập trung nghe thuyết trình trước khi được phép chơi) và **Reset Bảng Xếp Hạng**.
- 🎨 **Giao diện Cinematic**: Hiệu ứng Glassmorphism, chuyển động mượt mà với Framer Motion và bộ màu Vàng Gold/Đen sang trọng.

---

## 🛠 Công nghệ sử dụng

- **Frontend**: React 18, Vite, TypeScript
- **Styling & UI**: Tailwind CSS v3, Framer Motion, Lucide React
- **Backend & Database**: Firebase Firestore (NoSQL Real-time DB)
- **Deployment**: Vercel CI/CD
- **Ebook Hosting**: Heyzine 3D Flipbook

---

## 🚀 Hướng dẫn chạy dự án cục bộ (Local Development)

### Yêu cầu hệ thống:
- Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 18+).
- Git.

### Các bước cài đặt:

1. **Clone dự án về máy:**
   ```bash
   git clone https://github.com/Btrung-uit/KTCT-web-project.git
   ```
2. **Di chuyển vào thư mục dự án:**
   ```bash
   cd KTCT-web-project
   ```
3. **Cài đặt các thư viện cần thiết:**
   ```bash
   npm install
   ```
4. **Khởi chạy máy chủ phát triển (Dev Server):**
   ```bash
   npm run dev
   ```
5. **Mở trình duyệt và truy cập:** `http://localhost:5173/`

*(Lưu ý: Firebase đã được cấu hình sẵn môi trường trong code. Tuy nhiên đối với môi trường Production, nên thiết lập các biến môi trường trong Vercel).*

---

## 👥 Đội ngũ Phát triển

Dự án phục vụ môn học Kinh tế chính trị. Xin cảm ơn sự đóng góp của tập thể Nhóm.

| MSSV | Họ và tên | Chức vụ |
| :--- | :--- | :---: |
| **25521963** | **Nguyễn Đức Bảo Trung** | 👑 Đội trưởng |
| 25520128 | Huỳnh Kim Quốc Bảo | Thành viên |
| 25520318 | Bạch Thành Đức | Thành viên |
| 25520415 | Đoàn Ngọc Anh Duy | Thành viên |
| 25520495 | Võ Thị Bích Hằng | Thành viên |
| 25520549 | Nguyễn Chí Hiếu | Thành viên |
| 25520743 | Trịnh Gia Huy | Thành viên |
| 24520955 | Huỳnh Nguyễn Duy Linh | Thành viên |
| 24521125 | Đỗ Thanh Ngân | Thành viên |
| 24521267 | Tống Yến Nhi | Thành viên |
| 25521323 | Lê Nguyễn Phương Nhi | Thành viên |
| 25521422 | Lê Hoàn Phúc | Thành viên |
| 24521414 | Man Mỹ Phụng | Thành viên |
| 25521547 | Lê Bảo Quyên | Thành viên |
| 25521735 | Phạm Phương Thảo | Thành viên |
| 25521932 | Lê Thị Phương Trinh | Thành viên |

---
<div align="center">
  <i>"Đừng nhầm lẫn giàu có trên giấy với của cải thực."</i><br>
  <b>— Midas Team</b>
</div>
