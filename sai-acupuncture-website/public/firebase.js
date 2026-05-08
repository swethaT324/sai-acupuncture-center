import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaiJ_FLqTQVQizMfo5Y1cI97-femtWk1E",
  authDomain: "sai-acupuncture-e0547.firebaseapp.com",
  projectId: "sai-acupuncture-e0547",
  storageBucket: "sai-acupuncture-e0547.firebasestorage.app",
  messagingSenderId: "385270548453",
  appId: "1:385270548453:web:824720b5cd38e7ff44910c",
  measurementId: "G-F621DCNQL0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let selectedRating = 0;
let isAdmin = false;
let reviewsCache = [];

const reviewList = document.getElementById("reviewList");
const adminLoggedOut = document.getElementById("adminLoggedOut");
const adminLoggedIn = document.getElementById("adminLoggedIn");
const adminStatusText = document.getElementById("adminStatusText");

function renderStars(rating) {
  return "★".repeat(Number(rating || 0));
}

function updateStarUI() {
  document.querySelectorAll(".star-input button").forEach((btn) => {
    const rating = Number(btn.dataset.rating || 0);
    btn.classList.toggle("active", rating <= selectedRating);
  });
}

window.setRating = function (rating) {
  selectedRating = Number(rating || 0);
  updateStarUI();
};

window.addReview = async function (event) {
  event.preventDefault();

  const nameEl = document.getElementById("reviewName");
  const textEl = document.getElementById("reviewText");

  if (!nameEl || !textEl) return;

  const name = nameEl.value.trim();
  const text = textEl.value.trim();

  if (!name || !text || selectedRating === 0) {
    alert("Please enter your name, rating, and review.");
    return;
  }

  try {
    await addDoc(collection(db, "reviews"), {
      name,
      text,
      rating: selectedRating,
      createdAt: Date.now()
    });

    nameEl.value = "";
    textEl.value = "";
    selectedRating = 0;
    updateStarUI();
  } catch (error) {
    console.error(error);
    alert("Could not submit review. Please try again.");
  }
};

async function deleteReview(reviewId) {
  if (!isAdmin) return;

  const ok = confirm("Delete this review?");
  if (!ok) return;

  try {
    await deleteDoc(doc(db, "reviews", reviewId));
  } catch (error) {
    console.error(error);
    alert("Could not delete review.");
  }
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

  reviews.forEach((review) => {
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
    name.textContent = review.name;

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
    text.textContent = review.text;

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

function loadReviewsRealtime() {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    reviewsCache = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
    renderReviews(reviewsCache);
  });
}

async function handleAdminLogin() {
  const email = document.getElementById("adminEmail");
  const password = document.getElementById("adminPassword");

  if (!email || !password) return;

  try {
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
    email.value = "";
    password.value = "";
  } catch (error) {
    console.error(error);
    alert("Admin login failed.");
  }
}

async function handleAdminLogout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}

const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");

if (adminLoginBtn) adminLoginBtn.addEventListener("click", handleAdminLogin);
if (adminLogoutBtn) adminLogoutBtn.addEventListener("click", handleAdminLogout);

onAuthStateChanged(auth, (user) => {
  isAdmin = !!user;

  if (adminLoggedOut && adminLoggedIn) {
    adminLoggedOut.classList.toggle("hidden", isAdmin);
    adminLoggedIn.classList.toggle("hidden", !isAdmin);
  }

  if (adminStatusText) {
    adminStatusText.textContent = isAdmin
      ? `Logged in as ${user.email}`
      : "You are not logged in.";
  }

  renderReviews(reviewsCache);
});

loadReviewsRealtime();
updateStarUI();