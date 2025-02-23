const form = document.querySelector('.form__form-question');
const formSelect = form.querySelector('.form-form__input--select');
const selectOptions = form.querySelector('.select__options');
const selectText = form.querySelector('.select__text');
const fakeSelect = form.querySelector('.form-form__select');

const updateSelectItemsTabIndex = () => {
  const selectOptionItems = document.querySelectorAll('.select__option');
  selectOptionItems.forEach((option) => {
    // Если меню открыто — делаем ссылки доступными для фокуса, иначе — нет
    if (selectOptions.classList.contains('select__options--is-open')) {
      option.setAttribute('tabindex', '0');
    } else {
      option.setAttribute('tabindex', '-1');
    }
  });
};

const openSelect = () => {
  selectOptions.classList.add('select__options--is-open');
  fakeSelect.classList.add('select-element--active');
  selectOptions.style.maxHeight = `${selectOptions.scrollHeight}px`;
  updateSelectItemsTabIndex();
};

const closeSelect = () => {
  selectOptions.classList.remove('select__options--is-open');
  fakeSelect.classList.remove('select-element--active');
  selectOptions.style.maxHeight = 0;
  updateSelectItemsTabIndex();
};

const setSelectValue = (evt) => {
  const option = evt.target.closest('.select__option');
  if (!option) {
    return;
  }

  const selectOptionItems = form.querySelectorAll('.select__option');
  selectOptionItems.forEach((item) => {
    item.classList.remove('select__option--active');
  });

  option.classList.add('select__option--active');

  formSelect.setAttribute('value', option.textContent);
  formSelect.dispatchEvent(new Event('change', { bubbles: true }));
  selectText.textContent = option.textContent;
  closeSelect();
};

const handleFocus = (evt) => {
  if (!evt.target.classList.contains('select__option') && !evt.target.classList.contains('select-input')) {
    closeSelect();
  }
};

const setupSelectListeners = () => {
  formSelect.addEventListener('focus', openSelect);

  window.addEventListener('mousedown', (evt) => {
    if (!fakeSelect.contains(evt.target) && !formSelect.contains(evt.target)) {
      closeSelect();
    }
  });

  form.addEventListener('click', setSelectValue);
  form.addEventListener('focus', handleFocus, true);
};

export const handleFormSelectOptionsVisibility = () => {
  setupSelectListeners();
};
