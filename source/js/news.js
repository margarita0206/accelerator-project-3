import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';

const newsSlides = document.querySelectorAll('.news__item');

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
      grid: {
        rows: 1,
        fill: 'row',
      },
      allowTouchMove: false,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,

      grid: {
        rows: 2,
        fill: 'row',
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
    activeIndex = getNewsSlider.activeIndex / 3;
  }

  const lastSlideIndex = Math.ceil(getNewsSlider.slides.length / slidesPerViewCount);
  const paginationBullets = getNewsSlider.pagination.bullets;

  if (activeIndex > 0 && activeIndex <= 2) {
    startPaginationIndex = 0;
    endPaginationIndex = 3;
  } if (activeIndex >= 3) {
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

getNewsSlider.init();
getNewsSlider.on('slideChange', setDynamicPagination);
window.addEventListener('resize', setBigSlide);