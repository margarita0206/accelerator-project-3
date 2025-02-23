import { formatPhoneNumber, validateInput, validatePhone, validateName } from './utils';
import { handleFormSelectOptionsVisibility } from './form-select';

const form = document.querySelector('.form__form-question');
const formInputs = form.querySelectorAll('.form-form__input');
const nameInput = form.querySelector('.form__input--name');
const phoneInput = form.querySelector('.form__input--phone');
const commentInput = form.querySelector('.form__input-text--comment');
const fakeSelect = form.querySelector('.form-form__select');
const select = form.querySelector('.form-form__input--select');
const selectOptions = form.querySelectorAll('.select__option');
const checkboxInput = form.querySelector('.form__control-input');

const clearFormFields = () => {
  window.addEventListener('beforeunload', () => {
    if (form) {
      form.reset();
    }
  });
};

// const validateSelect = (value) => !!value;
const validateSelect = (value) => {
  if (value === '' || value === 'empty') {
    return false;
  }
  return true;
};

const validateFormfield = (value) => !!value;

const onFormSubmit = (evt) => {
  let isFormValid = true;
  let firstInvalidInput = null;

  // Сбрасываем ошибки только для основных полей
  formInputs.forEach((input) => {
    input.classList.remove('form-form__input--error');
    input.setCustomValidity('');
  });
  fakeSelect.classList.remove('form-form__input--error');
  select.setCustomValidity('');

  // Валидация имени
  const isNameValid = validateInput(
    nameInput,
    validateName,
    'Пожалуйста, укажите имя в латинице или кирилице без цифр.',
    'form-form__input--error'
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
    'form-form__input--error'
  );
  if (!isPhoneValid) {
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || phoneInput;
  }

  // Валидация комметария
  const isCommentValid = validateInput(
    commentInput,
    validateFormfield,
    'Пожалуйста, введите сообщение',
    'form-form__input--error'
  );
  if (!isCommentValid) {
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || commentInput;
  }

  // Валидация селекта
  const isSelectValid = validateInput(
    select,
    validateSelect,
    'Пожалуйста, укажите город.',
    'form-form__input--error',
    fakeSelect
  );
  if (!isSelectValid) {
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || select;
  }

  // Валидация чекбокса (отдельная логика)
  if (!checkboxInput.checked) {
    checkboxInput.classList.add('form-form__input--error');
    checkboxInput.setCustomValidity('Необходимо ваше согласие');
    isFormValid = false;
    firstInvalidInput = firstInvalidInput || checkboxInput;
  } else {
    checkboxInput.setCustomValidity('');
    checkboxInput.classList.remove('form-form__input--error');
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
      fakeSelect.classList.remove('form-form__input--error');
      select.classList.remove('form-form__input--error');
    }
    return;
  }

  // Обработка чекбокса (только при его изменении)
  if (input === checkboxInput) {
    input.classList.remove('form-form__input--error');
    input.setCustomValidity('');
    return;
  }

  // Общая обработка полей
  if (input.value) {
    input.classList.remove('form-form__input--error');
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
    addInputListeners(input, ['input', 'change'], handleInputEvent);
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

export const handleFormValidation = () => {
  setupSubmitHandler();
  attachFormListeners();
  formatPhoneNumber(phoneInput);
  handleFormSelectOptionsVisibility();
};
