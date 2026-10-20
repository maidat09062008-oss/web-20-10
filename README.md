# Hộp thư mùa thu — Nhóm con trai 10A17 gửi các cô và các bạn nữ

Website tĩnh cho **Ngày Phụ nữ Việt Nam 20/10**, chia thành 7 trang nhỏ có nút chuyển trang và hiệu ứng chuyển màu: lời ngỏ kèm giải thích ngày 20/10, một lá thư chung gửi các cô giáo và các bạn nữ, phần giới thiệu cô chủ nhiệm **Lưu Thị Tố Uyên**, 7 thẻ môn học với lời cảm ơn ngắn (không viết thư riêng từng người), lời chúc, 4 mini game và một bản nhạc nền.

Phong cách: thư tay & hoa — giấy kem, mực nâu, hồng phấn, xanh sage và vàng gold. Minh họa giao diện là SVG/CSS; riêng mini game đoán tên dùng 10 ảnh thời thơ ấu do lớp cung cấp. Không dùng dịch vụ trả phí.

Nội dung được thực hiện bởi tập thể nhóm con trai lớp 10A17. Người làm website: **Mai Lê Tuấn Đạt** (sinh ngày 09/06/2008, quê Bỉm Sơn, Thanh Hóa) — thông tin này nằm ở mục "Người thực hiện" gần cuối trang và ở footer.

## Xem thử

Mở trực tiếp `index.html` bằng trình duyệt cũng được. Để nút chia sẻ/clipboard hoạt động ổn định, nên chạy local server:

```powershell
cd "C:\Users\PC\OneDrive\Documents\Default Project"
python -m http.server 8123
```

Sau đó mở: <http://localhost:8123/20-10/index.html>

## Cấu trúc

```text
20-10/
├─ index.html                  # 7 trang nhỏ: lời ngỏ, lá thư, các cô, bạn nữ, lời chúc, trò chơi, kết
├─ og.html                     # Nguồn tạo ảnh chia sẻ (noindex)
├─ README.md
├─ KE-HOACH.md                 # Kế hoạch ban đầu (đã cập nhật hướng mới)
├─ image/                      # Ảnh gốc do lớp cung cấp (không bắt buộc khi deploy)
└─ assets/
   ├─ css/styles.css           # Toàn bộ giao diện, responsive, print, reduced-motion
   ├─ js/data.js               # SITE + TEACHERS (7 môn) + QUIZ + MEMORY_WORDS + WISHES + PHOTO_GUESS
   ├─ js/app.js                # Render, chuyển trang, reveal, phong bì, mini game, nhạc, share, petals
   ├─ fonts/                   # Font local (Lora, Be Vietnam Pro, Dancing Script)
   ├─ audio/greensleeves.mp3   # Nhạc nền, chỉ phát khi người dùng bấm
   ├─ audio/CREDIT.txt         # Nguồn + giấy phép bản nhạc
   └─ img/                     # favicon, og-cover.png, guess/*.jpg (ảnh đã tối ưu cho game)
```

## Các trang

Website vẫn là một tệp `index.html` duy nhất, nhưng nội dung được chia thành **7 trang nhỏ**. Chỉ một trang hiển thị tại một thời điểm; chuyển trang không tải lại và có hiệu ứng màu che toàn màn hình.

1. **Lời ngỏ** — `#trang-loi-ngo`: lời chào, phong bì và phần giải thích **20/10 là Ngày Phụ nữ Việt Nam**.
2. **Lá thư** — `#trang-la-thu`: lá thư chung và phần cô chủ nhiệm **Lưu Thị Tố Uyên**.
3. **Các cô** — `#trang-cac-co`: 7 thẻ môn học.
4. **Bạn nữ** — `#trang-cac-ban-nu`: lời gửi các bạn nữ và phần tự chăm sóc.
5. **Lời chúc** — `#trang-loi-chuc`: bức tường lời chúc.
6. **Trò chơi** — `#trang-tro-choi`: cả 4 mini game.
7. **Kết** — `#trang-ket`: món quà, nút in/chia sẻ và thông tin người thực hiện.

Điều hướng nằm ở header (màn hình lớn), các nút **Trang trước / Trang tiếp** và chấm số trang ở cuối mỗi trang. Mỗi trang có hash riêng, nên có thể mở trực tiếp hoặc gửi liên kết đến đúng trang, ví dụ `index.html#trang-tro-choi`. Nút chia sẻ ở trang Kết luôn chia sẻ URL gốc (không kèm hash) để người nhận bắt đầu từ trang Lời ngỏ.

Khi thêm hoặc bớt trang, cần cập nhật đồng bộ:

- một `<div class="page" data-page="...">` trong `index.html`;
- nhãn trong `pageMeta` và thứ tự `pageKeys` (lấy tự động từ DOM) trong `app.js`;
- link `data-page-link` ở header/footer nếu muốn truy cập nhanh.

Trang dùng `prefers-reduced-motion`: người chọn giảm chuyển động sẽ chuyển trang ngay, không chạy hiệu ứng che màu.

## Tùy chỉnh nhanh

### 1. Tên lớp, ngày, chữ ký

Mở `assets/js/data.js`, sửa `SITE`:

```js
const SITE = {
  className: "10A17",
  date: "20.10.2026",
  signature: "Tập thể nhóm con trai lớp 10A17",
  // ...
};
```

Các phần tử có `data-class`, `data-date`, `data-signature` trong HTML sẽ tự cập nhật.

### 2. Nội dung chính

- **Lời ngỏ và khái niệm 20/10:** `index.html`, section `#ngay-20-10` trong trang Lời ngỏ.
- **Thư chung:** sửa trực tiếp trong `index.html`, khu vực `<article class="letter">` của trang Lá thư.
- **Cô chủ nhiệm:** `index.html`, section `#co-chu-nhiem` — hiện ghi tên cô **Lưu Thị Tố Uyên**.
- **Gửi các bạn nữ:** `index.html`, section `#cac-ban-nu` của trang Bạn nữ.
- **Lời chúc:** `index.html`, section `#loi-chuc` của trang Lời chúc.
- **Người thực hiện:** `index.html`, section `.creator` của trang Kết; nhớ cập nhật cả dòng `footer__maker` nếu đổi thông tin.

Trang cố ý viết **chung**, không viết thư riêng cho từng cá nhân. Nếu muốn thêm nội dung riêng, hãy cân nhắc lại vì điều đó sẽ làm mất tinh thần "một lá thư chung" hiện tại.

### 3. Các cô bộ môn

Mở `assets/js/data.js`, sửa mảng `TEACHERS`. Mỗi môn hiện có:

```js
{
  id: "toan",
  name: "Cô dạy Toán",
  subject: "Toán",
  icon: "i-math",
  accent: "rose",
  tagline: "Cảm ơn cô đã kiên nhẫn với từng bước làm."
}
```

- `tagline` chỉ là **một câu ngắn**, không phải thư riêng.
- `accent` chọn một trong: `rose`, `sage`, `gold`, `clay`.
- Các `icon` có sẵn trong sprite của `index.html`: `i-math`, `i-book`, `i-english`, `i-physics`, `i-chem`, `i-history`, `i-geo`, `i-lit`, `i-bio`, `i-it`, `i-wreath`, `i-flower`, `i-heart`, `i-sun`, `i-moon`, `i-cup`, `i-note`, `i-sparkle`.

Hiện trang có **7 môn**: Toán, Ngữ văn, Tiếng Anh, Vật lí, Hóa học, Lịch sử, Địa lí. Hai môn Sinh học và Tin học đã được bỏ theo yêu cầu. Nếu thêm/bớt môn, lưới sẽ tự xếp lại; ở màn hình 2 cột thẻ cuối được căn giữa.

> Lưu ý riêng môn Hóa học: nội dung hiện tại **không nhắc đến phòng thực hành/thí nghiệm**, vì lớp chưa học ở phòng thực hành. Khi sửa, giữ đúng thực tế này.

### 4. Mini game

Bốn trò chơi nằm ở section `#tro-choi` của trang Trò chơi:

1. **Trắc nghiệm 20/10** — 5 câu hỏi, sửa trong `QUIZ`.
2. **Ghép đôi lời chúc** — 6 cặp từ khóa, sửa trong `MEMORY_WORDS`.
3. **Rút một lời chúc** — 6 lời chúc ngẫu nhiên, sửa trong `WISHES`.
4. **Nhìn ảnh đoán tên** — 10 ảnh thời thơ ấu, mỗi ảnh có 4 lựa chọn tên; sửa trong `PHOTO_GUESS`.

Với game ảnh:

- Ảnh gốc nằm trong `image/`; bản đã thu nhỏ để tải nhanh nằm trong `assets/img/guess/`.
- Mỗi mục trong `PHOTO_GUESS` gồm `name`, `file` và `pos` (vị trí cắt ảnh để gương mặt nằm giữa khung). Nếu đổi ảnh, giữ đúng tên tệp hoặc cập nhật lại `file`.
- Ảnh được hiển thị trong khung 4:5 cố định, tự cắt đều nhau; không cần chỉnh kích thước ảnh thủ công.
- Tên trong ảnh và tên trong các lựa chọn lấy từ cùng một mảng, nên chỉ cần sửa một nơi.

Tiến trình được lưu trong `localStorage` với khóa `10a17-20-10-games-v1` để lần sau mở lại vẫn thấy số trò đã hoàn thành. Khóa này được giữ từ phiên bản 3 trò để không mất tiến trình cũ; trò ảnh sẽ mặc định là chưa hoàn thành. Muốn xóa tiến trình: mở DevTools → Application → Local Storage → xóa khóa trên, hoặc dùng chức năng xóa dữ liệu trang trong trình duyệt. Mỗi trò đều có nút **Chơi lại** riêng.

### 5. Nhạc nền

Tệp đang dùng: `assets/audio/greensleeves.mp3`. Có thể thay bằng tệp khác **cùng tên** để giữ nguyên code.

Bản hiện tại:
- Greensleeves (English folk melody)
- Biểu diễn ẩn danh, thu âm bởi Dieter Leckschat
- Nguồn: Wikimedia Commons
- Giấy phép: CC BY-SA 4.0

Nếu đổi bản nhạc, cập nhật credit ở **hai chỗ**: `SITE.music` trong `assets/js/data.js` và dòng credit cuối trang trong `index.html`. Giữ attribution theo đúng giấy phép của bản nhạc mới.

Nhạc **không tự phát**: chỉ bắt đầu sau khi người dùng bấm nút loa ở góc phải hoặc nút play trong mục "Bật một bản nhạc".

### 6. Ảnh chia sẻ (OG image)

`assets/img/og-cover.png` là ảnh 1200×630, được tạo từ `og.html`.

Sau khi deploy, sửa `og:image` trong `index.html` thành URL tuyệt đối:

```html
<meta property="og:image" content="https://ten-mien-cua-ban/.../assets/img/og-cover.png">
```

Nên thêm cả `og:url` để Zalo/Facebook hiển thị preview đúng. `og.html` đã có `noindex`, chỉ dùng làm nguồn tạo ảnh.

## In lá thư

Nút **In lá thư chung** ở trang Kết chỉ in lá thư chung, không in giao diện hay các trang khác. Khi in, website tự hiện lá thư dù trang hiện tại là trang Kết. Trong hộp thoại in, chọn **Save as PDF** nếu muốn lưu hoặc gửi file.

## Deploy

### Cách nhanh: Netlify Drop

1. Vào <https://app.netlify.com/drop>.
2. Kéo thả thư mục `20-10` vào trang.
3. Nhận URL công khai, sau đó cập nhật `og:image` thành URL tuyệt đối.
4. Tạo QR từ URL cuối cùng bằng công cụ QR bất kỳ, hoặc nhờ mình tạo.

> Không cần build, không cần cài đặt gì. Đây là website tĩnh.

### GitHub Pages

1. Tạo repository mới.
2. Upload **nội dung bên trong** thư mục `20-10` lên nhánh `main` (để `index.html` nằm ở root).
3. Vào **Settings → Pages → Deploy from a branch**, chọn `main` / `(root)`.
4. URL sẽ có dạng `https://<tên-user>.github.io/<tên-repo>/`.

Vì mọi đường dẫn trong site đều là tương đối, site chạy được cả ở root lẫn thư mục con.

## Trước khi gửi

- [ ] Đọc lại lời ngỏ, phần giải thích 20/10, thư chung, phần cô chủ nhiệm và phần các bạn nữ để chắc chắn câu chữ phù hợp.
- [ ] Kiểm tra tên cô chủ nhiệm **Lưu Thị Tố Uyên** và thông tin người thực hiện **Mai Lê Tuấn Đạt**.
- [ ] Kiểm tra trên điện thoại thật, nhất là 390px và 360px.
- [ ] Bấm qua đủ 7 trang bằng nút cuối trang, thử nút Trang trước/Trang tiếp, chấm số trang và nút Back của trình duyệt.
- [ ] Thử mở trực tiếp một hash như `#trang-tro-choi` và kiểm tra hiệu ứng chuyển trang.
- [ ] Thử mở phong bì, chơi cả 4 mini game (nhất là game ảnh), bật/tắt nhạc, in thử.
- [ ] Cập nhật `og:image` thành URL tuyệt đối sau khi deploy.
- [ ] Tạo QR từ URL cuối cùng.

## Ghi chú

- Không có backend, không thu thập dữ liệu. Lời chúc là nội dung tĩnh, mini game chỉ lưu tiến trình trong trình duyệt của người xem.
- Tôn trọng `prefers-reduced-motion`; có skip-link, thao tác bàn phím và focus state.
- Nút chia sẻ dùng Web Share API nếu có; nếu không, tự copy URL gốc (bỏ hash trang hiện tại) và hiện toast.
- Dự án "Trạm Chữ" ở thư mục gốc không bị thay đổi.
