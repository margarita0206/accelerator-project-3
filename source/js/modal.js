import { handleSelectOptionsVisibility } from './modal-select';
import { formatPhoneNumber, validateInput, validatePhone, validateName } from './utils';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.page-overlay');
const modalOpenButton = document.querySelector('.about__link-button');
const modalCloseButton = document.querySelector('.modal__close-button');
const form = modal.querySelector('.modal__form');
const formInputs = form.querySelectorAll('.modal__input');
const nameInput = form.querySelector('.modal__input--name');
const phoneInput = form.querySelector('.modal__input--phone');
const fakeSelect = form.querySelector('.modal__select');
const select = form.querySelector('.select-input');
const selectOptions = form.querySelectorAll('.select__option');
const checkboxInput = form.querySelector('.modal__input--check');

const updateTabindex = (isOpen) => {
  const elements = modal.querySelectorAll('[tabindex]');

  elements.forEach((element) => {
    element.tabIndex = isOpen ? 0 : -1;
  });
};

const clearFormFields = () => {
  window.addEventListener('beforeunload', () => {
    if (form) {
      form.reset();
    }
  });
};

const validateSelect = (value) => !!value;

const openModal = () => {
  modal.classList.add('modal--is-open');
  overlay.classList.add('page-overlay--active');
  updateTabindex(true);
};

const closeModal = () => {
  modal.classList.remove('modal--is-open');
  overlay.classList.remove('page-overlay--active');
  updateTabindex(false);
};

const onFormSubmit = (evt) => {
  let isFormValid = true;
  let firstInvalidInput = null;

  // Сбрасываем ошибки только для основных полей
  formInputs.forEach((input) => {
    input.classList.remove('modal__input--error');
    input.setCustomValidity('');
  });
  fakeSelect.classList.remove('modal__input--error');
  select.setCustomValidity('');

  // Валидация имени
  const isNameValid = validateInput(
    nameInput,
    validateName,
    'Пожалуйста, укажите имя в латинице или кирилице без цифр.',
    'modal__input--error'
  );
  if (!isNameValid) {
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || nameInput;
  }

  // Валидация телефона
  const isPhoneValid = validateInput(
    phoneInput,
    validatePhone,
    'Пожалуйста, введите номер телефона в указанном формате: +7 (000)-000-00-00.',
    'modal__input--error'
  );
  if (!isPhoneValid) {
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || phoneInput;
  }

  // Валидация селекта
  const isSelectValid = validateInput(
    select,
    validateSelect,
    'Пожалуйста, укажите город.',
    'modal__input--error',
    fakeSelect
  );
  if (!isSelectValid) {
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || select;
  }

  // Валидация чекбокса (отдельная логика)
  if (!checkboxInput.checked) {
    checkboxInput.classList.add('modal__input--error');
    checkboxInput.setCustomValidity('Необходимо ваше согласие');
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || checkboxInput;
  } else {
    checkboxInput.setCustomValidity('');
    checkboxInput.classList.remove('modal__input--error');
  }

  if (!isFormValid) {
    evt.preventDefault();
    if (firstInvalidInput) {
      firstInvalidInput.reportValidity();
      if (firstInvalidInput === select) {
        fakeSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  } else {
    form.submit();
  }
};

const handleInputEvent = (evt) => {
  const input = evt.target;

  // Обработка селекта
  if (input === select || input === fakeSelect || input.closest('.select__option')) {
    if (select.value) {
      select.setCustomValidity('');
      fakeSelect.classList.remove('modal__input--error');
    }
    return;
  }

  // Обработка чекбокса (только при его изменении)
  if (input === checkboxInput) {
    input.classList.remove('modal__input--error');
    input.setCustomValidity('');
    return;
  }

  // Общая обработка полей
  if (input.value) {
    input.classList.remove('modal__input--error');
    input.setCustomValidity('');
  }

  if (input === phoneInput) {
    formatPhoneNumber(input);
  }
};

const addInputListeners = (input, events, handler) => {
  events.forEach((event) => input.addEventListener(event, handler));
};

const setupSubmitHandler = () => {
  form.addEventListener('submit', onFormSubmit);
};

const handleInputsChange = () => {
  formInputs.forEach((input) => {
    addInputListeners(input, ['input', 'change', 'focus'], handleInputEvent);
  });

  addInputListeners(select, ['change', 'input'], handleInputEvent);
  addInputListeners(checkboxInput, ['change'], handleInputEvent);

  selectOptions.forEach((option) => {
    addInputListeners(option, ['click', 'focus'], handleInputEvent);
  });
};

const attachFormListeners = () => {
  handleInputsChange();
  clearFormFields();
};

const handleModalVisibility = () => {
  modalOpenButton.addEventListener('click', openModal);
  modalCloseButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
};

export const handleFormValidation = () => {
  updateTabindex(false);
  handleModalVisibility();
  setupSubmitHandler();
  attachFormListeners();
  formatPhoneNumber(phoneInput);
  handleSelectOptionsVisibility();
};