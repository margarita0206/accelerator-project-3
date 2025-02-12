const modal = document.querySelector('.modal');
const modalSelect = modal.querySelector('.select-input');
const selectOptions = modal.querySelector('.select__options');
const form = modal.querySelector('.modal__form');
const selectText = modal.querySelector('.select__text');
const fakeSelect = modal.querySelector('.select-element');

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
  updateSelectItemsTabIndex();
};

const closeSelect = () => {
  selectOptions.classList.remove('select__options--is-open');
  fakeSelect.classList.remove('select-element--active');
  updateSelectItemsTabIndex();
};

const setSelectValue = (evt) => {
  const option = evt.target.closest('.select__option');
  if (!option) {
    return;
  }

  const selectOptionItems = modal.querySelectorAll('.select__option');
  selectOptionItems.forEach((item) => {
    item.classList.remove('select__option--active');
  });

  option.classList.add('select__option--active');

  modalSelect.setAttribute('value', option.textContent);
  modalSelect.dispatchEvent(new Event('change', { bubbles: true }));
  selectText.textContent = option.textContent;
  closeSelect();
};

const handleFocus = (evt) => {
  if (!evt.target.classList.contains('select__option') && !evt.target.classList.contains('select-input')) {
    closeSelect();
  }
};

const setupSelectListeners = () => {
  modalSelect.addEventListener('focus', openSelect);

  window.addEventListener('mousedown', (evt) => {
    if (!modal.contains(evt.target)) {
      closeSelect();
    }
  });

  form.addEventListener('click', setSelectValue);
  modal.addEventListener('focus', handleFocus, true);
};

export const handleSelectOptionsVisibility = () => {
  setupSelectListeners();
};