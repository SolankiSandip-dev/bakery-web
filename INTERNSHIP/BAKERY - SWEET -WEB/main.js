









const _isPhoneOk = new URLSearchParams(location.search).has("order_ok");
if (!_isPhoneOk && sessionStorage.getItem("loggedIn") !== "true") {
  location.replace("login.html");
}
/*
if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.replace("login.html");
}
window.addEventListener("beforeunload", function() {
    sessionStorage.removeItem("loggedIn");
});
*/







/*

document.addEventListener("DOMContentLoaded", function () {
    const slidesContainer = document.getElementById("slidesContainer");
    const allSlides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".dot");
    const realCount = dots.length; // 5 real slides
    const totalItems = allSlides.length; // 6 (5 real + 1 clone)

    let currentIndex = 0;
    const transitionSpeed = "transform 0.6s ease-in-out";

    function setPosition(index, withTransition = true) {
      slidesContainer.style.transition = withTransition ? transitionSpeed : "none";
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;

      const activeDotIndex = index % realCount;
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === activeDotIndex);
      });
    }

    // Start on 1st image
    setPosition(0, false);

    // Clone slide par transition khatam hote hi real 1st slide (0) par silent snap
    slidesContainer.addEventListener("transitionend", function () {
      if (currentIndex === realCount) {
        currentIndex = 0;
        setPosition(0, false);
      }
    });

    function nextStep() {
      currentIndex++;
      setPosition(currentIndex, true);
    }

    window.changeSlide = function (step) {
      if (step > 0) {
        if (currentIndex >= realCount) {
          currentIndex = 0;
          setPosition(0, false);
          slidesContainer.offsetHeight;
        }
        currentIndex++;
        setPosition(currentIndex, true);
      } else {
        if (currentIndex <= 0) {
          currentIndex = realCount;
          setPosition(currentIndex, false);
          slidesContainer.offsetHeight;
        }
        currentIndex--;
        setPosition(currentIndex, true);
      }
      resetTimer();
    };

    window.goToSlide = function (index) {
      currentIndex = index;
      setPosition(currentIndex, true);
      resetTimer();
    };

    let autoTimer = setInterval(nextStep, 4000);

    function resetTimer() {
      clearInterval(autoTimer);
      autoTimer = setInterval(nextStep, 4000);
    }
  });
  ------------------*/


/* if (sessionStorage.getItem("loggedIn") !== "true") {
  window.location.replace("login.html");
}
window.addEventListener("beforeunload", function () {
  sessionStorage.removeItem("loggedIn");
});
*/
document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.getElementById("slidesContainer");
  const allSlides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".dot");
  const realCount = dots.length;
  const totalItems = allSlides.length;

  let currentIndex = 0;
  const transitionSpeed = "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)";

  // --- CHANGE 1: Text delay timer aur timing (650ms = ~0.65 sec) ---
  let textDelayTimer = null;
  const TEXT_SHOW_DELAY = 500; // 1 second chahiye toh 1000 kar dein

  // --- CHANGE 2: triggerTextAnimation mein immediate aur delay option ---
  function triggerTextAnimation(slideIndex, immediate = false) {
    clearTimeout(textDelayTimer);

    allSlides.forEach((slide) => {
      slide.classList.remove("text-animate");
    });

    const targetSlide = allSlides[slideIndex];
    if (!targetSlide) return;

    if (immediate) {
      void targetSlide.offsetWidth;
      targetSlide.classList.add("text-animate");
    } else {
      textDelayTimer = setTimeout(() => {
        void targetSlide.offsetWidth;
        targetSlide.classList.add("text-animate");
      }, TEXT_SHOW_DELAY);
    }
  }

  // --- CHANGE 3: setPosition mein immediateText parameter ---
  function setPosition(index, withTransition = true, immediateText = false) {
    slidesContainer.style.transition = withTransition ? transitionSpeed : "none";
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    const activeDotIndex = ((index % realCount) + realCount) % realCount;
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === activeDotIndex);
    });

    triggerTextAnimation(index, immediateText);
  }

  // --- CHANGE 4: Page load par 1st slide ka text turant dikhe ---
  setPosition(0, false, true);

  // --- CHANGE 5: transitionend mein clone snap par text dobara delay na ho ---
  slidesContainer.addEventListener("transitionend", function (e) {
    if (e.target !== slidesContainer) return;
    if (currentIndex === realCount) {
      currentIndex = 0;
      slidesContainer.style.transition = "none";
      slidesContainer.style.transform = "translateX(0%)";
      dots.forEach((dot, idx) => dot.classList.toggle("active", idx === 0));
      triggerTextAnimation(0, true);
    }
  });

  function nextStep() {
    currentIndex++;
    setPosition(currentIndex, true);
  }

  window.changeSlide = function (step) {
    if (step > 0) {
      if (currentIndex >= realCount) {
        currentIndex = 0;
        slidesContainer.style.transition = "none";
        slidesContainer.style.transform = "translateX(0%)";
        slidesContainer.offsetHeight;
      }
      currentIndex++;
      setPosition(currentIndex, true);
    } else {
      if (currentIndex <= 0) {
        currentIndex = realCount;
        slidesContainer.style.transition = "none";
        slidesContainer.style.transform = `translateX(-${realCount * 100}%)`;
        slidesContainer.offsetHeight;
      }
      currentIndex--;
      setPosition(currentIndex, true);
    }
    resetTimer();
  };

  window.goToSlide = function (index) {
    currentIndex = index;
    setPosition(currentIndex, true);
    resetTimer();
  };

  let autoTimer = setInterval(nextStep, 4000);

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextStep, 4000);
  }
});







// ================= CART DRAWER & ADD TO CART =================
const cartBtn = document.querySelector('.icon-btn[title="Cart"]');
const cartBadge = document.querySelector('.icon-btn[title="Cart"] .badge');
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsList = document.getElementById("cartItemsList");
const cartTotalPrice = document.getElementById("cartTotalPrice");

let cartItems = [];
try { cartItems = JSON.parse(localStorage.getItem("bb_cart") || "[]"); } catch (_) { cartItems = []; }

function renderCart() {
  localStorage.setItem("bb_cart", JSON.stringify(cartItems));
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) cartBadge.textContent = totalQty;

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
    cartTotalPrice.textContent = "₹0.00";
    return;
  }

  let totalAmount = 0;
  cartItemsList.innerHTML = cartItems
    .map((item, idx) => {
      totalAmount += item.price * item.qty;
      return `
        <div class="cart-item-row">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <span>₹${item.price.toFixed(2)} × ${item.qty}</span>
          </div>
          <button type="button" class="remove-cart-item" data-index="${idx}" title="Remove">&times;</button>
        </div>
      `;
    })
    .join("");

  cartTotalPrice.textContent = `₹${totalAmount.toFixed(2)}`;

  document.querySelectorAll(".remove-cart-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.dataset.index, 10);
      cartItems.splice(idx, 1);
      renderCart();
    });
  });
}

function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("open");
}

if (cartBtn) cartBtn.addEventListener("click", openCart);
if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

document.querySelectorAll(".add-cart-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = btn.closest(".product-card");
    const name = card.querySelector("h3").textContent.trim();
    const priceText = card.querySelector(".product-price").textContent.replace(/[₹,]/g, "").trim();
    const price = parseFloat(priceText) || 0;
    const img = card.querySelector("img").getAttribute("src");

    const existing = cartItems.find((item) => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cartItems.push({ name, price, img, qty: 1 });
    }

    renderCart();

    const originalText = btn.textContent;
    btn.textContent = "ADDED ✓";
    btn.style.backgroundColor = "#22c55e";
    btn.style.color = "#ffffff";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = "";
      btn.style.color = "";
    }, 1000);
  });
});

// ================= LIVE SUGGESTION + POPUP CLICK + SEARCH BUTTON HIGHLIGHT =================
const searchBtn = document.querySelector('.icon-btn[title="Search"]');
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchSubmitBtn = document.getElementById("searchSubmitBtn");
const searchCloseBtn = document.getElementById("searchCloseBtn");
const searchResultsPopup = document.getElementById("searchResultsPopup");
const notAvailableScreen = document.getElementById("notAvailableScreen");
const productCards = document.querySelectorAll(".product-card");

const SEARCH_ALIASES = {
  mithai: ["sweet", "sweets", "kaju katli", "gulab jamun", "jalebi", "gajar ka halwa", "mishti doi"],
  sweet: ["sweets", "mithai", "kaju katli", "gulab jamun", "jalebi", "gajar ka halwa", "mishti doi"],
  sweets: ["sweet", "mithai", "kaju katli", "gulab jamun", "jalebi", "gajar ka halwa", "mishti doi"],
  cake: ["cakes", "slice", "black forest", "blueberry", "butterscotch", "truffle", "tier", "mango", "strawberry", "vanilla"],
  cakes: ["cake", "slice", "black forest", "blueberry", "butterscotch", "truffle", "tier", "mango", "strawberry", "vanilla"],
  pastry: ["slice", "cake", "black forest", "mango", "strawberry", "vanilla", "chocolate"],
  puff: ["puffs", "veg puff", "panjabi puff", "punjabi puff", "pasta puff", "maggi puff", "sev sing puff", "roll"],
  puffs: ["puff", "veg puff", "panjabi puff", "punjabi puff", "pasta puff", "maggi puff", "sev sing puff", "roll"],
  roll: ["rolls", "cinnamon swirl roll", "puff"],
  rolls: ["roll", "cinnamon swirl roll", "puff"],
  chocolate: ["chocolates", "choklet", "choclate", "silk", "dairy milk", "kitkat", "snickers", "5star", "nussgold", "truffle"],
  chocolates: ["chocolate", "choklet", "choclate", "silk", "dairy milk", "kitkat", "snickers", "5star", "nussgold", "truffle"],
  choklet: ["chocolate", "chocolates", "silk", "dairy milk", "kitkat", "snickers", "5star", "nussgold"],
  gulabjamun: ["gulab jamun", "jamun", "mithai", "sweet"],
  jamun: ["gulab jamun", "mithai", "sweet"],
  kajukatli: ["kaju katli", "kaju", "katli", "mithai", "sweet"],
  kaju: ["kaju katli", "mithai", "sweet"],
  halwa: ["gajar ka halwa", "gajar", "mithai", "sweet"],
  gajar: ["gajar ka halwa", "halwa", "mithai", "sweet"],
  doi: ["mishti doi", "mishthi doi", "dahi", "mithai", "sweet"],
  mishti: ["mishti doi", "mishthi doi", "mithai", "sweet"],
  panjabi: ["panjabi puff", "punjabi puff", "puff"],
  punjabi: ["panjabi puff", "punjabi puff", "puff"],
  maggi: ["maggi puff", "noodles", "puff"],
  noodles: ["maggi puff", "puff"],
  stobery: ["strawberry cake slice", "strawberry", "cake", "slice"],
  strawberry: ["strawberry cake slice", "cake", "slice"],
  tuffule: ["chocolate truffle cake", "truffle", "chocolate", "cake"],
  truffle: ["chocolate truffle cake", "tuffule", "chocolate", "cake"],
  cinnamon: ["cinnamon swirl roll", "roll", "swirl"],
  swirl: ["cinnamon swirl roll", "roll", "cinnamon"],
  burger: ["healthy burger", "burgur", "healthy food"],
  burgur: ["healthy burger", "burger", "healthy food"],
  pasta: ["healthy pasta", "healthy food"],
  pizza: ["healthy pizza", "healthy food"],
  sandwich: ["healthy sandwich", "healthy food"],
  dish: ["healthy dish", "healthy food"],
  pulses: ["boiled pulses", "sprouts", "healthy food"],
  boiled: ["boiled pulses", "healthy food"],
  dryfood: ["dry food", "dry fruits", "nuts", "healthy food"],
  dry: ["dry food", "dry fruits", "healthy food"],
  gym: ["special for gym", "healthy food"]
};

let highlightTimers = [];

function clearAllHighlights() {
  highlightTimers.forEach((timerId) => clearTimeout(timerId));
  highlightTimers = [];
  productCards.forEach((card) => {
    card.classList.remove("product-found-highlight");
  });
}

function highlightCards(cardsToHighlight, scrollToFirst = true) {
  clearAllHighlights();
  if (!cardsToHighlight || cardsToHighlight.length === 0) return;

  if (scrollToFirst) {
    cardsToHighlight[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }

  cardsToHighlight.forEach((card) => {
    card.classList.remove("product-found-highlight");
    void card.offsetWidth;
    card.classList.add("product-found-highlight");

    const tId = setTimeout(() => {
      card.classList.remove("product-found-highlight");
    }, 2500);
    highlightTimers.push(tId);
  });
}

function normalizeText(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactText(str) {
  return normalizeText(str).replace(/\s+/g, "");
}

function similarityScore(a, b) {
  a = compactText(a);
  b = compactText(b);
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (b.includes(a) || a.includes(b)) return 0.85;

  const bigramsA = new Set();
  for (let i = 0; i < a.length - 1; i++) bigramsA.add(a.slice(i, i + 2));

  let overlap = 0;
  for (let i = 0; i < b.length - 1; i++) {
    if (bigramsA.has(b.slice(i, i + 2))) overlap++;
  }
  const denom = Math.max(a.length - 1, b.length - 1, 1);
  return overlap / denom;
}

function closeSearchOverlay() {
  searchOverlay.classList.remove("active");
  searchResultsPopup.classList.remove("show");
  searchResultsPopup.innerHTML = "";
  searchInput.value = "";
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    searchInput.focus();
  });
}

if (searchCloseBtn) {
  searchCloseBtn.addEventListener("click", closeSearchOverlay);
}

function findMatchingProducts(rawQuery) {
  const normQ = normalizeText(rawQuery);
  const compQ = compactText(rawQuery);
  if (!normQ) return [];

  const terms = new Set([normQ, compQ]);
  normQ.split(" ").forEach((word) => {
    if (!word) return;
    terms.add(word);
    const cWord = compactText(word);
    if (cWord) terms.add(cWord);

    [word, cWord].forEach((key) => {
      if (SEARCH_ALIASES[key]) {
        SEARCH_ALIASES[key].forEach((alias) => {
          terms.add(normalizeText(alias));
          terms.add(compactText(alias));
        });
      }
    });
  });

  const scoredMatches = [];

  productCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.trim();
    const normTitle = normalizeText(title);
    const compTitle = compactText(title);

    const groupEl = card.closest(".category-group");
    const categoryTitle = groupEl ? groupEl.querySelector(".category-group-title")?.textContent.trim() || "" : "";
    const normCat = normalizeText(categoryTitle);
    const compCat = compactText(categoryTitle);

    let bestScore = 0;

    terms.forEach((term) => {
      if (!term) return;
      const cTerm = compactText(term);

      if (normTitle.includes(term) || compTitle.includes(cTerm)) {
        bestScore = Math.max(bestScore, 0.95);
      } else if (normCat.includes(term) || compCat.includes(cTerm)) {
        bestScore = Math.max(bestScore, 0.8);
      } else {
        normTitle.split(" ").forEach((w) => {
          bestScore = Math.max(bestScore, similarityScore(term, w));
        });
        bestScore = Math.max(bestScore, similarityScore(term, compTitle));
      }
    });

    const minThreshold = compQ.length <= 2 ? 0.65 : 0.42;

    if (bestScore >= minThreshold) {
      scoredMatches.push({
        score: bestScore,
        card: card,
        title: title,
        category: categoryTitle,
        price: card.querySelector(".product-price").textContent.trim(),
        img: card.querySelector("img").getAttribute("src"),
      });
    }
  });

  scoredMatches.sort((a, b) => b.score - a.score);
  return scoredMatches;
}

function renderLiveSuggestions() {
  const query = searchInput.value.trim();
  if (!query) {
    searchResultsPopup.classList.remove("show");
    searchResultsPopup.innerHTML = "";
    return;
  }

  const matches = findMatchingProducts(query);

  if (matches.length === 0) {
    searchResultsPopup.innerHTML = `<div class="search-popup-empty">NOT MATCH YOUR PRODUCT</div>`;
    searchResultsPopup.classList.add("show");
    return;
  }

  searchResultsPopup.innerHTML = matches
    .map(
      (item, idx) => `
      <div class="search-popup-item" data-match-index="${idx}">
        <img src="${item.img}" alt="${item.title}">
        <div class="search-popup-info">
          <h4>${item.title}</h4>
          <span>${item.price}${item.category ? ` • ${item.category}` : ""}</span>
        </div>
      </div>
    `
    )
    .join("");

  searchResultsPopup.classList.add("show");

  // Popup ki kisi bhi cheez par click karne par SIRF usi ek product par highlight aayega
  searchResultsPopup.querySelectorAll(".search-popup-item").forEach((popupEl) => {
    popupEl.addEventListener("click", function () {
      const matchObj = matches[parseInt(this.dataset.matchIndex, 10)];
      const targetCard = matchObj.card;

      closeSearchOverlay();
      highlightCards([targetCard], true);
    });
  });
}

// Typing karte hi turant suggestion dikhega
if (searchInput) {
  searchInput.addEventListener("input", renderLiveSuggestions);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchButtonClick();
    }
  });
}

// SEARCH button / Enter dabane par search ki cheez ya milti-julti products highlight hongi
function handleSearchButtonClick() {
  const query = searchInput.value.trim();
  if (!query) return;

  const matches = findMatchingProducts(query);

  if (matches.length > 0) {
    const topScore = matches[0].score;
    // Agar exact/strong match hai toh strong matches, warna milti-julti matches highlight honge
    const relevantMatches =
      topScore >= 0.8
        ? matches.filter((m) => m.score >= 0.75)
        : matches;

    const cardsToHighlight = relevantMatches.map((m) => m.card);

    closeSearchOverlay();
    highlightCards(cardsToHighlight, true);
  } else {
    closeSearchOverlay();
    notAvailableScreen.classList.add("show");

    setTimeout(() => {
      notAvailableScreen.classList.remove("show");
    }, 2000);
  }
}

if (searchSubmitBtn) {
  searchSubmitBtn.addEventListener("click", handleSearchButtonClick);
}




















// ================= NAVBAR LINKS, INTERACTIVE MAP, PROFILE & WISHLIST =================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("open");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("open");
}

document.querySelectorAll(".bb-close-btn, [data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.close;
    if (targetId) closeModal(targetId);
  });
});

document.querySelectorAll(".bb-modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backdrop.classList.remove("open");
  });
});

// SIRF .location-box par click karne par hi Location Modal khulega (Account/Search par nahi)
const locationTrigger = document.querySelector(".location-box");
const locationSearchInput = document.getElementById("locationSearchInput");
const locationSuggestions = document.getElementById("locationSuggestions");
const useCurrentLocBtn = document.getElementById("useCurrentLocBtn");
const confirmLocationBtn = document.getElementById("confirmLocationBtn");

let bbMap = null;
let bbMarker = null;

async function getPlaceNameFromCoords(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    const addr = data.address || {};
    const area =
      addr.suburb ||
      addr.neighbourhood ||
      addr.road ||
      addr.village ||
      addr.town ||
      addr.city ||
      addr.state_district;
    const city = addr.city || addr.town || addr.state_district || "";

    if (area && city && area !== city) return `${area}, ${city}`;
    if (area) return area;
    if (data.display_name) return data.display_name.split(",").slice(0, 2).join(", ");
  } catch (err) {
    console.error("Reverse geocode error:", err);
  }
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}

function initInteractiveMap(lat = 23.0225, lon = 72.5714) {
  const mapDiv = document.getElementById("bbInteractiveMap");
  if (!mapDiv || typeof L === "undefined") return;

  if (!bbMap) {
    bbMap = L.map("bbInteractiveMap").setView([lat, lon], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(bbMap);

    bbMarker = L.marker([lat, lon], { draggable: true }).addTo(bbMap);

    // Pin ko mouse se drag karke chhodne par area ka naam update hoga
    bbMarker.on("dragend", async () => {
      const pos = bbMarker.getLatLng();
      if (locationSearchInput) locationSearchInput.value = "Finding location...";
      const place = await getPlaceNameFromCoords(pos.lat, pos.lng);
      if (locationSearchInput) locationSearchInput.value = place;
    });

    // Map par kahin bhi click karne par pin wahan jayegi aur area naam aayega
    bbMap.on("click", async (e) => {
      const { lat: clickLat, lng: clickLon } = e.latlng;
      bbMarker.setLatLng([clickLat, clickLon]);
      if (locationSearchInput) locationSearchInput.value = "Finding location...";
      const place = await getPlaceNameFromCoords(clickLat, clickLon);
      if (locationSearchInput) locationSearchInput.value = place;
    });
  } else {
    bbMap.setView([lat, lon], 15);
    bbMarker.setLatLng([lat, lon]);
  }

  setTimeout(() => {
    bbMap.invalidateSize();
  }, 150);
}

if (locationTrigger) {
  locationTrigger.style.cursor = "pointer";
  locationTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal("locationModal");
    initInteractiveMap();
  });
}

// Location input mein type karte hi live suggestions aayenge
let locSearchTimer = null;
if (locationSearchInput && locationSuggestions) {
  locationSearchInput.addEventListener("input", () => {
    const q = locationSearchInput.value.trim();
    clearTimeout(locSearchTimer);

    if (q.length < 2) {
      locationSuggestions.classList.remove("show");
      locationSuggestions.innerHTML = "";
      return;
    }

    locSearchTimer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=in&q=${encodeURIComponent(q)}`
        );
        const places = await res.json();

        if (!places || places.length === 0) {
          locationSuggestions.innerHTML = `<div class="bb-loc-sug-item">Koi area nahi mila</div>`;
          locationSuggestions.classList.add("show");
          return;
        }

        locationSuggestions.innerHTML = places
          .map((p) => {
            const shortLabel = p.display_name.split(",").slice(0, 3).join(", ");
            return `<div class="bb-loc-sug-item" data-lat="${p.lat}" data-lon="${p.lon}" data-label="${shortLabel}">${shortLabel}</div>`;
          })
          .join("");

        locationSuggestions.classList.add("show");

        locationSuggestions.querySelectorAll(".bb-loc-sug-item[data-lat]").forEach((item) => {
          item.addEventListener("click", () => {
            const lat = parseFloat(item.dataset.lat);
            const lon = parseFloat(item.dataset.lon);
            const label = item.dataset.label;

            locationSearchInput.value = label;
            locationSuggestions.classList.remove("show");
            initInteractiveMap(lat, lon);
          });
        });
      } catch (err) {
        console.error("Location suggestion error:", err);
      }
    }, 350);
  });
}

// Use Current Location button
if (useCurrentLocBtn && navigator.geolocation) {
  useCurrentLocBtn.addEventListener("click", () => {
    const origText = useCurrentLocBtn.textContent;
    useCurrentLocBtn.textContent = "⏳ Finding area name...";
    useCurrentLocBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        initInteractiveMap(latitude, longitude);
        const placeName = await getPlaceNameFromCoords(latitude, longitude);
        if (locationSearchInput) locationSearchInput.value = placeName;
        if (locationSuggestions) locationSuggestions.classList.remove("show");

        useCurrentLocBtn.textContent = origText;
        useCurrentLocBtn.disabled = false;
      },
      () => {
        useCurrentLocBtn.textContent = origText;
        useCurrentLocBtn.disabled = false;
        alert("Location permission allow karein ya upar area ka naam search karein.");
      }
    );
  });
}

// Confirm Location button -> Navbar mein exact area name set hoga
if (confirmLocationBtn) {
  confirmLocationBtn.addEventListener("click", () => {
    const val = locationSearchInput?.value.trim();
    if (val && locationTrigger) {
      const strongEl = locationTrigger.querySelector("strong");
      if (strongEl) strongEl.textContent = val;
    }
    if (locationSuggestions) locationSuggestions.classList.remove("show");
    closeModal("locationModal");
  });
}

// Account icon aur Wishlist icon (Sirf apne button par kaam karenge)
const accountBtn = document.querySelector('.icon-btn[title="Account"]');
const wishlistNavBtn = document.querySelector('.icon-btn[title="Wishlist"]');

if (accountBtn) {
  accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal("accountModal");
  });
}

if (wishlistNavBtn) {
  wishlistNavBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal("wishlistModal");
  });
}










// ================= SHOP NOW, WISHLIST, PHONE OK & LAPTOP LIVE SYNC =================
let _w = [];
try { _w = JSON.parse(localStorage.getItem("bb_wishlist") || "[]"); } catch (_) {}
const savedWishlist = _w;
const wishlistBadge = document.getElementById("wishlistBadge");

let activeShopItem = { title: "", price: "", img: "" };
let checkoutMode = "single"; // "single" = Shop Now, "cart" = cart checkout
let lastSavedOrderId = "";
let currentOrderId = "";
let currentOrderChannel = "";

const shopNowModal = document.getElementById("shopNowModal");
const shopNowForm = document.getElementById("shopNowForm");
const shopNowItemSummary = document.getElementById("shopNowItemSummary");
const onlineQrBox = document.getElementById("onlineQrBox");
const randomQrImg = document.getElementById("randomQrImg");
const qrCodeLabel = document.getElementById("qrCodeLabel");
const phoneOkPageLink = document.getElementById("phoneOkPageLink");
const shopNowSubmitBtn = document.getElementById("shopNowSubmitBtn");
const orderSuccessScreen = document.getElementById("orderSuccessScreen");

const orderBroadcastChannel =
  typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel("brothers_bakers_order_sync")
    : null;









function saveOrder(payType) {
  const id = payType === "online" ? currentOrderId : "BB" + Math.floor(100000 + Math.random() * 900000);
  if (payType === "online") {
    if (!id || id === lastSavedOrderId) return; // duplicate signal rokne ke liye
    lastSavedOrderId = id;
  }

  const items =
    checkoutMode === "cart"
      ? cartItems.map((i) => ({ name: i.name, price: i.price, qty: i.qty }))
      : [{ name: activeShopItem.title, price: activeShopItem.price, qty: 1 }];

  const order = {
    id,
    time: new Date().toISOString(),
    name: document.getElementById("custName")?.value.trim(),
    mobile: document.getElementById("custMobile")?.value.trim(),
    address: document.getElementById("custAddress")?.value.trim(),
    pincode: document.getElementById("custPincode")?.value.trim(),
    payType,
    items,
  };

  let orders = [];
  try { orders = JSON.parse(localStorage.getItem("bb_orders") || "[]"); } catch (_) {}
  orders.push(order);
  localStorage.setItem("bb_orders", JSON.stringify(orders));

  if (checkoutMode === "cart") {
    cartItems.length = 0;
    renderCart();
  }
}    







function triggerOrderSubmittedScreen() {
  saveOrder(getSelectedPaymentType());
  if (typeof closeModal === "function") {
    closeModal("shopNowModal");
  } else if (shopNowModal) {
    shopNowModal.classList.remove("open");
  }

  if (!orderSuccessScreen) return;
  orderSuccessScreen.classList.remove("show");
  void orderSuccessScreen.offsetWidth;
  orderSuccessScreen.classList.add("show");

  // Thodi der (3.5 sec) baad laptop screen wapas normal ho jayegi
  setTimeout(() => {
    orderSuccessScreen.classList.remove("show");
  }, 3500);
}

// Laptop par phone se aane wale "OK" signal ko sunna
function listenForPhoneOkSignal(channelId) {
  if (!channelId) return;

  if (orderBroadcastChannel) {
    orderBroadcastChannel.onmessage = (ev) => {
      if (ev.data && ev.data.channel === channelId && ev.data.status === "OK") {
        triggerOrderSubmittedScreen();
      }
    };
  }

  // Phone-to-Laptop cross-device signal via ntfy.sh SSE
  try {
    const es = new EventSource(`https://ntfy.sh/${encodeURIComponent(channelId)}/sse`);
    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.message === "OK") {
          es.close();
          triggerOrderSubmittedScreen();
        }
      } catch (_) {}
    };
  } catch (err) {
    console.error("Signal listener error:", err);
  }
}

// Agar phone mein QR scan karke ?order_ok=... khula hai, toh website ke bajay SIRF "OK" button aayega
(function handlePhoneOkMode() {
  const params = new URLSearchParams(window.location.search);
  const okOrder = params.get("order_ok");
  const chId = params.get("ch") || "";
  if (!okOrder) return;

  document.documentElement.innerHTML = `
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0b0f0c;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 20px;
          text-align: center;
        }
        #onlyOkBtn {
          padding: 20px 68px;
          font-size: 28px;
          font-weight: 900;
          color: #07140a;
          background: #22ff66;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(34, 255, 102, 0.55);
        }
        #onlyOkBtn:active { transform: scale(0.97); }
        .phone-submitted-msg {
          color: #22ff66;
          font-size: clamp(28px, 8vw, 48px);
          font-weight: 900;
          letter-spacing: 2px;
          text-shadow: 0 0 22px rgba(34, 255, 102, 0.7);
        }
      </style>
    </head>
    <body>
      <button id="onlyOkBtn" type="button">OK</button>
    </body>
  `;

  document.getElementById("onlyOkBtn").addEventListener("click", async () => {
    // 1. Phone screen par turant ORDER SUBMITTED dikhana
    document.body.innerHTML = `<div class="phone-submitted-msg">ORDER SUBMITTED</div>`;

    // 2. Laptop ko signal bhejna taaki wahan YOUR ORDER SUBMITTED aaye
    if (orderBroadcastChannel && chId) {
      orderBroadcastChannel.postMessage({ channel: chId, status: "OK", order: okOrder });
    }
    if (chId) {
      try {
        await fetch(`https://ntfy.sh/${encodeURIComponent(chId)}`, {
          method: "POST",
          body: "OK",
        });
      } catch (_) {}
    }

    // 3. Thodi der (1.5 sec) baad phone ki screen pure black + browser close/blank
    setTimeout(() => {
      document.documentElement.innerHTML = `<body style="margin:0;background:#000000;min-height:100vh;"></body>`;
      try {
        window.close();
      } catch (_) {}
    }, 1500);
  });

  throw new Error("PHONE_OK_ONLY_MODE");
})();

function syncWishButtons() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const title = card.querySelector("h3")?.textContent.trim();
    const btn = card.querySelector(".wishlist-btn");
    if (!btn) return;
    const saved = savedWishlist.some((i) => i.title === title);
    btn.classList.toggle("active", saved);
    btn.textContent = saved ? "♥" : "♡";
  });
}

function renderWishlistModal() {
  const statusEl = document.getElementById("wishlistStatusText");
  if (wishlistBadge) wishlistBadge.textContent = savedWishlist.length;
  localStorage.setItem("bb_wishlist", JSON.stringify(savedWishlist));
  if (!statusEl) return;

  if (savedWishlist.length === 0) {
    statusEl.textContent = "Abhi koi item wishlist mein save nahi hai.";
    return;
  }

  statusEl.innerHTML = savedWishlist
    .map(
      (item, i) => `
      <div class="bb-wish-row">
        <div class="bb-wish-left">
          <img src="${item.img}" alt="${item.title}">
          <div><strong>${item.title}</strong><br><span style="color:#ffb554;">${item.price}</span></div>
        </div>
        <div class="bb-wish-actions">
          <button type="button" class="bb-wish-go-btn" data-wish-action="cart" data-i="${i}">ADD CART</button>
          <button type="button" class="bb-wish-shop-btn" data-wish-action="remove" data-i="${i}">REMOVE</button>
        </div>
      </div>`
    )
    .join("");
}

// Wishlist ke andar ke buttons ka kaam
document.getElementById("wishlistStatusText")?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-wish-action]");
  if (!btn) return;
  const i = parseInt(btn.dataset.i, 10);
  const item = savedWishlist[i];
  if (!item) return;

  if (btn.dataset.wishAction === "cart") {
    const price = parseFloat(item.price.replace(/[₹,]/g, "")) || 0;
    const existing = cartItems.find((c) => c.name === item.title);
    if (existing) existing.qty++;
    else cartItems.push({ name: item.title, price, img: item.img, qty: 1 });
    renderCart();
    btn.textContent = "ADDED ✓";
  } else {
    savedWishlist.splice(i, 1);
    syncWishButtons();
    renderWishlistModal();
  }
});

function getSelectedPaymentType() {
  const checked = document.querySelector('input[name="payType"]:checked');
  return checked ? checked.value : "cash";
}

// Laptop ka local IP apne aap detect karna (WebRTC se)
function detectLocalIP() {
  return new Promise((resolve) => {
    try {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");
      pc.createOffer().then((o) => pc.setLocalDescription(o));

      const timer = setTimeout(() => { pc.close(); resolve(""); }, 1500);

      pc.onicecandidate = (e) => {
        if (!e || !e.candidate) return;
        const m = e.candidate.candidate.match(/(\d{1,3}(?:\.\d{1,3}){3})/);
        if (m && !m[1].startsWith("0.") && m[1] !== "127.0.0.1") {
          clearTimeout(timer);
          pc.close();
          resolve(m[1]);
        }
      };
    } catch (_) {
      resolve("");
    }
  });
}


let LAPTOP_IP = localStorage.getItem("bb_laptop_ip") || "";
async function generateRandomQrForOrder() {
  currentOrderId = "BB" + Math.floor(100000 + Math.random() * 900000);
  const randomNonce = Math.random().toString(36).substring(2, 10).toUpperCase();
  currentOrderChannel = `bb_ok_${currentOrderId}_${randomNonce}`.toLowerCase();

  const port = window.location.port ? `:${window.location.port}` : "";
  const pathname = window.location.pathname;

  let baseUrl = window.location.href.split("?")[0];
  const isLocal =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";

  if (isLocal) {
    if (!LAPTOP_IP) {
      LAPTOP_IP = await detectLocalIP();
      if (LAPTOP_IP) localStorage.setItem("bb_laptop_ip", LAPTOP_IP);
    }

    if (LAPTOP_IP) {
      baseUrl = `http://${LAPTOP_IP}${port}${pathname}`;
    } else {
      // Detect nahi hua: QR ke andar ek hint dikhao, popup nahi
      if (qrCodeLabel) {
        qrCodeLabel.textContent = "IP detect nahi hua. Neeche IP likho.";
      }
      showManualIpInput();
      return;
    }
  }

  const okUrl = `${baseUrl}?order_ok=${encodeURIComponent(currentOrderId)}&ch=${encodeURIComponent(currentOrderChannel)}`;

  if (randomQrImg) {
    randomQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(okUrl)}`;
  }
  if (qrCodeLabel) {
    qrCodeLabel.textContent = `Order ID: ${currentOrderId} • Ref: ${randomNonce}`;
  }
  if (phoneOkPageLink) {
    phoneOkPageLink.href = okUrl;
  }

  listenForPhoneOkSignal(currentOrderChannel);
}

// Fallback: popup ki jagah QR box ke andar hi input dikhana
function showManualIpInput() {
  if (document.getElementById("manualIpWrap")) return;

  const wrap = document.createElement("div");
  wrap.id = "manualIpWrap";
  wrap.style.cssText = "display:flex;gap:6px;width:100%;margin-top:6px;";
  wrap.innerHTML = `
    <input type="text" id="manualIpInput" class="bb-input" placeholder="192.168.1.5" style="margin:0;flex:1;">
    <button type="button" id="manualIpSave" class="bb-btn-primary" style="width:auto;padding:8px 14px;">SET</button>
  `;
  onlineQrBox.appendChild(wrap);

  document.getElementById("manualIpSave").addEventListener("click", () => {
    const v = document.getElementById("manualIpInput").value.trim();
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(v)) {
      qrCodeLabel.textContent = "Galat IP. Example: 192.168.1.5";
      return;
    }
    LAPTOP_IP = v;
    localStorage.setItem("bb_laptop_ip", v);
    wrap.remove();
    generateRandomQrForOrder();
  });
}

document.querySelectorAll('input[name="payType"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const isOnline = getSelectedPaymentType() === "online";
    if (onlineQrBox) {
      onlineQrBox.classList.toggle("show", isOnline);
    }
    if (shopNowSubmitBtn) {
      shopNowSubmitBtn.style.display = isOnline ? "none" : "block";
    }
    if (isOnline) {
      generateRandomQrForOrder();
    }
  });
});

if (shopNowForm) {
  shopNowForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (getSelectedPaymentType() === "cash") {
      triggerOrderSubmittedScreen();
      shopNowForm.reset();
      if (onlineQrBox) onlineQrBox.classList.remove("show");
      if (shopNowSubmitBtn) shopNowSubmitBtn.style.display = "block";
    }
  });
}

document.addEventListener("click", (e) => {
  const wishBtn = e.target.closest(".wishlist-btn");
  if (wishBtn) {
    const card = wishBtn.closest(".product-card");
    const title = card?.querySelector("h3")?.textContent.trim() || "Item";
    const price = card?.querySelector(".product-price")?.textContent.trim() || "";
    const img = card?.querySelector("img")?.getAttribute("src") || "";

    const idx = savedWishlist.findIndex((item) => item.title === title);
    if (idx > -1) {
      savedWishlist.splice(idx, 1);
      wishBtn.classList.remove("active");
      wishBtn.textContent = "♡";
    } else {
      savedWishlist.push({ title, price, img });
      wishBtn.classList.add("active");
      wishBtn.textContent = "♥";
    }
    renderWishlistModal();
    return;
  }

  const shopBtn = e.target.closest(".shop-now-btn");
  if (shopBtn) {
    checkoutMode = "single";
    const card = shopBtn.closest(".product-card");
    const title = card?.querySelector("h3")?.textContent.trim() || "Item";
    const price = card?.querySelector(".product-price")?.textContent.trim() || "";
    const img = card?.querySelector("img")?.getAttribute("src") || "";

    activeShopItem = { title, price, img };
    if (shopNowItemSummary) {
      shopNowItemSummary.textContent = `${title} — ${price}`;
    }

    if (shopNowForm) shopNowForm.reset();
    if (onlineQrBox) onlineQrBox.classList.remove("show");
    if (shopNowSubmitBtn) shopNowSubmitBtn.style.display = "block";

    if (typeof openModal === "function") {
      openModal("shopNowModal");
    } else if (shopNowModal) {
      shopNowModal.classList.add("open");
    }
  }
});




const checkoutBtnEl = document.querySelector(".checkout-btn");
if (checkoutBtnEl) {
  checkoutBtnEl.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Cart khali hai!");
      return;
    }
    const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    const qty = cartItems.reduce((s, i) => s + i.qty, 0);

    checkoutMode = "cart";
    activeShopItem = { title: "Cart Order", price: `₹${total.toFixed(2)}`, img: "" };
    shopNowItemSummary.textContent = `${qty} items — ₹${total.toFixed(2)}`;

    shopNowForm.reset();
    onlineQrBox.classList.remove("show");
    shopNowSubmitBtn.style.display = "block";

    closeCart();
    openModal("shopNowModal");
  });
}

renderCart();
renderWishlistModal();
syncWishButtons();