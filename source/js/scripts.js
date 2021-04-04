const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');

// nav open and closed
nav.classList.remove('nav--nojs');

navToggle.addEventListener('click', function() {
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

const addSliderClickHandler = function (button,slide) {
    button.addEventListener("click", function(){
        for (var i=0; i < tabs.length; i++){
          tabs[i].classList.remove("tabs-header__tab--active");
          slides[i].classList.remove("country-description__country-item--active");
        }
        slide.classList.add("country-description__country-item--active");
        button.classList.add("tabs-header__tab--active");
    });
};

for (var i = 0; i < tabs.length; i++){
   addSliderClickHandler(tabs[i],slides[i]);
}
