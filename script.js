const root = document.documentElement;

const themes = [
  {
    nav1: '#111111',
    nav2: 'gray',
    text1: 'white',
    text2: 'black',
    price1: 'rgb(244, 244, 244)',
    border1: '#ffffff',
    border2: '#111111',
    hover1: '#292929',
    hover2: '#c2c2c2',
    hover3: '#535353',
    icon1: 'white',
    range1: '#DBDBDB',
    range2: '#888888',
    itemBackground: '#222222',
    itemBox: '#181818',
    themeIcon: 'sun-icon.png'
  },
  {
    nav1: '#f5f5f5',
    nav2: '#d0d0d0',
    text1: '#111111',
    text2: '#dddddd',
    price1: 'rgb(12, 12, 12)',
    border1: '#111111',
    border2: '#ffffff',
    hover1: '#e0e0e0',
    hover2: '#3e3e3e',
    hover3: '#a5a5a5',
    icon1: '#111111',
    range1: '#333333',
    range2: '#555555',
    itemBackground: '#E8E8E8',
    itemBox: '#B5B5B5',
    themeIcon: 'moon-icon.png'
  }
];

let i = 0;

const themeBtn = document.getElementById('change-theme');
const themeIcon = document.querySelector('.change-theme-icon');

themeBtn.onclick = () => {
  i = (i + 1) % themes.length;

  root.style.setProperty('--nav1', themes[i].nav1);
  root.style.setProperty('--nav2', themes[i].nav2);
  root.style.setProperty('--text1', themes[i].text1);
  root.style.setProperty('--text2', themes[i].text2);
  root.style.setProperty('--price1', themes[i].price1);
  root.style.setProperty('--border1', themes[i].border1);
  root.style.setProperty('--border2', themes[i].border2);
  root.style.setProperty('--hover1', themes[i].hover1);
  root.style.setProperty('--hover2', themes[i].hover2);
  root.style.setProperty('--hover3', themes[i].hover3);
  root.style.setProperty('--icon1', themes[i].icon1);
  root.style.setProperty('--range1', themes[i].range1);
  root.style.setProperty('--range2', themes[i].range2);
  root.style.setProperty('--itemBackground', themes[i].itemBackground);
  root.style.setProperty('--itemBox', themes[i].itemBox);

  document.body.classList.toggle('light-icons', i === 1);

  themeIcon.src = themes[i].themeIcon;
};

// price-range 

const minRange = document.getElementById("minRange");
const maxRange = document.getElementById("maxRange");
const minInput = document.getElementById("minInput");
const maxInput = document.getElementById("maxInput");
const track = document.querySelector(".slider-track");

const MIN_GAP = 50;
const MAX_PRICE = 5000;

function updateTrack() {
  const minPercent = (minRange.value / MAX_PRICE) * 100;
  const maxPercent = (maxRange.value / MAX_PRICE) * 100;

  track.style.background = `
    linear-gradient(
      to right,
      var(--range1) ${minPercent}%,
      var(--range2) ${minPercent}%,
      var(--range2) ${maxPercent}%,
      var(--range1) ${maxPercent}%
    )
  `;
}

function syncFromRange(e) {
  let min = +minRange.value;
  let max = +maxRange.value;

  if (max - min < MIN_GAP) {
    if (e.target === minRange) {
      minRange.value = max - MIN_GAP;
    } else {
      maxRange.value = min + MIN_GAP;
    }
  }

  minInput.value = minRange.value;
  maxInput.value = maxRange.value;
  updateTrack();
}

function syncFromInput() {
  let min = +minInput.value;
  let max = +maxInput.value;

  if (max - min < MIN_GAP) max = min + MIN_GAP;

  min = Math.max(0, min);
  max = Math.min(MAX_PRICE, max);

  minRange.value = min;
  maxRange.value = max;

  updateTrack();
}

[minRange, maxRange].forEach(r =>
  r.addEventListener("input", syncFromRange)
);

[minInput, maxInput].forEach(i =>
  i.addEventListener("input", syncFromInput)
);

updateTrack();

const priceFilterProducts = document.querySelectorAll(".product-card");

function runPriceFilterNow() {
  const minValueNow = +minRange.value;
  const maxValueNow = +maxRange.value;

  priceFilterProducts.forEach(card => {
    const cardPrice = +card.dataset.price;

    if (cardPrice >= minValueNow && cardPrice <= maxValueNow) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

function attachPriceFilterListeners() {
  minRange.addEventListener("input", runPriceFilterNow);
  maxRange.addEventListener("input", runPriceFilterNow);
  minInput.addEventListener("input", runPriceFilterNow);
  maxInput.addEventListener("input", runPriceFilterNow);
}

attachPriceFilterListeners();
runPriceFilterNow();


// product-card

document.addEventListener("DOMContentLoaded", function initializeVeryLargeProductPreviewSystemForMainShopPage() {

  const allShopProductCardsForClickInteractionSystem =
    document.querySelectorAll(".product-card");

  const globalFullSizeProductPreviewContainerElement =
    document.querySelector(".products-open");

  const globalFullSizeImageContainerElement =
    globalFullSizeProductPreviewContainerElement.querySelector(".img-container");

  const globalFullSizeNameAndPriceContainerElement =
    globalFullSizeProductPreviewContainerElement.querySelector(".name-price-container");

  const globalFullSizeFavoriteAndBasketButtonsContainerElement =
    globalFullSizeProductPreviewContainerElement.querySelector(".fav-basket-container");

  const globalFullSizeCloseButtonElement =
    globalFullSizeProductPreviewContainerElement.querySelector(".cancel-product");


  function openFullSizeProductPreviewWithClonedDataFromSelectedCard(selectedProductCardElement) {

    globalFullSizeImageContainerElement.innerHTML = "";
    globalFullSizeNameAndPriceContainerElement.innerHTML = "";
    globalFullSizeFavoriteAndBasketButtonsContainerElement.innerHTML = "";

    const selectedProductImageSourceUrl =
      selectedProductCardElement.querySelector(".product-img").src;

    const selectedProductNameTextContent =
      selectedProductCardElement.querySelector(".product-name").textContent;

    const selectedProductPriceTextContent =
      selectedProductCardElement.querySelector(".product-price").textContent;

    const selectedProductFavoriteButtonElement =
      selectedProductCardElement.querySelector(".favorite-btn");

    const selectedProductBuyButtonElement =
      selectedProductCardElement.querySelector(".buy-btn");


    const dynamicallyCreatedFullSizeImageElement =
      document.createElement("img");

    dynamicallyCreatedFullSizeImageElement.src = selectedProductImageSourceUrl;
    dynamicallyCreatedFullSizeImageElement.style.width = "100%";
    dynamicallyCreatedFullSizeImageElement.style.height = "100%";
    dynamicallyCreatedFullSizeImageElement.style.objectFit = "contain";

    globalFullSizeImageContainerElement.appendChild(
      dynamicallyCreatedFullSizeImageElement
    );


    const dynamicallyCreatedFullSizeProductTitleElement =
      document.createElement("h2");

    dynamicallyCreatedFullSizeProductTitleElement.textContent =
      selectedProductNameTextContent;

    const dynamicallyCreatedFullSizeProductPriceElement =
      document.createElement("h3");

    dynamicallyCreatedFullSizeProductPriceElement.textContent =
      selectedProductPriceTextContent;

    globalFullSizeNameAndPriceContainerElement.appendChild(
      dynamicallyCreatedFullSizeProductTitleElement
    );

    globalFullSizeNameAndPriceContainerElement.appendChild(
      dynamicallyCreatedFullSizeProductPriceElement
    );


    const clonedFavoriteButtonForFullSizePreview =
      selectedProductFavoriteButtonElement ? selectedProductFavoriteButtonElement.cloneNode(true) : null;

    const clonedBuyButtonForFullSizePreview =
      selectedProductBuyButtonElement ? selectedProductBuyButtonElement.cloneNode(true) : null;


    if (clonedFavoriteButtonForFullSizePreview) {

  function syncFavoriteState() {
    if (selectedProductFavoriteButtonElement.classList.contains("active")) {
      clonedFavoriteButtonForFullSizePreview.classList.add("active");
    } else {
      clonedFavoriteButtonForFullSizePreview.classList.remove("active");
    }
  }

  syncFavoriteState();

  clonedFavoriteButtonForFullSizePreview.addEventListener("click", function (event) {
    event.stopPropagation();

    if (selectedProductFavoriteButtonElement) {
      selectedProductFavoriteButtonElement.click();
      syncFavoriteState();
    }
  });

  globalFullSizeFavoriteAndBasketButtonsContainerElement.appendChild(
    clonedFavoriteButtonForFullSizePreview
  );
}


    if (clonedBuyButtonForFullSizePreview) {
      clonedBuyButtonForFullSizePreview.addEventListener("click", function (event) {
        event.stopPropagation();
        if (selectedProductBuyButtonElement) {
          selectedProductBuyButtonElement.click();
        }
      });
      globalFullSizeFavoriteAndBasketButtonsContainerElement.appendChild(
        clonedBuyButtonForFullSizePreview
      );
    }


    globalFullSizeProductPreviewContainerElement.classList.add("active");
  }


  allShopProductCardsForClickInteractionSystem.forEach(function attachClickHandlerToEachIndividualProductCard(currentProductCardElement) {

    currentProductCardElement.addEventListener("click", function handleClickOnProductCardButIgnoreInnerButtons(clickEventObject) {

      if (clickEventObject.target.closest(".card-btn")) return;

      openFullSizeProductPreviewWithClonedDataFromSelectedCard(currentProductCardElement);
    });

  });


  globalFullSizeCloseButtonElement.addEventListener("click", function handleClickOnFullSizeProductPreviewCloseButtonAndHideIt() {
    globalFullSizeProductPreviewContainerElement.classList.remove("active");
  });

});




// alerts

const alertAdd = document.getElementById("alert-fav-add");
const alertRemove = document.getElementById("alert-fav-remove");

let hideTimeout;

function showFavAlert(type) {
  alertAdd.classList.remove("active");
  alertRemove.classList.remove("active");
  clearTimeout(hideTimeout);

  if (type === "add") {
    alertAdd.classList.add("active");
  } else {
    alertRemove.classList.add("active");
  }

  hideTimeout = setTimeout(() => {
    alertAdd.classList.remove("active");
    alertRemove.classList.remove("active");
  }, 2500);
}


const basketAlertAdd = document.getElementById("alert-basket-add");
const basketAlertRemove = document.getElementById("alert-basket-remove");
let hideTimeoutBasketAlert;

function showBasketAlert(type) {
  basketAlertAdd.classList.remove("active");
  basketAlertRemove.classList.remove("active");
  clearTimeout(hideTimeoutBasketAlert);

  if (type === "add") basketAlertAdd.classList.add("active");
  else basketAlertRemove.classList.add("active");

  hideTimeoutBasketAlert = setTimeout(() => {
    basketAlertAdd.classList.remove("active");
    basketAlertRemove.classList.remove("active");
  }, 2500);
}

// pop-up favorite

const favPopActive = document.getElementById("favorite-list-hover");

let hideTimeout2;

function showPanel() {
  clearTimeout(hideTimeout2);
  favPopActive.classList.add("active");
}

function hidePanel() {
  clearTimeout(hideTimeout2);
  hideTimeout2 = setTimeout(() => {
    favPopActive.classList.remove("active");
  }, 100);
}

document.querySelectorAll('.favorite-list').forEach(btn => {
  btn.addEventListener('mouseenter', showPanel);
  btn.addEventListener('mouseleave', hidePanel);
});

favPopActive.addEventListener('mouseenter', showPanel);
favPopActive.addEventListener('mouseleave', hidePanel);

// favorite list

document.addEventListener('DOMContentLoaded', () => {
  const favoriteContainer = document.getElementById('favorite-list-hover');
  const favoriteCards = document.querySelectorAll('.favorite-btn');
  const favorites = [];
  const MAX_FAVORITES = 24;

  favoriteCards.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const itemId = btn.dataset.id;

      const existingIndex = favorites.findIndex(fav => fav.id === itemId);

      if (existingIndex === -1) {
        if (favorites.length >= MAX_FAVORITES) {
          alert('Favorite is full! Maximum is 24 items!');
          return;
        }

        const imgSrc = card.querySelector('.product-img').src;
        const name = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.product-price').textContent;

        favorites.push({ id: itemId, imgSrc, name, price });
        btn.classList.add('active');

        showFavAlert("add");
      } else {
        favorites.splice(existingIndex, 1);
        btn.classList.remove('active');

        showFavAlert("remove");
      }

      renderFavorites();
    });
  });

  function renderFavorites() {
    favoriteContainer.innerHTML = '';

    favorites.forEach(item => {
      const div = document.createElement('div');
      div.className = 'favorite-list-item';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.gap = '4px';
      div.style.padding = '5px';

      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.style.width = '7vh';
      img.style.height = '7vh';
      img.style.objectFit = 'cover';

      const textDiv = document.createElement('div');
      textDiv.style.display = 'flex';
      textDiv.style.flexDirection = 'column';
      textDiv.style.fontSize = '16px';
      textDiv.style.color = 'var(--text1)';
      textDiv.innerHTML = `<span>${item.name}</span><span>${item.price}</span>`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✕';
      removeBtn.style.marginLeft = 'auto';
      removeBtn.style.background = 'transparent';
      removeBtn.style.border = 'none';
      removeBtn.style.cursor = 'pointer';
      removeBtn.style.fontSize = '20px';
      removeBtn.style.color = 'var(--text1)';

      removeBtn.addEventListener('click', () => {
        const index = favorites.findIndex(f => f.id === item.id);
        if (index !== -1) {
          favorites.splice(index, 1);
        }

        const originalBtn = document.querySelector(`.favorite-btn[data-id="${item.id}"]`);
        if (originalBtn) {
          originalBtn.classList.remove('active');
        }

        showFavAlert("remove");

        renderFavorites();
      });

      div.appendChild(img);
      div.appendChild(textDiv);
      div.appendChild(removeBtn);

      favoriteContainer.appendChild(div);
    });
  }
});



// basket list

const basketPopActive = document.getElementById("basket-list-hover");
let hideTimeoutBasket;

function showBasket() {
  clearTimeout(hideTimeoutBasket);
  basketPopActive.classList.add("active");
}

function hideBasket() {
  clearTimeout(hideTimeoutBasket);
  hideTimeoutBasket = setTimeout(() => {
    basketPopActive.classList.remove("active");
  }, 100);
}

document.getElementById('buy').addEventListener('mouseenter', showBasket);
document.getElementById('buy').addEventListener('mouseleave', hideBasket);

basketPopActive.addEventListener('mouseenter', showBasket);
basketPopActive.addEventListener('mouseleave', hideBasket);

document.addEventListener('DOMContentLoaded', () => {
  const basketContainer = document.getElementById('basket-list-hover');
  const buyButtons = document.querySelectorAll('.buy-btn');
  const basket = [];
  const MAX_BASKET = 24;

  buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const itemId = btn.dataset.id;

      const existingIndex = basket.findIndex(item => item.id === itemId);
      if (existingIndex === -1) {
        if (basket.length >= MAX_BASKET) {
          alert('Basket is full! Maximum is 24 items!');
          return;
        }

        const imgSrc = card.querySelector('.product-img').src;
        const name = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.product-price').textContent;

        basket.push({ id: itemId, imgSrc, name, price });
        btn.classList.add('active');
        showBasketAlert("add");
      } else {
        basket.splice(existingIndex, 1);
        btn.classList.remove('active');
        showBasketAlert("remove");
      }

      renderBasket();
    });
  });

  function renderBasket() {
    basketContainer.innerHTML = '';

    basket.forEach(item => {
      const div = document.createElement('div');
      div.className = 'basket-list-item';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.gap = '4px';
      div.style.padding = '5px';

      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.style.width = '7vh';
      img.style.height = '7vh';
      img.style.objectFit = 'cover';

      const textDiv = document.createElement('div');
      textDiv.style.display = 'flex';
      textDiv.style.flexDirection = 'column';
      textDiv.style.fontSize = '16px';
      textDiv.style.color = 'var(--text1)';
      textDiv.innerHTML = `<span>${item.name}</span><span>${item.price}</span>`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✕';
      removeBtn.style.marginLeft = 'auto';
      removeBtn.style.background = 'transparent';
      removeBtn.style.border = 'none';
      removeBtn.style.cursor = 'pointer';
      removeBtn.style.fontSize = '20px';
      removeBtn.style.color = 'var(--text1)';

      removeBtn.addEventListener('click', () => {
        const index = basket.findIndex(b => b.id === item.id);
        if (index !== -1) basket.splice(index, 1);

        const originalBtn = document.querySelector(`.buy-btn[data-id="${item.id}"]`);
        if (originalBtn) originalBtn.classList.remove('active');

        showBasketAlert("remove");
        renderBasket();
      });

      div.appendChild(img);
      div.appendChild(textDiv);
      div.appendChild(removeBtn);

      basketContainer.appendChild(div);
    });
  }
});


// search

const searchInput = document.getElementById('search_input');
const searchForm = document.getElementById('searchForm') || document.querySelector('.center');
const productCards = document.querySelectorAll('.product-card');

const suggestions = document.createElement('div');
suggestions.id = 'suggestions';
document.querySelector('.center').appendChild(suggestions);

function runSearch(value) {
  const query = value.toLowerCase().trim();

  productCards.forEach(card => {
    const name = card.querySelector('.product-name').innerText.toLowerCase();
    card.style.display = name.includes(query) ? 'block' : 'none';
  });

  suggestions.style.display = 'none';
}

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase().trim();
  suggestions.innerHTML = '';

  if (!value) {
    suggestions.style.display = 'none';
    return;
  }

  productCards.forEach(card => {
    const name = card.querySelector('.product-name').innerText;
    const price = card.querySelector('.product-price').innerText;
    const imgSrc = card.querySelector('.product-img').src;

    if (name.toLowerCase().includes(value)) {
      const item = document.createElement('div');
      item.className = 'suggestion-item';

      item.innerHTML = `
        <img src="${imgSrc}">
        <div>
          <div class="suggestion-name">${name}</div>
          <div class="suggestion-price">${price}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        searchInput.value = name;
        suggestions.style.display = 'none';
        runSearch(name);
      });

      suggestions.appendChild(item);
    }
  });

  suggestions.style.display = suggestions.children.length ? 'block' : 'none';
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  runSearch(searchInput.value);
});

// catalog pop-up

const catalogBtn = document.querySelector('.catalog');
  catalogBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    catalogPanel.classList.toggle('active');
  });
const catalogPanel = document.querySelector('.catalog-list');

let hideTimeout4;

function showPanel4() {
  clearTimeout(hideTimeout4);
  catalogPanel.classList.add('active');
}

function hidePanel4() {
  hideTimeout4 = setTimeout(() => {
    catalogPanel.classList.remove('active');
  }, 100);
}

catalogBtn.addEventListener('mouseenter', showPanel4);
catalogBtn.addEventListener('mouseleave', hidePanel4);

catalogPanel.addEventListener('mouseenter', showPanel4);
catalogPanel.addEventListener('mouseleave', hidePanel4);

// catalog-category

const catalog = document.getElementById('catalog-list');

const leftElements = document.querySelectorAll('[id$="-left"]');

let activeCenter = null;
let menuTimer;

leftElements.forEach(leftEl => {
  const centerId = leftEl.id.replace('-left', '-center');
  const centerEl = document.getElementById(centerId);
  if (!centerEl) return;

  leftEl.addEventListener('mouseenter', () => {

    clearTimeout(menuTimer);

    if (activeCenter && activeCenter !== centerEl) {
      activeCenter.classList.remove('active');
    }

    centerEl.classList.add('active');
    activeCenter = centerEl;
  });
});


const centerItems = document.querySelectorAll('.catalog-item-center a');

let activeRight = null;

centerItems.forEach(item => {

  const category = item.dataset.category;
  if (!category) return;

  const centerBlock = item.closest('.catalog-item-center');
  const parentCategory = centerBlock.id.replace('-center', '');

  const rightContainer = document.getElementById(parentCategory + '-right');
  if (!rightContainer) return;

  const rightBlock = rightContainer.querySelector('#' + category);
  if (!rightBlock) return;

  item.addEventListener('mouseenter', () => {

    clearTimeout(menuTimer);

    if (activeRight && activeRight !== rightBlock) {
      activeRight.classList.remove('active');
    }

    rightBlock.classList.add('active');
    activeRight = rightBlock;
  });

});


catalog.addEventListener('mouseleave', () => {

  menuTimer = setTimeout(() => {

    document.querySelectorAll('.catalog-item-center.active')
      .forEach(el => el.classList.remove('active'));

    document.querySelectorAll('.catalog-item-right.active')
      .forEach(el => el.classList.remove('active'));

    activeCenter = null;
    activeRight = null;

  }, 200);

});

catalog.addEventListener('mouseenter', () => {
  clearTimeout(menuTimer);
});

const catalogItemNodes = document.querySelectorAll('.catalog-item');
const productCardNodes = document.querySelectorAll('.product-card');

function executeProductNameVisibilityIsolation(selectedProductKey) {
  productCardNodes.forEach(productCardElement => {
    if (productCardElement.dataset.product === selectedProductKey) {
      productCardElement.style.display = "block";
    } else {
      productCardElement.style.display = "none";
    }
  });
}

function initializeProductNameFilteringEngine() {
  catalogItemNodes.forEach(catalogNode => {
    catalogNode.addEventListener('click', function () {
      const selectedProductKey = this.dataset.product;
      executeProductNameVisibilityIsolation(selectedProductKey);
    });
  });
}

initializeProductNameFilteringEngine();


// account

const registerDiv = document.getElementById("register");
const loginDiv = document.getElementById("log-in");

const accBtn = document.getElementById("acc");
accBtn.addEventListener('click', () => {
  registerDiv.classList.add('active');
  loginDiv.classList.remove('active');
});

const cancelRegister = document.getElementById("cancelRegister");
const cancelLogin = document.getElementById("cancelLogin");

cancelRegister.addEventListener('click', () => {
  registerDiv.classList.remove('active');
});

cancelLogin.addEventListener('click', () => {
  loginDiv.classList.remove('active');
});

const logInLink = document.getElementById("log-in-a");
logInLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerDiv.classList.remove('active');
  loginDiv.classList.add('active');
});

const createLink = document.getElementById("create");
createLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginDiv.classList.remove('active');
  registerDiv.classList.add('active');
});

// checkboxes

const newCheckbox = document.getElementById("new");
const usedCheckbox = document.getElementById("used");
const fastCheckbox = document.getElementById("fastDelivery");
const selfCheckbox = document.getElementById("selfPickup");

const products = document.querySelectorAll(".product-card");

function filterProducts() {

  const showNew = newCheckbox.checked;
  const showUsed = usedCheckbox.checked;
  const fastChecked = fastCheckbox.checked;
  const selfChecked = selfCheckbox.checked;

  products.forEach(product => {

    // CONDITION
    const name = product.querySelector(".product-name").textContent;
    const isUsed = name.includes("B/U");

    let conditionMatch = false;

    if ((!showNew && !showUsed) || (showNew && showUsed)) {
      conditionMatch = true;
    } else if (showUsed && isUsed) {
      conditionMatch = true;
    } else if (showNew && !isUsed) {
      conditionMatch = true;
    }

    // DELIVERY

    const isFast = product.classList.contains("fast");
    const isSelf = product.classList.contains("self");

    let deliveryMatch = false;

    if (!fastChecked && !selfChecked) {
      deliveryMatch = true;
    } else if (fastChecked && selfChecked) {
      deliveryMatch = isFast || isSelf;
    } else if (fastChecked) {
      deliveryMatch = isFast;
    } else if (selfChecked) {
      deliveryMatch = isSelf;
    }

    if (conditionMatch && deliveryMatch) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }

  });
}

// listeners

newCheckbox.addEventListener("change", filterProducts);
usedCheckbox.addEventListener("change", filterProducts);
fastCheckbox.addEventListener("change", filterProducts);
selfCheckbox.addEventListener("change", filterProducts);

// menu (phone)

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const rightPanel = document.querySelector('.right');

  if (menuBtn && rightPanel) {
    menuBtn.addEventListener('click', () => {
      rightPanel.classList.toggle('active');
    });
  }
});