/* ==========================================================================
   Hộp thư mùa thu — tương tác
   ========================================================================== */

(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toastEl = $("#toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 3200);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[char];
    });
  }

  /* ---------- Nội dung cấu hình ---------- */

  if (typeof SITE !== "undefined") {
    $$("[data-class]").forEach((el) => {
      el.textContent = SITE.className;
    });
    $$("[data-date]").forEach((el) => {
      el.textContent = SITE.date;
    });
    $$("[data-signature]").forEach((el) => {
      el.textContent = SITE.signature;
    });

    document.title = `Hộp thư mùa thu — ${SITE.className} gửi các cô và các bạn nữ | ${SITE.date}`;

    if (SITE.music) {
      const title = $("#track-title");
      const subtitle = $("#track-subtitle");
      const credit = $("#track-credit");
      if (title) title.textContent = SITE.music.title;
      if (subtitle) subtitle.textContent = SITE.music.subtitle;
      if (credit) {
        credit.textContent = `${SITE.music.title} · CC BY-SA 4.0`;
        credit.href = SITE.music.creditUrl;
        credit.title = SITE.music.credit;
      }
    }
  }

  const baseTitle = document.title;

  /* ---------- Render các cô bộ môn ---------- */

  const grid = $("#teacher-grid");

  if (grid && typeof TEACHERS !== "undefined") {
    grid.innerHTML = TEACHERS.map((teacher, index) => {
      const icon = /^i-[a-z-]+$/.test(teacher.icon) ? teacher.icon : "i-flower";
      return `
        <article
          class="teacher-card"
          data-accent="${escapeHtml(teacher.accent)}"
          data-reveal
          style="--delay:${Math.min(index * 55, 300)}ms"
        >
          <span class="teacher-card__top">
            <span class="teacher-card__icon">
              <svg class="icon" aria-hidden="true"><use href="#${icon}"></use></svg>
            </span>
            <span class="teacher-card__subject">${escapeHtml(teacher.subject)}</span>
          </span>
          <h3 class="teacher-card__name">${escapeHtml(teacher.name)}</h3>
          <p class="teacher-card__tagline">${escapeHtml(teacher.tagline)}</p>
          <span class="teacher-card__open">
            Một lời chung
            <svg class="icon" aria-hidden="true"><use href="#i-flower"></use></svg>
          </span>
        </article>
      `;
    }).join("");
  }

  /* ---------- Reveal khi cuộn ---------- */

  const revealEls = $$("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);

            // Sau khi hiệu ứng kết thúc, trả lại transition riêng của từng thẻ
            // (hover thẻ giáo viên, hover ghi chú...) để không bị transition reveal ghi đè.
            window.setTimeout(() => {
              entry.target.removeAttribute("data-reveal");
            }, 1600);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- Header + thanh tiến trình ---------- */

  const header = $("#site-header");
  const progress = $("#scroll-progress-bar");

  function updateScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle("is-scrolled", y > 30);
    }

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }
  }

  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);

  /* ---------- Các trang nhỏ ---------- */

  const pageEls = $$(".page[data-page]");
  const pageKeys = pageEls.map((el) => el.dataset.page);
  const pageMeta = {
    "loi-ngo": { short: "Lời ngỏ", title: "Lời ngỏ" },
    "la-thu": { short: "Lá thư", title: "Lá thư & cô chủ nhiệm" },
    "cac-co": { short: "Các cô", title: "Các cô bộ môn" },
    "cac-ban-nu": { short: "Bạn nữ", title: "Gửi các bạn nữ" },
    "loi-chuc": { short: "Lời chúc", title: "Bức tường lời chúc" },
    "tro-choi": { short: "Trò chơi", title: "Mini game 20/10" },
    "ket": { short: "Kết", title: "Món quà & người thực hiện" }
  };
  const pageAliases = {
    "mo-thu": "loi-ngo",
    "ngay-20-10": "loi-ngo",
    "co-chu-nhiem": "la-thu",
    "mon-qua": "ket"
  };
  const pageLinks = $$("[data-page-link]");
  const pageDots = $("#page-dots");
  const pagePrev = $("#page-prev");
  const pageNext = $("#page-next");
  const pagePrevLabel = $("#page-prev-label");
  const pageNextLabel = $("#page-next-label");
  const pageCurrent = $("#page-current");
  const pageTotal = $("#page-total");
  const pageAnnouncer = $("#page-announcer");
  const pageFooter = $("#site-footer");
  const pageTransition = $("#page-transition");
  const pageTransitionLabel = $("#page-transition-label");
  let currentPageKey = null;
  let pageTransitioning = false;
  let pageTimer = null;

  function getPageInfo(key) {
    return pageMeta[key] || { short: key, title: key };
  }

  function scrollToTopInstant() {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousBehavior;
  }

  function pageKeyFromHash(hash = window.location.hash) {
    const raw = String(hash || "").replace(/^#/, "");
    if (!raw) return null;
    const key = raw.startsWith("trang-") ? raw.slice(6) : raw;
    const mapped = pageAliases[key] || key;
    return pageKeys.includes(mapped) ? mapped : null;
  }

  function buildPageDots() {
    if (!pageDots) return;
    pageDots.innerHTML = pageEls
      .map((el, index) => {
        const info = getPageInfo(el.dataset.page);
        const number = String(index + 1).padStart(2, "0");
        return `<button class="page-controls__dot" type="button" data-page-target="${escapeHtml(
          el.dataset.page
        )}" aria-label="Trang ${index + 1}: ${escapeHtml(info.title)}">${number}</button>`;
      })
      .join("");
  }

  function updatePageChrome(key) {
    const index = pageKeys.indexOf(key);
    const info = getPageInfo(key);
    const isLast = index === pageKeys.length - 1;

    if (pageCurrent) pageCurrent.textContent = String(index + 1).padStart(2, "0");
    if (pageTotal) pageTotal.textContent = String(pageKeys.length).padStart(2, "0");

    if (pagePrevLabel) {
      pagePrevLabel.textContent = index > 0 ? getPageInfo(pageKeys[index - 1]).short : "Lời ngỏ";
    }

    if (pageNextLabel) {
      pageNextLabel.textContent = isLast ? "Về trang đầu" : getPageInfo(pageKeys[index + 1]).short;
    }

    const nextKicker = pageNext ? pageNext.querySelector("small") : null;
    if (nextKicker) nextKicker.textContent = isLast ? "Quay lại" : "Trang tiếp";

    if (pagePrev) pagePrev.disabled = index <= 0;

    pageLinks.forEach((link) => {
      const isActive = link.dataset.pageLink === key;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    $$(".page-controls__dot", pageDots || document).forEach((dot) => {
      const isActive = dot.dataset.pageTarget === key;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "page");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (pageFooter) pageFooter.hidden = key !== "ket";
    if (pageAnnouncer && pageCurrent) {
      pageAnnouncer.textContent = `Trang ${index + 1} trên ${pageKeys.length}: ${info.title}`;
    }

    const siteName =
      typeof SITE !== "undefined" ? `Hộp thư mùa thu — ${SITE.className}` : "Hộp thư mùa thu — 10A17";
    document.title = key === pageKeys[0] ? baseTitle : `${info.title} — ${siteName}`;
  }

  function showPage(key, { push = false, replace = false, focus = false } = {}) {
    const target = pageEls.find((el) => el.dataset.page === key);
    if (!target) return;

    pageEls.forEach((el) => {
      el.classList.toggle("is-active", el === target);
    });

    currentPageKey = key;
    updatePageChrome(key);
    scrollToTopInstant();

    if (push) {
      window.history.pushState({ page: key }, "", `#trang-${key}`);
    } else if (replace) {
      window.history.replaceState({ page: key }, "", `#trang-${key}`);
    }

    if (focus) {
      window.setTimeout(() => {
        target.focus({ preventScroll: true });
      }, 30);
    }
  }

  function navigateToPage(key, { animate = true, push = true, replace = false, focus = true } = {}) {
    if (!pageKeys.includes(key) || pageTransitioning) return;

    if (key === currentPageKey) {
      if (push) window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }

    if (!animate || reduceMotion || !pageTransition) {
      showPage(key, { push, replace, focus });
      return;
    }

    pageTransitioning = true;
    const info = getPageInfo(key);
    if (pageTransitionLabel) pageTransitionLabel.textContent = info.short;
    pageTransition.classList.remove("is-leaving");
    pageTransition.classList.add("is-active");
    window.clearTimeout(pageTimer);

    pageTimer = window.setTimeout(
      () => {
        showPage(key, { push, replace, focus });
        pageTransition.classList.remove("is-active");
        pageTransition.classList.add("is-leaving");
        pageTimer = window.setTimeout(() => {
          pageTransition.classList.remove("is-leaving");
          pageTransitioning = false;
        }, 560);
      },
      reduceMotion ? 0 : 500
    );
  }

  if (pageEls.length) {
    buildPageDots();

    pageLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const key = link.dataset.pageLink;
        if (!pageKeys.includes(key)) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigateToPage(key, { animate: true, push: true, focus: true });
      });
    });

    if (pageDots) {
      pageDots.addEventListener("click", (event) => {
        const button = event.target.closest("[data-page-target]");
        if (!button) return;
        navigateToPage(button.dataset.pageTarget, { animate: true, push: true, focus: true });
      });
    }

    if (pagePrev) {
      pagePrev.addEventListener("click", () => {
        const index = pageKeys.indexOf(currentPageKey);
        if (index > 0) {
          navigateToPage(pageKeys[index - 1], { animate: true, push: true, focus: true });
        }
      });
    }

    if (pageNext) {
      pageNext.addEventListener("click", () => {
        const index = pageKeys.indexOf(currentPageKey);
        const nextKey = index < pageKeys.length - 1 ? pageKeys[index + 1] : pageKeys[0];
        navigateToPage(nextKey, { animate: true, push: true, focus: true });
      });
    }

    window.addEventListener("popstate", () => {
      const key = pageKeyFromHash();
      if (key && key !== currentPageKey) {
        navigateToPage(key, { animate: true, push: false, focus: true });
      }
    });

    // Cho phép dán hash trang vào thanh địa chỉ hoặc bấm một liên kết hash
    // không đi qua router (ví dụ #trang-tro-choi).
    window.addEventListener("hashchange", () => {
      const key = pageKeyFromHash();
      if (key && key !== currentPageKey) {
        navigateToPage(key, { animate: true, push: false, focus: true });
      }
    });

    showPage(pageKeyFromHash() || pageKeys[0], { replace: true });
  }

  /* ---------- Mở phong bì ---------- */

  const envelope = $("#envelope");
  const envelopeHint = $("#envelope-hint");
  let envelopeTimer = null;

  if (envelope) {
    envelope.addEventListener("click", () => {
      const isOpen = envelope.classList.toggle("is-open");
      envelope.setAttribute("aria-expanded", String(isOpen));
      envelope.setAttribute("aria-label", isOpen ? "Đóng phong bì" : "Mở lá thư gửi các cô và các bạn nữ");
      window.clearTimeout(envelopeTimer);

      if (envelopeHint) {
        envelopeHint.textContent = isOpen ? "Lá thư đang mở..." : "Bấm vào phong bì để mở thư";
      }

      if (isOpen) {
        envelopeTimer = window.setTimeout(() => {
          if (pageKeys.includes("la-thu")) {
            navigateToPage("la-thu", { animate: true, push: true, focus: true });
            return;
          }

          const letter = $("#la-thu");
          if (letter) {
            letter.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start"
            });
          }
        }, reduceMotion ? 60 : 980);
      }
    });
  }

  /* ---------- Mini game ---------- */

  const gamesRoot = $("#tro-choi");

  if (gamesRoot) {
    const GAME_KEY = "10a17-20-10-games-v1";
    const gameState = { quiz: false, memory: false, wish: false, photo: false };
    const gameKeys = Object.keys(gameState);
    const totalGames = gameKeys.length;

    try {
      const saved = JSON.parse(window.localStorage.getItem(GAME_KEY) || "null");
      if (saved && typeof saved === "object") {
        gameKeys.forEach((key) => {
          if (saved[key]) gameState[key] = true;
        });
      }
    } catch (error) {
      /* localStorage có thể bị chặn — vẫn chơi bình thường */
    }

    const progressText = $("#games-progress-text");
    const progressBar = $("#games-progress-bar");
    const progressTrack = $("#games-progress");
    const completeBox = $("#games-complete");

    function shuffle(items) {
      const copy = [...items];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function saveGameState() {
      try {
        window.localStorage.setItem(GAME_KEY, JSON.stringify(gameState));
      } catch (error) {
        /* bỏ qua */
      }
    }

    function updateGamesProgress() {
      const done = Object.values(gameState).filter(Boolean).length;
      if (progressText) progressText.textContent = `${done}/${totalGames} trò đã hoàn thành`;
      if (progressBar) progressBar.style.transform = `scaleX(${done / totalGames})`;
      if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(done));
      $$(".games__stamp").forEach((stamp) => {
        stamp.classList.toggle("is-done", Boolean(gameState[stamp.dataset.stamp]));
      });
      $$(".game-card[data-game]").forEach((card) => {
        card.classList.toggle("is-complete", Boolean(gameState[card.dataset.game]));
      });
      if (completeBox) completeBox.hidden = done < totalGames;
      saveGameState();
    }

    /* Game 1 — trắc nghiệm */
    const quizOptions = $("#quiz-options");
    const quizQuestion = $("#quiz-question");
    const quizStep = $("#quiz-step");
    const quizScore = $("#quiz-score");
    const quizFeedback = $("#quiz-feedback");
    const quizNext = $("#quiz-next");
    const quizRestart = $("#quiz-restart");

    if (
      quizOptions &&
      quizQuestion &&
      quizStep &&
      quizScore &&
      quizFeedback &&
      quizNext &&
      quizRestart &&
      typeof QUIZ !== "undefined" &&
      QUIZ.length
    ) {
      let quizIndex = 0;
      let quizCorrect = 0;
      let quizAnswered = false;

      function renderQuiz() {
        const item = QUIZ[quizIndex];
        quizAnswered = false;
        quizStep.textContent = `Câu ${quizIndex + 1}/${QUIZ.length}`;
        quizScore.textContent = `${quizCorrect}/${QUIZ.length} đúng`;
        quizQuestion.textContent = item.question;
        quizFeedback.textContent = "";
        quizNext.hidden = true;
        quizRestart.hidden = true;
        quizOptions.innerHTML = item.options
          .map(
            (option, index) => `
              <button class="quiz__option" type="button" data-index="${index}">
                <span class="quiz__option-key">${String.fromCharCode(65 + index)}</span>
                <span>${escapeHtml(option)}</span>
              </button>
            `
          )
          .join("");
      }

      quizOptions.addEventListener("click", (event) => {
        const button = event.target.closest(".quiz__option");
        if (!button || quizAnswered) return;

        const item = QUIZ[quizIndex];
        const picked = Number(button.dataset.index);
        const isCorrect = picked === item.answer;
        quizAnswered = true;

        $$(".quiz__option", quizOptions).forEach((option, index) => {
          option.disabled = true;
          if (index === item.answer) option.classList.add("is-correct");
        });
        button.classList.add(isCorrect ? "is-picked" : "is-wrong");
        if (isCorrect) {
          quizCorrect += 1;
          quizFeedback.textContent = `Chính xác! ${item.explain}`;
        } else {
          quizFeedback.textContent = `Chưa đúng. ${item.explain}`;
        }
        quizScore.textContent = `${quizCorrect}/${QUIZ.length} đúng`;

        if (quizIndex < QUIZ.length - 1) {
          quizNext.hidden = false;
        } else {
          quizRestart.hidden = false;
          quizFeedback.textContent += ` Bạn đúng ${quizCorrect}/${QUIZ.length} câu.`;
          gameState.quiz = true;
          updateGamesProgress();
        }
      });

      quizNext.addEventListener("click", () => {
        quizIndex += 1;
        renderQuiz();
      });

      quizRestart.addEventListener("click", () => {
        quizIndex = 0;
        quizCorrect = 0;
        renderQuiz();
      });

      renderQuiz();
    }

    /* Game 2 — lật thẻ ghép đôi */
    const memoryGrid = $("#memory-grid");
    const memoryMoves = $("#memory-moves");
    const memoryPairs = $("#memory-pairs");
    const memoryFeedback = $("#memory-feedback");
    const memoryRestart = $("#memory-restart");

    if (memoryGrid && memoryMoves && memoryPairs && memoryFeedback && memoryRestart && typeof MEMORY_WORDS !== "undefined" && MEMORY_WORDS.length) {
      let firstCard = null;
      let secondCard = null;
      let memoryLock = false;
      let memoryTimer = null;
      let matchedPairs = 0;
      let moveCount = 0;

      function buildMemory() {
        window.clearTimeout(memoryTimer);
        firstCard = null;
        secondCard = null;
        memoryLock = false;
        matchedPairs = 0;
        moveCount = 0;
        memoryMoves.textContent = "0 lượt lật";
        memoryPairs.textContent = `0/${MEMORY_WORDS.length} cặp`;
        memoryFeedback.textContent = "";
        const deck = shuffle([...MEMORY_WORDS, ...MEMORY_WORDS]);
        memoryGrid.innerHTML = deck
          .map(
            (word) => `
              <button class="memory-card" type="button" data-word="${escapeHtml(word)}" aria-label="Thẻ chưa lật">
                <span class="memory-card__inner" aria-hidden="true">
                  <span class="memory-card__face memory-card__front">
                    <svg class="icon"><use href="#i-flower"></use></svg>
                  </span>
                  <span class="memory-card__face memory-card__back">${escapeHtml(word)}</span>
                </span>
              </button>
            `
          )
          .join("");
      }

      memoryGrid.addEventListener("click", (event) => {
        const card = event.target.closest(".memory-card");
        if (!card || memoryLock || card.classList.contains("is-flipped") || card.classList.contains("is-matched")) return;

        card.classList.add("is-flipped");
        card.setAttribute("aria-label", `Thẻ đã lật: ${card.dataset.word}`);

        if (!firstCard) {
          firstCard = card;
          return;
        }

        secondCard = card;
        moveCount += 1;
        memoryMoves.textContent = `${moveCount} lượt lật`;

        if (firstCard.dataset.word === secondCard.dataset.word) {
          firstCard.classList.add("is-matched");
          secondCard.classList.add("is-matched");
          firstCard.disabled = true;
          secondCard.disabled = true;
          matchedPairs += 1;
          memoryPairs.textContent = `${matchedPairs}/${MEMORY_WORDS.length} cặp`;
          firstCard = null;
          secondCard = null;

          if (matchedPairs === MEMORY_WORDS.length) {
            memoryFeedback.textContent = `Bạn đã ghép đủ ${MEMORY_WORDS.length} cặp! Một tràng pháo tay cho trí nhớ của bạn.`;
            gameState.memory = true;
            updateGamesProgress();
          }
        } else {
          memoryLock = true;
          const cardA = firstCard;
          const cardB = secondCard;
          memoryTimer = window.setTimeout(() => {
            [cardA, cardB].forEach((item) => {
              item.classList.remove("is-flipped");
              item.setAttribute("aria-label", "Thẻ chưa lật");
            });
            firstCard = null;
            secondCard = null;
            memoryLock = false;
          }, reduceMotion ? 250 : 780);
        }
      });

      memoryRestart.addEventListener("click", buildMemory);
      buildMemory();
    }

    /* Game 3 — rút một lời chúc */
    const wishGrid = $("#wish-draw");
    const wishResult = $("#wish-result");
    const wishReset = $("#wish-reset");

    if (wishGrid && wishResult && wishReset && typeof WISHES !== "undefined" && WISHES.length) {
      let wishDeck = [];
      let wishDrawn = false;

      function buildWishes() {
        wishDrawn = false;
        wishDeck = shuffle([...WISHES]);
        wishResult.textContent = "Chọn một ô để nhận một lời chúc.";
        wishReset.hidden = true;
        wishGrid.innerHTML = wishDeck
          .map(
            (wish, index) => `
              <button class="wish-draw__card" type="button" data-index="${index}" aria-label="Rút ô số ${index + 1}">
                <svg class="icon" aria-hidden="true"><use href="#i-flower"></use></svg>
                <span aria-hidden="true">?</span>
              </button>
            `
          )
          .join("");
      }

      wishGrid.addEventListener("click", (event) => {
        const card = event.target.closest(".wish-draw__card");
        if (!card || wishDrawn) return;
        wishDrawn = true;
        card.classList.add("is-picked");
        const wish = wishDeck[Number(card.dataset.index)];
        wishResult.textContent = `“${wish}”`;
        wishReset.hidden = false;
        gameState.wish = true;
        updateGamesProgress();
      });

      wishReset.addEventListener("click", buildWishes);
      buildWishes();
    }

    /* Game 4 — nhìn ảnh thời thơ ấu đoán tên */
    const photoImage = $("#photo-image");
    const photoFrame = $("#photo-frame");
    const photoStep = $("#photo-step");
    const photoScore = $("#photo-score");
    const photoOptions = $("#photo-options");
    const photoFeedback = $("#photo-feedback");
    const photoNext = $("#photo-next");
    const photoRestart = $("#photo-restart");
    const photoDots = $("#photo-dots");

    if (
      photoImage &&
      photoFrame &&
      photoStep &&
      photoScore &&
      photoOptions &&
      photoFeedback &&
      photoNext &&
      photoRestart &&
      photoDots &&
      typeof PHOTO_GUESS !== "undefined" &&
      PHOTO_GUESS.length >= 4
    ) {
      let photoDeck = [];
      let photoIndex = 0;
      let photoCorrect = 0;
      let photoAnswered = false;
      let photoResults = [];

      function renderPhotoDots() {
        photoDots.innerHTML = photoDeck
          .map((_, index) => {
            const state = photoResults[index];
            const classes = [
              "photo-game__dot",
              index === photoIndex ? "is-current" : "",
              state === true ? "is-correct" : "",
              state === false ? "is-wrong" : ""
            ]
              .filter(Boolean)
              .join(" ");
            return `<span class="${classes}"></span>`;
          })
          .join("");
      }

      function renderPhoto() {
        const item = photoDeck[photoIndex];
        photoAnswered = false;
        photoFrame.classList.remove("is-entering", "is-correct", "is-wrong");
        void photoFrame.offsetWidth;
        photoFrame.classList.add("is-entering");
        photoImage.classList.remove("is-correct", "is-wrong");
        photoImage.src = item.file;
        photoImage.alt = "Ảnh thời thơ ấu của một thành viên lớp 10A17";
        photoImage.style.objectPosition = item.pos || "50% 35%";
        photoStep.textContent = `Ảnh ${photoIndex + 1}/${photoDeck.length}`;
        photoScore.textContent = `${photoCorrect}/${photoDeck.length} đúng`;
        photoFeedback.textContent = "";
        photoNext.hidden = true;
        photoRestart.hidden = true;

        const otherNames = shuffle(
          PHOTO_GUESS.filter((person) => person.name !== item.name).map((person) => person.name)
        ).slice(0, 3);
        const options = shuffle([item.name, ...otherNames]);

        photoOptions.innerHTML = options
          .map(
            (name, index) => `
              <button class="photo-game__option" type="button" data-name="${escapeHtml(name)}" style="--option-index:${index}">
                <span class="photo-game__option-key">${String.fromCharCode(65 + index)}</span>
                <span>${escapeHtml(name)}</span>
              </button>
            `
          )
          .join("");
        renderPhotoDots();
      }

      function buildPhotos() {
        photoDeck = shuffle([...PHOTO_GUESS]);
        photoIndex = 0;
        photoCorrect = 0;
        photoResults = [];
        renderPhoto();
      }

      photoOptions.addEventListener("click", (event) => {
        const button = event.target.closest(".photo-game__option");
        if (!button || photoAnswered) return;

        const item = photoDeck[photoIndex];
        const isCorrect = button.dataset.name === item.name;
        photoAnswered = true;
        photoResults[photoIndex] = isCorrect;

        $$(".photo-game__option", photoOptions).forEach((option) => {
          option.disabled = true;
          if (option.dataset.name === item.name) option.classList.add("is-correct");
        });
        if (!isCorrect) button.classList.add("is-wrong");

        if (isCorrect) {
          photoCorrect += 1;
          photoFeedback.textContent = `Chính xác! Đây là ${item.name}.`;
          photoFrame.classList.add("is-correct");
        } else {
          photoFeedback.textContent = `Chưa đúng rồi — đây là ${item.name}.`;
          photoFrame.classList.add("is-wrong");
        }

        photoImage.alt = `Ảnh thời thơ ấu của ${item.name}`;
        photoScore.textContent = `${photoCorrect}/${photoDeck.length} đúng`;
        renderPhotoDots();

        if (photoIndex < photoDeck.length - 1) {
          photoNext.hidden = false;
        } else {
          photoRestart.hidden = false;
          photoFeedback.textContent += ` Bạn nhận ra ${photoCorrect}/${photoDeck.length} người.`;
          gameState.photo = true;
          updateGamesProgress();
        }
      });

      photoNext.addEventListener("click", () => {
        photoIndex += 1;
        renderPhoto();
      });

      photoRestart.addEventListener("click", buildPhotos);

      buildPhotos();

      const preloadPhotos = () => {
        PHOTO_GUESS.forEach(({ file }) => {
          const image = new Image();
          image.src = file;
        });
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadPhotos, { timeout: 2500 });
      } else {
        window.setTimeout(preloadPhotos, 1200);
      }
    }

    updateGamesProgress();
  }

  /* ---------- Nhạc nền ---------- */

  const audio = $("#bg-music");
  const player = $("#player");
  const playerBtn = $("#player-toggle");
  const musicToggle = $("#music-toggle");
  let musicRequested = false;

  function setPlayingUI(isPlaying) {
    if (player) player.classList.toggle("is-playing", isPlaying);
    if (musicToggle) {
      musicToggle.classList.toggle("is-playing", isPlaying);
      musicToggle.setAttribute("aria-pressed", String(isPlaying));
      musicToggle.setAttribute("aria-label", isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền");
    }
    if (playerBtn) {
      playerBtn.setAttribute("aria-pressed", String(isPlaying));
      playerBtn.setAttribute("aria-label", isPlaying ? "Tạm dừng nhạc nền" : "Phát nhạc nền");
    }
  }

  async function toggleMusic() {
    if (!audio) return;

    if (audio.paused) {
      musicRequested = true;
      try {
        await audio.play();
      } catch (error) {
        showToast("Không phát được nhạc. Bạn thử lại hoặc kiểm tra kết nối nhé.");
      }
    } else {
      audio.pause();
    }
  }

  if (audio) {
    audio.volume = 0.38;
    audio.addEventListener("play", () => setPlayingUI(true));
    audio.addEventListener("pause", () => setPlayingUI(false));
    audio.addEventListener("ended", () => setPlayingUI(false));
    audio.addEventListener("error", () => {
      if (musicRequested) showToast("Không tìm thấy tệp nhạc. Bạn kiểm tra lại thư mục audio nhé.");
    });
  }

  if (musicToggle) musicToggle.addEventListener("click", toggleMusic);
  if (playerBtn) playerBtn.addEventListener("click", toggleMusic);

  /* ---------- In + chia sẻ ---------- */

  const printButton = $("#print-letter");
  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {
      /* thử cách dự phòng bên dưới */
    }

    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    input.style.pointerEvents = "none";
    document.body.appendChild(input);
    input.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    input.remove();
    return copied;
  }

  const shareButton = $("#share-page");
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      if (window.location.protocol === "file:") {
        showToast("Trang đang chạy thử trên máy. Khi đưa lên mạng, nút này sẽ chia sẻ liên kết nhé.");
        return;
      }

      const shareUrl = new URL(window.location.href);
      shareUrl.hash = "";

      const data = {
        title: `Hộp thư mùa thu — ${typeof SITE !== "undefined" ? SITE.className : "10A17"} gửi các cô và các bạn nữ`,
        text: "Có một mùa thu, nhóm con trai lớp mình viết thư cho các cô và các bạn nữ.",
        url: shareUrl.href
      };

      if (navigator.share) {
        try {
          await navigator.share(data);
          return;
        } catch (error) {
          if (error && error.name === "AbortError") return;
        }
      }

      const copied = await copyText(data.url);
      showToast(copied ? "Đã sao chép liên kết. Gửi cho các cô và các bạn nhé!" : "Bạn có thể sao chép liên kết trên thanh địa chỉ.");
    });
  }

  /* ---------- Cánh hoa rơi ---------- */

  const petals = $("#petals");
  if (petals && !reduceMotion) {
    const count = window.innerWidth < 680 ? 6 : 9;

    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--size", `${8 + Math.random() * 7}px`);
      petal.style.setProperty("--dur", `${14 + Math.random() * 10}s`);
      petal.style.setProperty("--delay", `${-Math.random() * 22}s`);
      petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
      petals.appendChild(petal);
    }
  }
})();
