import Swiper from 'swiper/bundle';

const changeStandardActivePaginationClass = (customActiveClass) => {
  const bullets = document.querySelectorAll('.hero-swiper__pagination-bullet');
  const standardActive = document.querySelector('.swiper-pagination-bullet-active');
  bullets.forEach((bullet) => {
    bullet.classList.remove(customActiveClass);
  });
  standardActive?.classList.add(customActiveClass);
};

let heroSwiper = null;

let isInitialized = false;
let previousLeftPosition;
let previousBottomPosition = null;

const updatePaginationPosition = (swiperInstance, update) => {
  const pagination = document.querySelector('.hero-swiper__pagination');
  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  const textContainer = activeSlide.querySelector('.hero-swiper__content-wrapper');

  if (textContainer) {
    // Вертикальное позиционирование
    const textContainerHeight = textContainer.offsetHeight;
    const padding = parseFloat(window.getComputedStyle(activeSlide).paddingBottom);
    const currentBottomPosition = textContainerHeight + padding - 1;

    // Горизонтальное позиционирование
    const textContainerRect = textContainer.getBoundingClientRect();
    const currentLeftPosition = textContainerRect.left;

    if (update === true) {
      if (previousBottomPosition !== currentBottomPosition || previousLeftPosition !== currentLeftPosition) {
        pagination.classList.add('hero-swiper__pagination--fade-out');

        setTimeout(() => {
          pagination.style.cssText = `
            bottom: ${currentBottomPosition}px;
            left: ${currentLeftPosition}px;
          `;
          pagination.classList.remove('hero-swiper__pagination--fade-out');
          previousBottomPosition = currentBottomPosition;
          previousLeftPosition = currentLeftPosition;
        }, 50);
      }
    } else {
      pagination.style.cssText = `
        bottom: ${currentBottomPosition}px;
        left: ${currentLeftPosition}px;
      `;
      previousBottomPosition = currentBottomPosition;
      previousLeftPosition = currentLeftPosition;
    }
  }
};

export const initHeroSwiper = () => {
  if (!heroSwiper) {
    heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      init: true,
      height: 'auto',
      autoplay: false,
      keyboard: {
        enabled: false,
      },
      simulateTouch: false,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      breakpoints: {
        1440: {
          allowTouchMove: false,
        }
      },
      pagination: {
        el: '.hero-swiper__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className} hero-swiper__pagination-bullet hero-swiper__pagination-bullet--${index}"
            aria-label="Перейти к слайду ${index + 1}."
            role="button">
            </span>`;
        },
      },
      on: {
        init: function() {
          changeStandardActivePaginationClass('hero-swiper__pagination-bullet--active');
          updatePaginationPosition(this, false);
          isInitialized = true;
        },
        slideChange: function() {
          changeStandardActivePaginationClass('hero-swiper__pagination-bullet--active');
          if (isInitialized) {
            updatePaginationPosition(this, true);
          }
        }
      }
    });
  } else {
    if (heroSwiper) {
      heroSwiper.update();
    }
  }
};
