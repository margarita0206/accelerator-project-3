const newsWrapper = document.querySelector('.news__wrapper');
const newsButtons = newsWrapper.querySelectorAll('.news__button');

const newsTabs = () => {
  newsButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Получаем предыдущую активную кнопку
      const prevActiveButton = newsWrapper.querySelector('.news__button--current');
      // Получаем предыдущую активную вкладку
      //const prevActiveItem = newsWrapper.querySelector('.faq__list--active');

      // Проверяем есть или нет предыдущая активная кнопка
      if (prevActiveButton) {
        //Удаляем класс _active у предыдущей кнопки если она есть
        prevActiveButton.classList.remove('news__button--current');
      }

      // Проверяем есть или нет предыдущая активная вкладка
      //if (prevActiveItem) {
      // Удаляем класс _active у предыдущей вкладки если она есть
      // prevActiveItem.classList.remove('faq__list--active');
      // }

      //const nextActiveItemId = `#${btn.getAttribute('data-tab')}`;
      //const nextActiveItem = newsWrapper.querySelector(nextActiveItemId);

      btn.classList.add('news__button--current');
      //nextActiveItem.classList.add('faq__list--active');
    });
  });
};

newsTabs();