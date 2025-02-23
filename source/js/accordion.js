const accordeonPanelHeading = document.querySelectorAll('.faq__item');
const isEnterKey = (evt) => evt.key === 'Enter';

const accordionCLicked = () => {
  for (let i = 0; i < accordeonPanelHeading.length; i++) {
    accordeonPanelHeading[i].addEventListener('click', () => {
      accordeonPanelHeading[i].classList.toggle('faq__item--active');

      if (accordeonPanelHeading[i].classList.contains('faq__item--disabled')) {
        accordeonPanelHeading[i].classList.remove('faq__item--active');
      }
    });

    accordeonPanelHeading[i].addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        accordeonPanelHeading[i].classList.toggle('faq__item--active');
      }
    });
  }
};

accordionCLicked();
