const newsWrapper = document.querySelector('.news__wrapper');
const newsButtons = newsWrapper.querySelectorAll('.news__button');

const newsTabs = () => {
  newsButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const prevActiveButton = newsWrapper.querySelector('.news__button--current');

      if (prevActiveButton) {
        prevActiveButton.classList.remove('news__button--current');
      }

      btn.classList.add('news__button--current');
    });
  });
};

newsTabs();
