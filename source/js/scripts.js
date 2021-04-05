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
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("tabs-header__tab--active");
      slides[i].classList.remove("country-description__country-item--active");
    }
    slide.classList.add("country-description__country-item--active");
    button.classList.add("tabs-header__tab--active");
  });
};

for (var i = 0; i < tabs.length; i++) {
  addSliderClickHandler(tabs[i], slides[i]);
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
  }
}

const onOverlayClick = () => {
  closeModal();
  removePopupListeners();
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

// Событие отправки формы
popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  successAlert.classList.add('modal-show');

  if (isStorageSupport) {
    localStorage.setItem("name", popupTel.value);
    localStorage.setItem("email", poupEmail.value);
  }
});
