# Kế hoạch website 20/10 — “Hộp thư mùa thu”

> **Cập nhật 20/10/2026:** Đây là kế hoạch ban đầu. Bản đang chạy đã chuyển sang tinh thần **Ngày Phụ nữ Việt Nam**: một lá thư chung cho các cô và các bạn nữ, không còn thư riêng từng giáo viên; giữ 7 môn (bỏ Sinh học, Tin học), thêm mini game và phần người thực hiện. Giao diện hiện được chia thành **7 trang nhỏ** có nút chuyển trang và hiệu ứng chuyển màu, kèm phần giải thích ngày 20/10 ở đầu. Chi tiết mới nhất xem `README.md`.

- **Ngày lập:** 19/10/2026
- **Thời điểm phát hành:** tối 19/10 hoặc sáng 20/10/2026
- **Hình thức:** website tĩnh một trang (single-page), tiếng Việt, responsive
- **Phong cách:** Thư tay & hoa — ấm áp
- **Đối tượng:** cô chủ nhiệm và các cô giáo bộ môn của lớp
- **Định hướng nội dung:** 20/10 là Ngày Phụ nữ Việt Nam, nên trang vừa tri ân nghề giáo, vừa dành cho các cô một khoảng để “được là chính mình” — không chỉ nói về bài giảng, điểm số.

> Lưu ý: dự án **Trạm Chữ** hiện có trong thư mục sẽ không bị chỉnh sửa. Website 20/10 nằm trong thư mục riêng `20-10-co-giao/`.

---

## 1. Mục tiêu

1. Gửi lời tri ân **cá nhân hóa** đến từng cô, không chỉ một lời chúc chung.
2. Tạo cảm giác trang web giống một **món quà được mở ra**: phong bì → lá thư → từng lá thư riêng.
3. Chạy tốt trên điện thoại, mở được ngay trong **Zalo / Messenger / trình duyệt trong ứng dụng**.
4. Không phụ thuộc ảnh thật, tài khoản trả phí hay máy chủ riêng.
5. Hoàn thành trong **một buổi tối** (19/10), có phương án tối giản nếu gấp.

---

## 2. Ý tưởng chủ đạo: “Hộp thư mùa thu”

Một chiếc phong bì giấy kraft, con dấu bưu điện “20.10”, vài nhánh hoa cúc ép khô và một nét chữ tay. Người xem mở phong bì, đọc lá thư chung của lớp, rồi lần lượt mở những lá thư riêng gửi từng cô.

**Tagline gợi ý:**

- “Có một mùa thu, lớp mình viết thư cho cô.”
- “20.10 — Những điều nhỏ xíu, gửi riêng cô.”
- “Hộp thư mùa thu — gửi những người cô của chúng em.”

**Từ khóa hình ảnh:** giấy kem, hoa cúc/hoa hồng khô, washi tape, tem thư, con dấu sáp, chữ viết tay, nắng chiều.

---

## 3. Cấu trúc trang

| # | Phần | Mục đích | Nội dung chính | Ưu tiên |
|---|------|----------|----------------|---------|
| 1 | Hero — Hộp thư mùa thu | Gây ấn tượng, tạo tương tác mở thư | Số “20.10”, tiêu đề, phong bì, nút “Mở lá thư” | P1 |
| 2 | Lá thư chung | Lời tri ân của cả lớp | Thư ngắn 4–5 câu, chữ ký tập thể | P1 |
| 3 | Cô chủ nhiệm | Spotlight người gắn bó nhất | Monogram lớn, lời nhắn dài hơn, 3 điều lớp luôn nhớ | P1 |
| 4 | Các cô bộ môn | Cá nhân hóa từng cô | Lưới thẻ, bấm để mở lời chúc riêng | P1 |
| 5 | Góc “Cô là chính mình” | Cân bằng cảm xúc, tránh chỉ nói về dạy học | 3–4 lời chúc về sức khỏe, sở thích, bình yên | P2 |
| 6 | Bức tường lời chúc | Cảm giác cả lớp cùng tham gia | Các note giấy dán washi, ký tên viết tắt | P2 |
| 7 | Món quà nhỏ | Tăng trải nghiệm, dễ chia sẻ | Nhạc nền (tùy chọn), in thiệp, nút chia sẻ | P3 |
| 8 | Footer | Kết thúc trọn vẹn | “Gửi từ lớp …, 20/10/2026” | P1 |

**Luồng trải nghiệm:** mở trang → thấy phong bì → bấm mở → thư chung hiện ra → cuộn xuống gặp cô chủ nhiệm → mở từng thẻ cô bộ môn → đọc lời chúc của lớp → chia sẻ/in thiệp.

---

## 4. Chi tiết từng phần

### 4.1. Hero — “Hộp thư mùa thu”

**Nội dung:**

- Nhãn nhỏ: `20 · 10 · 2026`
- Tiêu đề lớn: **Hộp thư mùa thu**
- Phụ đề: “Tập thể lớp [Tên lớp] gửi tặng cô chủ nhiệm và các cô giáo bộ môn — những người đã cùng chúng em đi qua một mùa thu thật đẹp.”
- Nút chính: **Mở lá thư**
- Gợi ý nhỏ: “hoặc kéo xuống để bắt đầu”

**Thiết kế:**

- Nền giấy kem có hạt giấy rất nhẹ (CSS/SVG noise, không dùng ảnh nặng).
- Phong bì ở giữa hoặc lệch phải, có tem “20.10”, nắp phong bì mở bằng animation.
- Hoa cúc/hoa khô dạng SVG line art, vài cánh hoa rơi rất chậm.
- Khi bấm “Mở lá thư”: phong bì mở, một tờ giấy trượt lên; sau đó tự cuộn xuống phần lá thư chung.

### 4.2. Lá thư chung

**Nội dung mẫu** (thay `[Tên lớp]`, có thể sửa theo giọng của lớp):

> Gửi các cô kính yêu,
>
> Có những ngày lớp mình ồn ào đến mức cô phải gõ thước, cũng có những buổi chiều cả lớp ngồi im nghe cô kể chuyện. Chúng em biết ơn vì đã được gặp các cô ở đây, ở tuổi này, trong một năm học còn nhiều bỡ ngỡ.
>
> Cảm ơn cô vì những lần kiên nhẫn giảng lại bài, vì ánh mắt nhắc nhở khi chúng em lơ đãng, và vì đã tin rằng lớp mình có thể làm tốt hơn.
>
> Món quà này không lớn. Nhưng mỗi dòng chữ ở đây đều là thật.
>
> **Ngày 20 tháng 10 năm 2026**
> **Tập thể lớp [Tên lớp]**

**Thiết kế:** tờ giấy hơi nghiêng, mép giấy hơi rách, chữ viết tay cho lời chào/ký tên; nội dung chính dùng font serif dễ đọc.

### 4.3. Cô chủ nhiệm — “Người giữ nhịp lớp mình”

**Nội dung:**

- Tên cô + môn dạy + vai trò “Giáo viên chủ nhiệm”.
- Monogram lớn (ví dụ `N.A`) trong vòng hoa vẽ tay — không cần ảnh thật.
- Lời nhắn 3–4 câu, ví dụ:

> Cô là người biết lớp mình có bao nhiêu bạn, bạn nào hôm nay buồn, bạn nào chưa ăn sáng. Cô không chỉ dạy [Môn], cô còn dạy chúng em cách sống tử tế, cách đứng dậy sau một điểm kém, và cách yêu thương một tập thể.
>
> Cảm ơn cô vì đã ở lại sau mỗi giờ sinh hoạt, vì những lần nói “không sao đâu, làm lại nhé”, và vì đã tin lớp mình kể cả khi chúng em chưa tin chính mình.

- 3 chip “điều lớp luôn nhớ”, ví dụ:
  - “Lời nhắc trước mỗi giờ sinh hoạt”
  - “Cốc trà nóng trên bàn cô”
  - “Câu nói: ‘Cô tin lớp mình làm được.’”

**Thiết kế:** thẻ lớn, nền giấy đậm hơn một chút, có con dấu sáp nhỏ và dải washi. Đây là phần được đầu tư nhất về khoảng trắng và typography.

### 4.4. Các cô bộ môn — lưới “lá thư riêng”

**Mặt trước thẻ:**

- Monogram (chữ cái đầu của tên cô).
- Tên cô.
- Môn dạy.
- Một câu tagline ngắn, ví dụ: “Người mở cửa sổ cho lớp nhìn ra thế giới.”

**Mặt sau / bấm để mở:**

- Lời chúc 3–4 câu, có ít nhất một chi tiết riêng (thói quen, câu nói, kỷ niệm).
- Một dòng “Điều em học được từ cô…”.
- Ký tên lớp hoặc một em đại diện.

**Nội dung mẫu để dùng ngay:**

| Môn | Câu mở đầu |
|-----|------------|
| Toán | “Cô đã dạy em rằng đáp án đúng chưa đủ, cách mình đi đến đáp án mới quan trọng.” |
| Ngữ văn | “Mỗi bài văn của cô là một lần chúng em học cách lắng nghe người khác.” |
| Tiếng Anh | “Cô mở cho lớp một cánh cửa, và dạy chúng em đủ tự tin để bước ra.” |
| Vật lý | “Cô biến những công thức khô khan thành câu chuyện của thế giới.” |
| Hóa học | “Mỗi tiết học là một thí nghiệm nhỏ, và cô là người kiên nhẫn chờ kết quả.” |
| Sinh học | “Cô dạy chúng em hiểu sự sống, bắt đầu từ những điều gần gũi nhất.” |
| Lịch sử | “Cô kể chuyện quá khứ, để chúng em hiểu hiện tại hơn.” |
| Địa lý | “Qua từng trang bản đồ, cô đưa cả lớp đi thật xa.” |
| Tin học | “Cô dạy chúng em cách máy móc hiểu mình, và cách mình hiểu máy móc.” |
| GDCD | “Cô dạy chúng em rằng điều đúng đắn đôi khi không phải điều dễ làm.” |
| Thể dục | “Cô dạy chúng em rằng bền bỉ quan trọng hơn tốc độ.” |
| Âm nhạc / Mỹ thuật | “Cô cho lớp một khoảng lặng để nghe thấy chính mình.” |

**Quy tắc viết lời chúc** (quan trọng để không bị chung chung):

> **1 chi tiết nhỏ + 1 điều em học được + 1 lời chúc cụ thể**

Ví dụ: “Cô hay nhắc lớp mở cửa sổ cho thoáng (chi tiết). Nhờ cô mà em không còn sợ đứng lên phát biểu (điều học được). Chúc cô có nhiều buổi chiều rảnh để uống trà và đọc sách (lời chúc).”

### 4.5. Góc “Cô là chính mình”

Một dải ngang nhẹ nhàng, 3–4 ô:

- “Mong cô có những ngày không phải chấm bài.”
- “Mong cô ngủ đủ giấc và ăn đúng bữa.”
- “Mong cô giữ được những điều cô thích, ngoài bục giảng.”
- “Mong cô luôn được nhớ đến như một người tử tế, không chỉ một người dạy giỏi.”

Phần này giúp trang 20/10 không bị “ngày Nhà giáo” hóa và tạo điểm chạm cảm xúc riêng.

### 4.6. Bức tường lời chúc

- 6–8 mẩu giấy nhỏ, mỗi mẩu 1–2 câu, ký tên viết tắt.
- Trình bày như bảng ghim: washi tape, đinh ghim, hơi nghiêng.
- Nội dung mẫu:

> “Chúc cô luôn có những ngày thu thật nhẹ.” — A.

> “Cảm ơn cô vì đã không bỏ cuộc với lớp mình.” — B.

> “Mong cô giữ sức khỏe để còn kể thêm nhiều câu chuyện.” — C.

> “Cô ơi, lớp mình ồn thật, nhưng thương cô thật.” — D.

> “Mong mỗi sáng đến trường của cô đều có nắng.” — E.

> “Cảm ơn cô vì những lần kiên nhẫn mà cô không nói ra.” — F.

- **Tùy chọn:** nút “Gửi lời chúc” mở Google Form/Zalo. Không làm form lưu trên web tĩnh vì dữ liệu chỉ nằm trên máy người gửi, dễ gây hiểu nhầm.

### 4.7. Món quà nhỏ

- **Nhạc nền:** một bản instrumental không lời, **tắt mặc định**, có nút bật/tắt rõ ràng. Chỉ dùng nhạc có giấy phép (Pixabay, Free Music Archive) hoặc file do lớp tự thu.
- **In thiệp:** nút “In thiệp” dùng `@media print`, xuất ra một thiệp A5 gấp đôi, có lời chúc chung và tên lớp.
- **Chia sẻ:** dùng Web Share API trên điện thoại, fallback “Sao chép liên kết” trên máy tính.
- **Tùy chọn nâng cao:** ảnh QR code ở footer để các bạn trong lớp quét và gửi cho cô.

### 4.8. Footer

> “Gửi từ lớp [Tên lớp] — 20/10/2026”
> “Làm bằng một chút hoa, một chút nắng và rất nhiều lời cảm ơn.”

Có thể thêm dòng credit nhỏ: “Thiết kế bởi [Tên bạn]”.

---

## 5. Hệ thống thiết kế

### 5.1. Màu sắc

| Token | Mã | Dùng cho |
|-------|-----|----------|
| `--paper` | `#F7F0E6` | Nền chính |
| `--paper-deep` | `#EFE3D3` | Nền section xen kẽ |
| `--white` | `#FFFBF5` | Thẻ, tờ thư |
| `--ink` | `#3B2F2A` | Chữ chính |
| `--ink-soft` | `#6E5E56` | Chữ phụ |
| `--rose` | `#C77F88` | Nhấn chính, hoa, nút |
| `--rose-deep` | `#9F5560` | Nút, chữ nhấn đạt tương phản |
| `--sage` | `#93A68B` | Lá, chi tiết phụ |
| `--gold` | `#C6A15B` | Con dấu, đường kẻ trang trí |
| `--line` | `rgba(59,47,42,.16)` | Viền, đường kẻ |

**Lưu ý tương phản:** không dùng hồng nhạt làm màu chữ trên nền kem; chữ nhấn dùng `--rose-deep`.

### 5.2. Typography

- **Tiêu đề:** `Lora` (serif, hỗ trợ tiếng Việt) — cảm giác thư, sách.
- **Nội dung:** `Be Vietnam Pro` (sans, hỗ trợ tiếng Việt) — dễ đọc trên điện thoại.
- **Chữ viết tay:** `Caveat` — chỉ dùng cho lời chào, chữ ký, nhãn nhỏ; không dùng cho đoạn dài.
- Dự phòng: `Georgia`, `Segoe UI`, `system-ui`.
- Cỡ chữ: body 16–17px; hero `clamp(2.8rem, 7vw, 5.5rem)`; line-height 1.65.

### 5.3. Chi tiết trang trí

- Hạt giấy: SVG noise độ mờ 3–5%.
- Hoa cúc/hoa hồng: SVG line art một nét, màu rose/sage.
- Washi tape: dải màu mờ, xoay nhẹ 2–4 độ.
- Tem thư: khung răng cưa, chữ “20.10”, họa tiết hoa nhỏ.
- Con dấu sáp: hình tròn đỏ trầm, chữ “20·10” hoặc chữ “Thư”.
- Không dùng ảnh stock nước ngoài; nếu có ảnh thật của lớp, chỉ dùng khi được các cô đồng ý.

### 5.4. Chuyển động

- Mở phong bì: 600ms, `cubic-bezier(.22,1,.36,1)`.
- Các phần xuất hiện khi cuộn: 500ms, so le 60ms.
- Thẻ giáo viên: lật 500ms hoặc mở panel trượt.
- Cánh hoa rơi: 6–10 cánh, 12–18 giây, rất nhẹ; tắt hoàn toàn khi `prefers-reduced-motion: reduce`.
- Không dùng hiệu ứng nhấp nháy, không tự phát nhạc, không tự cuộn quá nhanh.

### 5.5. Responsive

- **360–639px:** 1 cột; hero dùng `min-height: 100svh` (có fallback `100vh`); nút to ≥44px.
- **640–1023px:** 2 cột cho thẻ giáo viên; thư chung thu hẹp.
- **≥1024px:** 3 cột; khung nội dung tối đa 1180px.
- Kiểm tra không có cuộn ngang ở 360px.

---

## 6. Tính năng và mức ưu tiên

### P1 — Bắt buộc (phải xong tối 19/10)

- [ ] Hero + phong bì mở được.
- [ ] Lá thư chung.
- [ ] Khối cô chủ nhiệm.
- [ ] Lưới các cô bộ môn, bấm mở lời chúc.
- [ ] Footer.
- [ ] Responsive 360 / 768 / 1440.
- [ ] Thẻ meta OG (tiêu đề, mô tả, ảnh chia sẻ), favicon.
- [ ] Deploy lên Netlify Drop hoặc GitHub Pages.

### P2 — Nên có (nếu còn thời gian)

- [ ] Góc “Cô là chính mình”.
- [ ] Bức tường lời chúc.
- [ ] Hiệu ứng cánh hoa rơi + reveal khi cuộn.
- [ ] Nút in thiệp.
- [ ] Nút chia sẻ / sao chép link.

### P3 — Có thể làm sau

- [ ] Nhạc nền (tắt mặc định).
- [ ] Form nhận lời chúc qua Google Form.
- [ ] Album ảnh lớp (nếu có ảnh và được đồng ý).
- [ ] Quiz nhỏ “Đoán cô giáo qua câu nói”.
- [ ] Mã QR ở footer.

> **Không làm:** đếm ngược sau 20/10, form lưu dữ liệu trên máy người dùng, hiệu ứng quá nặng, tự phát âm thanh.

---

## 7. Cấu trúc thư mục và dữ liệu

```text
20-10-co-giao/
├─ index.html
├─ KE-HOACH.md
└─ assets/
   ├─ css/
   │  └─ styles.css
   ├─ js/
   │  ├─ data.js       ← chỉ cần sửa file này để thay tên/lời chúc
   │  └─ app.js
   ├─ fonts/           ← font local (nếu muốn chạy offline)
   └─ img/             ← SVG hoa, favicon, ảnh OG
```

**Dữ liệu giáo viên** (mẫu):

```js
// assets/js/data.js
const SITE = {
  className: "[Tên lớp]",
  year: "2026–2027",
  signature: "Tập thể lớp [Tên lớp]",
  formUrl: "",      // dán link Google Form nếu muốn nhận lời chúc
  musicUrl: "",     // để trống nếu không dùng nhạc
};

const TEACHERS = [
  {
    id: "co-chu-nhiem",
    name: "[Tên cô chủ nhiệm]",
    subject: "[Môn dạy]",
    role: "homeroom",          // "homeroom" | "subject"
    tagline: "Người giữ nhịp lớp mình",
    message: "...",             // 3–4 câu
    memories: ["...", "...", "..."],
    order: 1,
  },
  {
    id: "co-toan",
    name: "[Tên cô dạy Toán]",
    subject: "Toán",
    role: "subject",
    tagline: "Người dạy em tin vào từng bước làm",
    message: "...",
    memories: [],
    order: 2,
  },
];
```

- `app.js` đọc `TEACHERS`, tự render thẻ và phần cô chủ nhiệm.
- Chữ cái monogram tự lấy từ tên, không cần nhập tay.
- Màu nhấn tự xoay vòng theo danh sách `rose / sage / gold`.
- Nếu chưa có tên thật, dùng tạm “Cô chủ nhiệm”, “Cô Toán”, “Cô Văn”… và thay sau.

---

## 8. Kế hoạch nội dung

### 8.1. Những gì cần điền

| Hạng mục | Bắt buộc | Ghi chú |
|----------|----------|---------|
| Tên lớp | Có | Ví dụ “10A1” |
| Danh sách cô | Có | Tên + môn + chủ nhiệm/bộ môn |
| Lời chúc từng cô | Nên có | Có thể dùng mẫu, thay chi tiết sau |
| Kỷ niệm nhỏ | Không bắt buộc | Càng cụ thể càng hay |
| Tên người viết / ký tên | Không bắt buộc | Có thể ký tập thể |
| Nhạc | Không bắt buộc | Chỉ dùng nhạc có giấy phép |
| Ảnh | Không bắt buộc | Cần sự đồng ý của cô |

### 8.2. Công thức viết lời chúc

1. **Mở:** “Cô ơi,” hoặc “Gửi cô [Tên],”
2. **Chi tiết nhỏ:** một thói quen, câu nói, khoảnh khắc trên lớp.
3. **Điều em học được:** một kỹ năng hoặc một bài học sống.
4. **Lời chúc:** cụ thể, gắn với con người cô (sức khỏe, sở thích, bình yên).
5. **Ký tên:** tên em hoặc “Lớp [Tên lớp]”.

**Ví dụ hoàn chỉnh:**

> Cô ơi, mỗi lần lớp mình mất trật tự, cô không quát to mà chỉ đứng im nhìn. Cả lớp biết ngay là phải quay lại bài. Nhờ cô mà em học được cách giữ bình tĩnh, kể cả khi mọi thứ xung quanh đang rối. Chúc cô có thật nhiều buổi sáng được ngủ nướng và những cuốn sách hay trên bàn.

### 8.3. 10 câu chúc ngắn để ghép

1. “Mong cô có một mùa thu thật nhẹ, ít bài chấm và nhiều tiếng cười.”
2. “Cảm ơn cô vì đã kiên nhẫn với những câu hỏi lặp lại của chúng em.”
3. “Mong cô luôn giữ được ánh mắt dịu dàng ấy, kể cả những ngày lớp mình nghịch nhất.”
4. “Chúc cô ngủ đủ giấc, ăn đúng bữa và bớt mang bài về nhà.”
5. “Cảm ơn cô vì đã nhìn thấy điều tốt trong những đứa trẻ còn đang loay hoay.”
6. “Mong cô có nhiều thời gian cho những điều cô thích, ngoài bục giảng.”
7. “Cô không cần hoàn hảo đâu, cô chỉ cần là cô thôi.”
8. “Mong mỗi sáng đến trường của cô đều có nắng.”
9. “Cảm ơn cô vì những lần nhắc nhở mà sau này chúng em mới hiểu.”
10. “Chúc cô luôn được yêu thương, như cách cô đã yêu thương lớp mình.”

---

## 9. Lịch triển khai (tối 19/10)

| Thời gian | Việc | Kết quả |
|-----------|------|---------|
| 19:00–19:30 | Chốt tên lớp, danh sách cô, vai trò; chọn dùng tên thật hay tên tạm | `data.js` có dữ liệu |
| 19:30–21:00 | Dựng khung HTML + CSS: hero, phong bì, thư chung | Trang chạy được bản tĩnh |
| 21:00–22:00 | Render thẻ giáo viên, khối cô chủ nhiệm, footer | Đủ nội dung P1 |
| 22:00–22:40 | Hiệu ứng mở thư, reveal, responsive; thêm P2 nếu kịp | Trang mượt trên mobile |
| 22:40–23:10 | Test trên Chrome + Safari iOS + Zalo; sửa lỗi | Checklist P1 đạt |
| 23:10–23:30 | Deploy, tạo QR, kiểm tra link chia sẻ | Có link gửi lớp |
| 20/10, 7:00 | Gửi link kèm lời nhắn ngắn | Phát hành |

**Phương án tối giản nếu tối nay quá gấp (2 giờ):**

- Chỉ làm: hero + lá thư chung + cô chủ nhiệm + lưới thẻ bộ môn (không lật, chỉ hiện lời chúc) + footer.
- Bỏ: nhạc, hoa rơi, bức tường lời chúc, nút in.
- Vẫn đủ ấm áp và đúng tinh thần.

---

## 10. Kiểm thử và phát hành

### 10.1. Checklist trước khi gửi

- [ ] Đúng tên lớp, tên các cô, môn dạy, chức danh.
- [ ] Không sai chính tả, không gọi nhầm “cô/thầy”.
- [ ] Không có cuộn ngang ở 360px.
- [ ] Bấm thẻ bằng bàn phím được (Tab + Enter/Space).
- [ ] Ảnh/font không bị vỡ; có fallback khi mạng chậm.
- [ ] Nhạc tắt mặc định; có nút bật/tắt.
- [ ] Tôn trọng `prefers-reduced-motion`.
- [ ] Thẻ OG hiển thị đẹp khi dán link vào Zalo/Messenger.
- [ ] Đã thử mở trong trình duyệt tích hợp của Zalo.
- [ ] Có bản sao lưu file (zip) trước khi deploy.

### 10.2. Cách phát hành

1. **Netlify Drop** (nhanh nhất): kéo thư mục `20-10-co-giao/` vào trang Netlify Drop, nhận link HTTPS.
2. **GitHub Pages**: nếu muốn lưu lâu dài, đưa lên repo và bật Pages.
3. **Vercel**: tương tự Netlify, phù hợp nếu đã có tài khoản.

Sau khi có link:

- Tạo mã QR bằng trình duyệt/ứng dụng tạo QR.
- Quét thử bằng điện thoại thật.
- Gửi link vào nhóm lớp kèm một câu ngắn: “Cả lớp mở thử nhé, có một món quà nhỏ cho các cô.”
- Nhờ 1–2 bạn mở trước để kiểm tra hiển thị.

### 10.3. Hiệu năng mục tiêu

- Tổng dung lượng < 1,5 MB (không tính nhạc).
- Font ≤ 3 family, ≤ 4 weight.
- Ảnh SVG/WebP, mỗi ảnh < 200 KB.
- Không thư viện JS nặng; chỉ JS thuần.

---

## 11. Rủi ro và lưu ý

| Rủi ro | Cách xử lý |
|--------|------------|
| Trang public, người lạ truy cập | Chỉ dùng tên/tên viết tắt; không đăng số điện thoại, địa chỉ, ảnh nhạy cảm; có thể dùng link khó đoán |
| Dùng ảnh/nhạc không xin phép | Chỉ dùng ảnh của lớp khi các cô đồng ý; nhạc phải có giấy phép hoặc tự thu |
| Sai tên/gọi nhầm | Nhờ lớp kiểm tra chéo trước khi gửi |
| Zalo không hiển thị đúng | Test sớm; tránh JS phức tạp; dùng font fallback |
| Hết thời gian | Ưu tiên P1; bỏ hiệu ứng; vẫn giữ thư chung + thẻ giáo viên |
| Trang bị lỗi sau khi deploy | Giữ bản zip offline; có thể gửi file HTML trực tiếp nếu cần |

---

## 12. Việc cần bạn xác nhận

1. **Tên lớp** dùng trên trang (ví dụ `10A1`).
2. **Danh sách các cô:** tên + môn + cô nào chủ nhiệm. Nếu muốn giữ riêng tư, mình có thể dùng “Cô Toán”, “Cô Văn”…
3. **Có dùng nhạc nền không?** Nếu có, bạn gửi file hoặc mình chọn một bản instrumental có giấy phép.
4. **Có muốn mình dựng bản demo luôn không?** Nếu có, mình sẽ tạo trong `20-10-co-giao/`, giữ nguyên dự án Trạm Chữ.

> Khi bạn duyệt kế hoạch, bước tiếp theo là mình dựng bản demo P1 trước, sau đó mới thêm hiệu ứng và nội dung cá nhân hóa.
