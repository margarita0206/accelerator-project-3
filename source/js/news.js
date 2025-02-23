import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';

const newsSlides = document.querySelectorAll('.news__item');
const newsSlider = document.querySelector('.news__swiper');

const swapSlides = () => {
  const tripsSlide = newsSlider.querySelector('.news__item--trips');
  const volunteerSlide = newsSlider.querySelector('.news__item--volunteer');
  const slides = Array.from(newsSlider.querySelectorAll('.news__item'));
  const tripsIndex = slides.indexOf(tripsSlide);
  const volunteerIndex = slides.indexOf(volunteerSlide);

  if (window.innerWidth >= 768 && window.innerWidth < 1440) {
    if (tripsIndex > -1 && volunteerIndex > -1) {
      newsSlider.querySelector('.swiper-wrapper').insertBefore(volunteerSlide, tripsSlide);
    }
  } else {
    if (tripsIndex > volunteerIndex) {
      newsSlider.querySelector('.swiper-wrapper').insertBefore(tripsSlide, volunteerSlide);
    }
  }
};

swapSlides();

window.addEventListener('resize', swapSlides);

const setBigSlide = () => {
  const isValid = () => {
    const desktopWidth = window.matchMedia('(min-width: 1440px)');
    return desktopWidth.matches;
  };
  if (isValid()) {
    for (let i = 0; i < newsSlides.length; i++) {
      if (newsSlides[i].classList.contains('swiper-slide-active')) {
        newsSlides[i].classList.add('news__item--big');
      } else {
        newsSlides[i].classList.remove('news__item--big');
        newsSlides[0].classList.add('news__item--big');
      }
    }
  }
};

const getNewsSlider = new Swiper('.news__swiper', {
  modules: [Navigation, Pagination, Grid],
  grid: {
    rows: 2,
    fill: 'column',
  },
  loop: false,
  updateOnWindowResize: true,
  navigation: {
    nextEl: '.news__swiper-button--next',
    prevEl: '.news__swiper-button--prev',
  },
  pagination: {
    el: '.news__pagination',
    bulletClass: 'news__pagination-button',
    clickable: true,
    bulletActiveClass: 'news__pagination-button--active',
    renderBullet: function (index, className) {
      return `<button class="news__pagination-button news__pagination-button--active ${className}" type="button" aria-label="Перейти к ${index + 1} слайду">${index + 1}</button>`;
    }
  },
  slideClass: 'news__item',
  wrapperClass: 'news__list',
  breakpoints: {
    1440: {
      slidesPerView: 'auto',
      spaceBetween: 32,
      slidesPerGroup: 3,
      grid: false,
      allowTouchMove: false,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,

      grid: {
        rows: 2,
        fill: 'column',
      },
      allowTouchMove: true,
    },
    320: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      allowTouchMove: true,
      grid: {
        rows: 2,
        fill: 'column',
      },
    },
  },
  on: {
    init: function () {
      setBigSlide();
    },
    slideChangeTransitionEnd: function () {
      setBigSlide();
    },
    resize: function () {
      setBigSlide();
    },
  },
});

const setDynamicPagination = () => {
  let slidesPerViewCount;
  let startPaginationIndex;
  let endPaginationIndex;
  let activeIndex;

  if (window.innerWidth < 768) {
    slidesPerViewCount = 2;
    activeIndex = getNewsSlider.activeIndex;
  }

  if (window.innerWidth >= 768 && window.innerWidth < 1440) {
    slidesPerViewCount = 4;
    activeIndex = Math.ceil(getNewsSlider.activeIndex / 2);
  }

  if (window.innerWidth >= 1440) {
    slidesPerViewCount = 3;
    activeIndex = Math.ceil(getNewsSlider.activeIndex / 3);
  }

  const lastSlideIndex = Math.ceil(getNewsSlider.slides.length / slidesPerViewCount);
  const paginationBullets = getNewsSlider.pagination.bullets;

  if (activeIndex >= 3) {
    startPaginationIndex = activeIndex - 2;
    endPaginationIndex = activeIndex + 2;
  } if (activeIndex === lastSlideIndex - 1) {
    startPaginationIndex = lastSlideIndex - 4;
    endPaginationIndex = lastSlideIndex - 1;
  }

  paginationBullets.forEach((bullet, index) => {
    if (index < startPaginationIndex || index > endPaginationIndex) {
      bullet.classList.add('news__pagination-button--hidden');
    } else {
      bullet.classList.remove('news__pagination-button--hidden');
    }
  });
};

getNewsSlider.on('slideChange', setDynamicPagination);
getNewsSlider.on('resize', setDynamicPagination);

getNewsSlider.init();

function debounce(callback, timeoutDelay = 300) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const debouncedResizeNewsSlider = debounce(() => {
  getNewsSlider.init();
}, 2);


window.addEventListener('load', debouncedResizeNewsSlider);
window.addEventListener('resize', debouncedResizeNewsSlider);
window.addEventListener('resize', setDynamicPagination);
