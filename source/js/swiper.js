var swiper = new Swiper(".Swiper3", {
	scrollbar: {
		el: ".swiper-scrollbar",
		hide: true,
	},

	direction: 'horizontal',
  init: false,
  loop: false,
  simulateTouch: false,
  keyboard: {
    enabled: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      navigation: false,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button--reviews-next',
        prevEl: '.swiper-button--reviews-prev',
      },
    },
    1440: {
      slidesPerView: 'auto',
      spaceBetween: 120,
      navigation: {
        nextEl: '.swiper-button--reviews-next',
        prevEl: '.swiper-button--reviews-prev',
      },
    }
  },
});