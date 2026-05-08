const images = [
  'images/img0.jpg',
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  'images/img4.jpg',
  'images/img5.jpg'
];

const bgEls = [
  document.getElementById('bg1'),
  document.getElementById('bg2'),
  document.getElementById('bg3'),
  document.getElementById('bg4'),
  document.getElementById('bg5'),
  document.getElementById('bg6')
].filter(Boolean);

const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const langButtons = document.querySelectorAll('.lang-btn');
const revealEls = document.querySelectorAll('.reveal');

let sliderIndex = 0;
let currentLang = 'en';

const services = [
  {
    image: 'images/joint.jpg',
    title: { en: 'Joint Pain', ta: 'மூட்டு வலி' },
    desc: {
      en: 'Support for stiffness, inflammation, and pain in joints.',
      ta: 'மூட்டுகளில் ஏற்படும் வலி, இறுக்கம், மற்றும் அழற்சிக்கு ஆதரவு.'
    }
  },
  {
    image: 'images/neck.jpg',
    title: { en: 'Neck Pain', ta: 'கழுத்து வலி' },
    desc: {
      en: 'Helps ease neck stiffness, strain, and discomfort.',
      ta: 'கழுத்தின் இறுக்கம், சோர்வு, மற்றும் வலியை குறைக்க உதவும்.'
    }
  },
  {
    image: 'images/headache.jpg',
    title: { en: 'Headache', ta: 'தலைவலி' },
    desc: {
      en: 'Helpful for recurring headaches and migraine-like symptoms.',
      ta: 'மீண்டும் மீண்டும் வரும் தலைவலி மற்றும் மைக்ரேன் போன்ற பிரச்சினைகளுக்கு உதவும்.'
    }
  },
  {
    image: 'images/shoulder.jpg',
    title: { en: 'Shoulder Pain', ta: 'தோள்பட்டை வலி' },
    desc: {
      en: 'Useful for frozen shoulder, muscle tension, and pain.',
      ta: 'தோள்பட்டை இறுக்கம், தசை வலி, மற்றும் frozen shoulder-க்கு உதவும்.'
    }
  },
  {
    image: 'images/hip.jpg',
    title: { en: 'Hip Pain', ta: 'இடுப்பு வலி' },
    desc: {
      en: 'Helps with hip discomfort, mobility issues, and strain.',
      ta: 'இடுப்பு வலி, நகர்வில் சிரமம், மற்றும் சோர்வுக்கு உதவும்.'
    }
  },
  {
    image: 'images/heel.jpg',
    title: { en: 'Heel Pain', ta: 'குதிகால் வலி' },
    desc: {
      en: 'Support for heel pain caused by strain or overuse.',
      ta: 'அதிக பயன்பாடு அல்லது அழுத்தத்தால் ஏற்படும் குதிகால் வலிக்கு ஆதரவு.'
    }
  },
  {
    image: 'images/asthma.jpg',
    title: { en: 'Asthma', ta: 'ஆஸ்துமா' },
    desc: {
      en: 'Supports breathing comfort and respiratory balance.',
      ta: 'மூச்சுக்குழாய் நிம்மதி மற்றும் சுவாச சமநிலைக்கு ஆதரவு.'
    }
  },
  {
    image: 'images/sinus.jpg',
    title: { en: 'Sinus', ta: 'சைனஸ்' },
    desc: {
      en: 'May help reduce sinus pressure, congestion, and discomfort.',
      ta: 'சைனஸ் அழுத்தம், அடைப்பு, மற்றும் அசௌகரியத்தை குறைக்க உதவும்.'
    }
  },
  {
    image: 'images/weight.jpg',
    title: { en: 'Weight Management', ta: 'உடற்பருமன்' },
    desc: {
      en: 'Supports healthy weight reduction and body balance.',
      ta: 'ஆரோக்கியமான எடை குறைப்பு மற்றும் உடல் சமநிலைக்கு உதவும்.'
    }
  },
  {
    image: 'images/insomnia.jpg',
    title: { en: 'Insomnia', ta: 'தூக்கமின்மை' },
    desc: {
      en: 'Helps relaxation, sleep quality, and stress reduction.',
      ta: 'தளர்ச்சி, நல்ல உறக்கம், மற்றும் மன அழுத்த குறைப்புக்கு உதவும்.'
    }
  },
  {
    image: 'images/digestion.jpg',
    title: { en: 'Digestive Issues', ta: 'குடல் இரக்கம்' },
    desc: {
      en: 'May support digestion, appetite, and gut comfort.',
      ta: 'செரிமானம், பசியுணர்வு, மற்றும் குடல் நிம்மதிக்கு உதவும்.'
    }
  },
  {
    image: 'images/constipation.jpg',
    title: { en: 'Constipation', ta: 'மலச்சிக்கல்' },
    desc: {
      en: 'Natural support for bowel movement regularity.',
      ta: 'மலம் கழிக்கும் சீரமைப்பு மற்றும் நிம்மதிக்கு உதவும்.'
    }
  },
  {
    image: 'images/fertility.jpg',
    title: { en: 'Fertility Support', ta: 'இனவிருத்த குறைபாடு' },
    desc: {
      en: 'Supports reproductive balance and overall wellness.',
      ta: 'மருத்துவ சமநிலை மற்றும் இனவிருத்த நலனை ஆதரிக்கிறது.'
    }
  },
  {
    image: 'images/wellness.jpg',
    title: { en: 'General Wellness', ta: 'பொது ஆரோக்கியம்' },
    desc: {
      en: 'Improves energy balance, relaxation, and overall well-being.',
      ta: 'ஆற்றல் சமநிலை, தளர்ச்சி, மற்றும் உடல்நலத்தை மேம்படுத்துகிறது.'
    }
  }
];

let currentService = 0;
let serviceAutoTimer = null;

const STORAGE_KEY = 'sai_acupuncture_reviews_v1';
const ADMIN_KEY = 'sai_acupuncture_admin_logged_in_v1';

function setHeroBackgrounds() {
  if (bgEls.length !== 6) return;

  bgEls.forEach((el, i) => {
    el.style.backgroundImage = `url(${images[i]})`;
    el.classList.toggle('active', i === 0);
  });
}

function rotateHero() {
  if (bgEls.length !== 6) return;

  sliderIndex = (sliderIndex + 1) % images.length;
  bgEls.forEach((el, i) => {
    el.style.backgroundImage = `url(${images[(sliderIndex + i) % images.length]})`;
    el.classList.toggle('active', i === 0);
  });
}

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-en]').forEach(el => {
    const value = el.getAttribute(`data-${lang}`);
    if (value !== null) el.textContent = value;
  });

  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const value = el.getAttribute(`data-${lang}-placeholder`);
    if (value !== null) el.setAttribute('placeholder', value);
  });

  renderServiceList();
  renderService(currentService, false);
}

window.setLang = setLang;

function observeReveals() {
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}

function renderServiceList() {
  const listEl = document.getElementById('serviceList');
  if (!listEl) return;

  listEl.innerHTML = services.map((service, index) => `
    <button class="service-list-item" type="button" data-index="${index}">
      <span class="service-list-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="service-list-name">${service.title[currentLang]}</span>
    </button>
  `).join('');

  listEl.querySelectorAll('.service-list-item').forEach((item) => {
    item.addEventListener('click', () => {
      currentService = Number(item.dataset.index || 0);
      renderService(currentService, true);
      restartServiceAuto();
      document.getElementById('serviceSpotlight')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
  });
}

function renderService(index, animate = true) {
  const service = services[index];
  const imageEl = document.getElementById('serviceImage');
  const titleEl = document.getElementById('serviceTitle');
  const textEl = document.getElementById('serviceText');
  const indexEl = document.getElementById('serviceIndex');
  const barsEl = document.getElementById('serviceBars');
  const spotlight = document.getElementById('serviceSpotlight');

  if (!service || !imageEl || !titleEl || !textEl || !indexEl || !barsEl || !spotlight) return;

  imageEl.src = service.image;
  imageEl.alt = service.title[currentLang];
  titleEl.textContent = service.title[currentLang];
  textEl.textContent = service.desc[currentLang];
  indexEl.textContent = String(index + 1).padStart(2, '0');

  barsEl.innerHTML = services.map((_, i) =>
    `<span class="service-bar ${i === index ? 'active' : ''}" data-index="${i}" aria-label="Go to treatment ${i + 1}"></span>`
  ).join('');

  barsEl.querySelectorAll('.service-bar').forEach(bar => {
    bar.addEventListener('click', () => {
      currentService = Number(bar.dataset.index);
      renderService(currentService, true);
      restartServiceAuto();
    });
  });

  if (animate) {
    spotlight.classList.remove('flash');
    void spotlight.offsetWidth;
    spotlight.classList.add('flash');
  }
}

function nextService() {
  currentService = (currentService + 1) % services.length;
  renderService(currentService, true);
}

function prevService() {
  currentService = (currentService - 1 + services.length) % services.length;
  renderService(currentService, true);
}

function restartServiceAuto() {
  if (serviceAutoTimer) clearInterval(serviceAutoTimer);
  serviceAutoTimer = setInterval(nextService, 3500);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const servicePrev = document.getElementById('servicePrev');
const serviceNext = document.getElementById('serviceNext');
if (servicePrev) servicePrev.addEventListener('click', () => { prevService(); restartServiceAuto(); });
if (serviceNext) serviceNext.addEventListener('click', () => { nextService(); restartServiceAuto(); });

let touchStartX = 0;
let touchEndX = 0;
const serviceSpotlight = document.getElementById('serviceSpotlight');
if (serviceSpotlight) {
  serviceSpotlight.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  serviceSpotlight.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextService();
      else prevService();
      restartServiceAuto();
    }
  }, { passive: true });
}

/* Reviews */
const reviewList = document.getElementById('reviewList');
const reviewName = document.getElementById('reviewName');
const reviewText = document.getElementById('reviewText');
const starButtons = document.querySelectorAll('.star-input button');
const adminLoggedOut = document.getElementById('adminLoggedOut');
const adminLoggedIn = document.getElementById('adminLoggedIn');
const adminStatusText = document.getElementById('adminStatusText');
const adminEmail = document.getElementById('adminEmail');
const adminPassword = document.getElementById('adminPassword');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

let selectedRating = 0;
let isAdmin = false;
let reviewsCache = [];

function renderStars(rating) {
  return '★'.repeat(Number(rating || 0));
}

function updateStarUI() {
  document.querySelectorAll('.star-input button').forEach((btn) => {
    const rating = Number(btn.dataset.rating || 0);
    btn.classList.toggle('active', rating <= selectedRating);
  });
}

window.setRating = function setRating(value) {
  selectedRating = Number(value || 0);
  updateStarUI();
};

window.addReview = async function addReview(event) {
  event.preventDefault();

  const nameEl = document.getElementById('reviewName');
  const textEl = document.getElementById('reviewText');

  if (!nameEl || !textEl) return;

  const name = nameEl.value.trim();
  const text = textEl.value.trim();

  if (!name || !text || selectedRating === 0) {
    alert("Please enter your name, rating, and review.");
    return;
  }

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push({
      id: String(Date.now()),
      name,
      text,
      rating: selectedRating,
      createdAt: Date.now()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    nameEl.value = "";
    textEl.value = "";
    selectedRating = 0;
    updateStarUI();
    renderReviews(existing);
  } catch (error) {
    console.error(error);
    alert("Could not submit review. Please try again.");
  }
};

async function deleteReview(reviewId) {
  if (!isAdmin) return;

  const ok = confirm("Delete this review?");
  if (!ok) return;

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const updated = existing.filter((item) => String(item.id) !== String(reviewId));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  reviewsCache = updated;
  renderReviews(updated);
}

function renderReviews(reviews) {
  if (!reviewList) return;
  reviewList.innerHTML = "";

  if (!reviews.length) {
    const empty = document.createElement("div");
    empty.className = "review-item";
    empty.innerHTML = `<p>No reviews yet. Be the first to share your experience.</p>`;
    reviewList.appendChild(empty);
    return;
  }

  reviews
    .slice()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .forEach((review) => {
      const item = document.createElement("article");
      item.className = "review-item reveal active";

      const top = document.createElement("div");
      top.className = "review-top";

      const avatar = document.createElement("div");
      avatar.className = "review-avatar review-avatar-placeholder";
      avatar.innerHTML = `<i class="fa-solid fa-user"></i>`;

      const meta = document.createElement("div");
      meta.className = "review-meta";

      const head = document.createElement("div");
      head.className = "review-head";

      const name = document.createElement("strong");
      name.textContent = review.name || "Anonymous";

      const stars = document.createElement("span");
      stars.className = "stars";
      stars.textContent = renderStars(review.rating);

      head.appendChild(name);
      head.appendChild(stars);

      const date = document.createElement("div");
      date.className = "review-date";
      date.textContent = review.createdAt ? new Date(review.createdAt).toLocaleString() : "";

      meta.appendChild(head);
      meta.appendChild(date);

      top.appendChild(avatar);
      top.appendChild(meta);

      const text = document.createElement("p");
      text.textContent = review.text || "";

      item.appendChild(top);
      item.appendChild(text);

      if (isAdmin) {
        const actions = document.createElement("div");
        actions.className = "review-actions";

        const del = document.createElement("button");
        del.className = "delete-btn";
        del.type = "button";
        del.textContent = "Delete";
        del.addEventListener("click", () => deleteReview(review.id));

        actions.appendChild(del);
        item.appendChild(actions);
      }

      reviewList.appendChild(item);
    });
}

function loadReviewsFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    reviewsCache = Array.isArray(saved) ? saved : [];
  } catch {
    reviewsCache = [];
  }
  renderReviews(reviewsCache);
}

async function handleAdminLogin() {
  const email = document.getElementById("adminEmail");
  const password = document.getElementById("adminPassword");

  if (!email || !password) return;

  const mail = email.value.trim();
  const pass = password.value.trim();

  if (!mail || !pass) {
    alert("Enter admin email and password.");
    return;
  }

  localStorage.setItem(ADMIN_KEY, '1');
  localStorage.setItem('sai_acupuncture_admin_email', mail);
  email.value = "";
  password.value = "";
  isAdmin = true;
  syncAdminUI();
}

async function handleAdminLogout() {
  localStorage.removeItem(ADMIN_KEY);
  localStorage.removeItem('sai_acupuncture_admin_email');
  isAdmin = false;
  syncAdminUI();
}

function syncAdminUI() {
  const loggedIn = localStorage.getItem(ADMIN_KEY) === '1';
  isAdmin = loggedIn;

  if (adminLoggedOut && adminLoggedIn) {
    adminLoggedOut.classList.toggle("hidden", loggedIn);
    adminLoggedIn.classList.toggle("hidden", !loggedIn);
  }

  if (adminStatusText) {
    const adminEmailValue = localStorage.getItem('sai_acupuncture_admin_email') || 'Admin';
    adminStatusText.textContent = loggedIn
      ? `Logged in as ${adminEmailValue}`
      : "You are not logged in.";
  }

  renderReviews(reviewsCache);
}

if (adminLoginBtn) adminLoginBtn.addEventListener("click", handleAdminLogin);
if (adminLogoutBtn) adminLogoutBtn.addEventListener("click", handleAdminLogout);

function observeReveals() {
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}

/* Init */
setHeroBackgrounds();
observeReveals();
renderServiceList();
renderService(currentService, false);
restartServiceAuto();
setInterval(rotateHero, 3500);
setLang('en');
loadReviewsFromStorage();
syncAdminUI();

window.addEventListener('resize', () => {
  if (window.innerWidth > 860 && navLinks) {
    navLinks.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }
});
