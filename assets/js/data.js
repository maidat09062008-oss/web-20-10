/* ==========================================================================
   Dữ liệu website 20/10 — lớp 10A17
   --------------------------------------------------------------------------
   Ghi chú:
   - Đây là website của tập thể nhóm con trai lớp 10A17.
   - Nội dung viết chung, không viết thư riêng cho từng cá nhân.
   - Muốn sửa lời chúc bộ môn: sửa mảng TEACHERS.
   - Muốn sửa mini game: sửa QUIZ / MEMORY_WORDS / WISHES / PHOTO_GUESS.
   ========================================================================== */

const SITE = {
  className: "10A17",
  date: "20.10.2026",
  signature: "Tập thể nhóm con trai lớp 10A17",
  creator: {
    name: "Mai Lê Tuấn Đạt",
    birth: "09/06/2008",
    hometown: "Bỉm Sơn, Thanh Hóa",
    role: "Thành viên nhóm con trai của lớp 10A17"
  },
  music: {
    title: "Greensleeves",
    subtitle: "English folk melody · piano",
    credit: "Biểu diễn ẩn danh · thu âm Dieter Leckschat · CC BY-SA 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Greensleeves_for_solo_piano.wav"
  }
};

/* Bảy môn còn lại — chỉ một lời chung, không có thư riêng từng người. */
const TEACHERS = [
  {
    id: "toan",
    name: "Cô dạy Toán",
    subject: "Toán",
    icon: "i-math",
    accent: "rose",
    tagline: "Cảm ơn cô đã kiên nhẫn với từng bước làm."
  },
  {
    id: "ngu-van",
    name: "Cô dạy Ngữ văn",
    subject: "Ngữ văn",
    icon: "i-book",
    accent: "sage",
    tagline: "Cảm ơn cô đã dạy chúng em lắng nghe những câu chuyện."
  },
  {
    id: "tieng-anh",
    name: "Cô dạy Tiếng Anh",
    subject: "Tiếng Anh",
    icon: "i-english",
    accent: "gold",
    tagline: "Cảm ơn cô đã mở thêm một cánh cửa ra thế giới."
  },
  {
    id: "vat-li",
    name: "Cô dạy Vật lí",
    subject: "Vật lí",
    icon: "i-physics",
    accent: "clay",
    tagline: "Cảm ơn cô đã chỉ cho chúng em thấy điều kỳ diệu trong điều bình thường."
  },
  {
    id: "hoa-hoc",
    name: "Cô dạy Hóa học",
    subject: "Hóa học",
    icon: "i-chem",
    accent: "rose",
    tagline: "Cảm ơn cô đã giữ cho mỗi tiết học thêm tò mò và vui."
  },
  {
    id: "lich-su",
    name: "Cô dạy Lịch sử",
    subject: "Lịch sử",
    icon: "i-history",
    accent: "gold",
    tagline: "Cảm ơn cô đã kể quá khứ bằng những câu chuyện gần gũi."
  },
  {
    id: "dia-li",
    name: "Cô dạy Địa lí",
    subject: "Địa lí",
    icon: "i-geo",
    accent: "clay",
    tagline: "Cảm ơn cô đã đưa cả lớp đi xa qua từng trang bản đồ."
  }
];

/* Mini game 1 — trắc nghiệm vui. */
const QUIZ = [
  {
    question: "Ngày 20/10 là ngày gì?",
    options: [
      "Ngày Nhà giáo Việt Nam",
      "Ngày Phụ nữ Việt Nam",
      "Ngày Quốc tế Thiếu nhi",
      "Ngày Thương binh - Liệt sĩ"
    ],
    answer: 1,
    explain: "20/10 là Ngày Phụ nữ Việt Nam. Ngày Nhà giáo Việt Nam là 20/11."
  },
  {
    question: "Ngày Nhà giáo Việt Nam là ngày nào?",
    options: ["20/10", "20/11", "08/03", "01/06"],
    answer: 1,
    explain: "20/11 là Ngày Nhà giáo Việt Nam; 20/10 là Ngày Phụ nữ Việt Nam."
  },
  {
    question: "Trong lớp 10A17, ngày 20/10 dành cho ai?",
    options: [
      "Chỉ các cô giáo",
      "Chỉ các bạn nữ",
      "Các cô giáo và các bạn nữ",
      "Tất cả các bạn nam"
    ],
    answer: 2,
    explain: "20/10 là ngày của các cô giáo và các bạn nữ — tất cả những người phụ nữ của lớp mình."
  },
  {
    question: "Cô chủ nhiệm của lớp 10A17 là ai?",
    options: [
      "Cô Lưu Thị Tố Uyên",
      "Cô Nguyễn Thu Hà",
      "Cô Trần Minh Anh",
      "Cô Lê Thanh Hương"
    ],
    answer: 0,
    explain: "Cô Lưu Thị Tố Uyên là cô chủ nhiệm của lớp 10A17."
  },
  {
    question: "Điều gì làm nên một món quà đẹp?",
    options: ["Giá tiền", "Sự chân thành", "Kích thước", "Số lượng"],
    answer: 1,
    explain: "Một món quà đẹp nhất khi nó được gửi đi bằng sự chân thành."
  }
];

/* Mini game 2 — sáu cặp từ khóa để lật thẻ. */
const MEMORY_WORDS = [
  "Dịu dàng",
  "Tự tin",
  "Lắng nghe",
  "Sẻ chia",
  "Tôn trọng",
  "Yêu thương"
];

/* Mini game 3 — những lời chúc để rút thăm. */
const WISHES = [
  "Chúc bạn luôn tự tin theo đuổi điều mình thích.",
  "Mong bạn được lắng nghe và được là chính mình.",
  "Chúc bạn một ngày 20/10 thật nhẹ và nhiều tiếng cười.",
  "Mong mỗi ngày đến trường của bạn đều có một chút nắng.",
  "Chúc bạn luôn được yêu thương, không chỉ hôm nay.",
  "Mong bạn giữ được sự dịu dàng và can đảm của mình."
];

/* Mini game 4 — nhìn ảnh thời thơ ấu đoán tên.
   Ảnh gốc nằm trong thư mục image/, bản tối ưu nằm trong assets/img/guess/.
   pos là vị trí cắt ảnh (object-position) để gương mặt luôn nằm trong khung. */
const PHOTO_GUESS = [
  { name: "Hoàng Dương", file: "assets/img/guess/hoang-duong.jpg", pos: "50% 35%" },
  { name: "Hà Vy", file: "assets/img/guess/ha-vy.jpg", pos: "50% 45%" },
  { name: "Khánh Vy", file: "assets/img/guess/khanh-vy.jpg", pos: "50% 35%" },
  { name: "Minh Khuê", file: "assets/img/guess/minh-khue.jpg", pos: "62% 45%" },
  { name: "Minh Quân", file: "assets/img/guess/minh-quan.jpg", pos: "50% 38%" },
  { name: "Phúc Nguyên", file: "assets/img/guess/phuc-nguyen.jpg", pos: "45% 42%" },
  { name: "Trang", file: "assets/img/guess/trang.jpg", pos: "50% 42%" },
  { name: "Uyên Chi", file: "assets/img/guess/uyen-chi.jpg", pos: "50% 35%" },
  { name: "Vy Hạnh", file: "assets/img/guess/vy-hanh.jpg", pos: "55% 45%" },
  { name: "Đan Linh", file: "assets/img/guess/dan-linh.jpg", pos: "50% 40%" }
];
