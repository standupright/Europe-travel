const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');

// nav open and closed
nav.classList.remove('nav--nojs');

navToggle.addEventListener('click', function () {
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
    nav.classList.add('nav--opened');
  } else {
    nav.classList.add('nav--closed');
    nav.classList.remove('nav--opened');
  }
});

// switch tabs
const tabs = document.querySelectorAll('.tabs-header__tab');
const slides = document.querySelectorAll('.country-description__country-item');

const addSliderClickHandler = function (button, slide) {
  button.addEventListener("click", function () {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("tabs-header__tab--active");
      slides[i].classList.remove("country-description__country-item--active");
    }
    slide.classList.add("country-description__country-item--active");
    button.classList.add("tabs-header__tab--active");
  });
};

for (let i = 0; i < tabs.length; i++) {
  addSliderClickHandler(tabs[i], slides[i]);
}

// Переключение табов по нажатию на кнопку "смотреть подробнее"
const placesButtons = document.querySelectorAll('.places-item__button');

const onPlacesButtonsClick = function (buttonPlace,buttonTab, slide) {
  buttonPlace.addEventListener("click", function () {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("tabs-header__tab--active");
      slides[i].classList.remove("country-description__country-item--active");
    }
    slide.classList.add("country-description__country-item--active");
    buttonTab.classList.add("tabs-header__tab--active");
  });
};

for (let i = 0; i < tabs.length; i++) {
  onPlacesButtonsClick(placesButtons[i],tabs[i], slides[i]);
}


// modal popup
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form')
const popupClose = document.querySelector('.popup__close');
const buttonsBuyTour = document.querySelectorAll('.button-buy-tour');
const popupTel = document.querySelector('.popup__tel');
const popupEmail = document.querySelector('.popup__email');

// modal success Alert
const successAlert = document.querySelector('.success-alert');
const successAlertClose = document.querySelector('.success-alert__close');
const popupButton = document.querySelector('.popup__button');

// Валидация формы
popupTel.addEventListener('invalid', () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
});

popupEmail.addEventListener('invalid', () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
});

let isStorageSupport = true;
let storageTel = "";
let storageEmail = "";

try {
  storageTel = localStorage.getItem("tel");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

// Основные функции для взаимодействия с popup
const closeModal = () => {
  popup.classList.remove('modal-show');
  overlay.classList.remove('modal-show');
  successAlert.classList.remove('modal-show');
}

const openModal = () => {
  popup.classList.add('modal-show');
  overlay.classList.add('modal-show');
}

const addPopupListeners = () => {
  document.addEventListener("keydown", isEscKeydown);
  popupClose.addEventListener("click", onPopupCloseClick);
  successAlertClose.addEventListener("click", onSuccessAlertCloseClick);
  overlay.addEventListener('click', onOverlayClick);
}

const removePopupListeners = () => {
  document.removeEventListener('keydown', isKeydown);
  overlay.removeEventListener('click', onOverlayClick)
  popupClose.removeEventListener("click", onPopupCloseClick);
  overlay.removeEventListener('click', onOverlayClick);
}

// Функции для обработки событий
const isEscKeydown = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeModal();
    removePopupListeners();
    removeQuestionListeners();
  }
}

const onOverlayClick = () => {
  closeModal();
  removePopupListeners();
  removeQuestionListeners();
}

const onPopupCloseClick = function (evt) {
  evt.preventDefault();
  closeModal();
  removePopupListeners();
}

const onSuccessAlertCloseClick = function (evt) {
  evt.preventDefault();
  closeModal();
  removePopupListeners();
  removeQuestionListeners();
}



const onButtonTourClick = (evt) => {
  evt.preventDefault();
  openModal();
  addPopupListeners();

  if (storageTel) {
    popupTel.value = storageTel;
    popupEmail.focus();
  } else {
    popupTel.focus();
  }

  if (storageEmail) {
    popupEmail.value = storageEmail;
  } else {
    popupTel.focus();
  }
}

for (let i = 0; i < buttonsBuyTour.length; i++) {
  buttonsBuyTour[i].addEventListener("click", onButtonTourClick)
}

// Событие отправки формы Popup
popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  successAlert.classList.add('modal-show');

  if (isStorageSupport) {
    localStorage.setItem("name", popupTel.value);
    localStorage.setItem("email", poupEmail.value);
  }
});

// Форма в блоке question
const questionForm = document.querySelector('.question__form');

const addQustionListeners = () => {
  document.addEventListener("keydown", isEscKeydown);
  successAlertClose.addEventListener("click", onSuccessAlertCloseClick);
  overlay.addEventListener('click', onOverlayClick);
}

const removeQuestionListeners = () => {
  document.removeEventListener("keydown", isEscKeydown);
  successAlertClose.removeEventListener("click", onSuccessAlertCloseClick);
  overlay.removeEventListener('click', onOverlayClick);
}

// Событие отправки формы
questionForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  overlay.classList.add('modal-show');
  successAlert.classList.add('modal-show');
  addQustionListeners();

  if (isStorageSupport) {
    localStorage.setItem("name", popupTel.value);
    localStorage.setItem("email", poupEmail.value);
  }
});

// Плавный скролл
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

// Swiper

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  simulateTouch: false,
  // Default parameters
  slidesPerView: 5,
  centeredSlides: false,
  spaceBetween: 0,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 0,
    }
  },
});
