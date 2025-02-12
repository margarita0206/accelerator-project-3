export const validateInput = (input, validator, errorMessage, errorClass, additionalElement) => {
  // Удаляем класс ошибки с основного и дополнительного элемента, если он передан
  input.classList.remove(errorClass);
  if (additionalElement) {
    additionalElement.classList.remove(errorClass);
  }

  input.setCustomValidity('');

  // Проверка валидности ввода и навешивание класса ошибки
  if (!validator(input.value)) {
    input.classList.add(errorClass);
    if (additionalElement) {
      additionalElement.classList.add(errorClass);
    }
    input.setCustomValidity(errorMessage);
    input.reportValidity();
    return false;
  }

  return true;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

  return phoneRegex.test(phone);
};

export const validateName = (name) => {
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
  return nameRegex.test(name);
};

export const calculateCursor = (position, oldValue, newValue) => {
  const nonDigitBefore = /[^0-9]/g;

  let count = 0;
  for (let i = 0; i < position; i++) {
    if (!oldValue[i].match(nonDigitBefore)) {
      count++;
    }
  }

  let index = 0;
  while (count > 0 && index < newValue.length) {
    if (!newValue[index].match(nonDigitBefore)) {
      count--;
    }
    index++;
  }

  return index;
};

const moveCursorBetweenGroups = (input, direction) => {
  const cursorPosition = input.selectionStart;

  const groups = [...input.value.matchAll(/\d+/g)].map((match) => ({
    start: match.index,
    end: match.index + match[0].length,
  }));

  if (direction === 'right') {
    for (const group of groups) {
      if (group.start > cursorPosition) {
        input.setSelectionRange(group.start, group.start);
        break;
      }
    }
  } else if (direction === 'left') {
    for (let i = groups.length - 1; i >= 0; i--) {
      if (groups[i].end < cursorPosition) {
        input.setSelectionRange(groups[i].start, groups[i].start);
        break;
      }
    }
  }
};

export const formatPhoneNumber = (phoneInput) => {

  phoneInput.addEventListener('input', (evt) => {
    const input = evt.target;
    const cursorPosition = input.selectionStart;
    const rawValue = input.value;
    const lastInputChar = rawValue[cursorPosition - 1];

    const cleaned = rawValue.replace(/[^\d+]/g, '');

    if (cleaned.length === 1 && cleaned !== '7') {
      input.value = `+7 (${ lastInputChar}`;
      input.setSelectionRange(5, 5);
      return;
    }

    if (cleaned === '7') {
      input.value = `+7 (${ lastInputChar}`;
      input.setSelectionRange(5, 5);
      return;
    }

    if (cleaned.indexOf('+7') !== 0) {
      input.value = '+7 (';
      input.setSelectionRange(4, 4);
      return;
    }

    let formatted = '';
    if (cleaned.length > 2) {
      formatted += `+7 (${cleaned.substring(2, 5)}`;
    }
    if (cleaned.length >= 5) {
      formatted += `) ${cleaned.substring(5, 8)}`;
    }
    if (cleaned.length >= 8) {
      formatted += `-${cleaned.substring(8, 10)}`;
    }
    if (cleaned.length >= 10) {
      formatted += `-${cleaned.substring(10, 12)}`;
    }

    input.value = formatted;

    const newCursorPosition = calculateCursor(cursorPosition, rawValue, input.value);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  });
  phoneInput.addEventListener('keydown', (evt) => {
    if (evt.ctrlKey && (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft')) {
      evt.preventDefault();
      const direction = evt.key === 'ArrowRight' ? 'right' : 'left';
      moveCursorBetweenGroups(evt.target, direction);
    }
  });
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};