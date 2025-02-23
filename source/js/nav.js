const navMenu = document.querySelector('.navigation-menu');
const navButton = document.querySelector('.nav-button');
const submenuButtons = document.querySelectorAll('.navigation-menu__submenu-button');
const submenuLists = document.querySelectorAll('.navigation-menu__submenu-list');
const overlay = document.querySelector('.page-overlay');
// const submenuLinks = document.querySelectorAll('.navigation-menu__submenu-link');

// Обновляем tabindex для ссылок основного меню
const updateNavMenuItemsTabIndex = () => {
  const navLinks = document.querySelectorAll('.navigation-menu__link');
  navLinks.forEach((link) => {
    // Если меню открыто — делаем ссылки доступными для фокуса, иначе — нет
    if (navMenu.classList.contains('navigation-menu--is-opened')) {
      link.setAttribute('tabindex', '0');
    } else {
      link.setAttribute('tabindex', '-1');
    }
  });
  submenuButtons.forEach((button) => {
    // Если меню открыто — делаем ссылки доступными для фокуса, иначе — нет
    if (navMenu.classList.contains('navigation-menu--is-opened')) {
      button.setAttribute('tabindex', '0');
    } else {
      button.setAttribute('tabindex', '-1');
    }
  });
  // submenuLinks.forEach((link) => {
  //   // Если меню открыто — делаем ссылки доступными для фокуса, иначе — нет
  //   if (navMenu.classList.contains('navigation-menu--is-opened')) {
  //     link.setAttribute('tabindex', '0');
  //   } else {
  //     link.setAttribute('tabindex', '-1');
  //   }
  // });
};

// Обновляем tabindex для ссылок подменю внутри конкретного списка
const updateListLinksTabIndex = () => {
  submenuLists.forEach((list) => {
    const submenuLinks = list.querySelectorAll('.navigation-menu__submenu-link');
    submenuLinks.forEach((link) => {
      if (navMenu.classList.contains('navigation-menu--is-opened') && list.classList.contains('navigation-menu__submenu-list--is-open')) {
        link.setAttribute('tabindex', '0');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  });
};

const handleNavMenuTabIndexUpdates = () => {
  // submenuLists.forEach((list) => updateListLinksTabIndex(list));
  updateListLinksTabIndex();
  updateNavMenuItemsTabIndex();
};

// Обновляем высоту списка подменю с использованием шаблонных литералов
const updateListHeight = (list) => {
  list.style.maxHeight = `${list.scrollHeight}px`;
};

// Обновляем высоту всего меню с учётом дополнительного элемента (например, открытого подменю)
const updateMenuHeight = (element = null) => {
  requestAnimationFrame(() => {
    const additionalHeight = element ? element.scrollHeight : 0;
    navMenu.style.maxHeight = `${navMenu.scrollHeight + 70 + additionalHeight}px`;
  });
};

/**
 * Функция для управления классом overflow-visible.
 *
 * Для основного меню (navMenu):
 *   - Если меню открыто (имеет класс 'navigation-menu--is-opened'),
 *     через 300 мс с него удаляется класс 'navigation-menu--is-overflow-visible'.
 *   - Если меню закрыто, класс 'navigation-menu--is-overflow-visible' снимается мгновенно.
 *
 * Для подменю (subMenu):
 *   - Если подменю открыто (имеет класс 'navigation-menu__submenu-list--is-open'),
 *     через 300 мс добавляется класс 'navigation-menu__submenu-list--is-overflow-visible'.
 *   - Если подменю закрыто, класс 'navigation-menu__submenu-list--is-overflow-visible' снимается мгновенно.
 *
 * Для каждого элемента используется его собственное свойство _overflowTimeout для хранения идентификатора таймаута.
 */
const handleOverflowVisibility = (element) => {
  // Обработка для основного меню (navMenu)
  if (element.classList.contains('navigation-menu')) {
    const overflowVisibleClass = 'navigation-menu--is-overflow-visible';
    if (element.classList.contains('navigation-menu--is-opened')) {
      // Если меню открыто, ждем 300 мс и удаляем класс
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
      }
      element._overflowTimeout = setTimeout(() => {
        element.classList.remove(overflowVisibleClass);
        element._overflowTimeout = null;
      }, 300);
    } else {
      // Если меню закрыто, очищаем таймаут и сразу удаляем класс
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
        element._overflowTimeout = null;
      }
      element.classList.remove(overflowVisibleClass);
    }
  } else if (element.classList.contains('navigation-menu__submenu-list')) {
    const overflowVisibleClass = 'navigation-menu__submenu-list--is-overflow-visible';
    if (element.classList.contains('navigation-menu__submenu-list--is-open')) {
      // Если подменю открыто, ждем 300 мс и добавляем класс (старая логика)
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
      }
      element._overflowTimeout = setTimeout(() => {
        element.classList.add(overflowVisibleClass);
        element._overflowTimeout = null;
      }, 300);
    } else {
      // Если подменю закрыто, очищаем таймаут и сразу удаляем класс
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
        element._overflowTimeout = null;
      }
      element.classList.remove(overflowVisibleClass);
    }
  }
};

// Функция закрытия основного меню
const closeMenu = () => {
  navMenu.classList.remove('navigation-menu--is-opened');
  navMenu.classList.add('navigation-menu--is-closed');
  navMenu.style.maxHeight = 0;
  navButton.classList.remove('nav-button--opened');
  handleOverflowVisibility(navMenu);
  updateNavMenuItemsTabIndex();
  updateListLinksTabIndex();
};

// Функция открытия основного меню
const openMenu = () => {
  // При открытии меню убираем сразу класс overflow-visible,
  // чтобы он не висел после 0.3 секунд.
  navMenu.classList.remove('navigation-menu--is-overflow-visible');
  navMenu.classList.remove('navigation-menu--is-closed');
  navMenu.classList.add('navigation-menu--is-opened');
  navButton.classList.add('nav-button--opened');
  updateMenuHeight();
  handleOverflowVisibility(navMenu);
  updateNavMenuItemsTabIndex();
  updateListLinksTabIndex();
};

// Функция закрытия подменю
const closeSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-open');
  list.classList.add('navigation-menu__submenu-list--is-closed');
  list.style.maxHeight = 0;
  requestAnimationFrame(() => {
    updateMenuHeight();
    handleOverflowVisibility(list);
    updateListLinksTabIndex();
  });
};

// Функция открытия подменю
const openSubmenu = (list) => {
  // Убираем overflow-visible при открытии подменю
  list.classList.remove('navigation-menu__submenu-list--is-overflow-visible');
  list.classList.remove('navigation-menu__submenu-list--is-closed');
  list.classList.add('navigation-menu__submenu-list--is-open');
  updateListHeight(list);
  requestAnimationFrame(() => {
    updateMenuHeight(list);
    handleOverflowVisibility(list);
    updateListLinksTabIndex();
  });
};

// Обработчик клика по кнопке подменю
const handleSubMenuToggle = (evt) => {
  const submenubutton = evt.target;
  const sibling = evt.target.nextElementSibling;
  if (sibling && sibling.classList.contains('navigation-menu__submenu-list')) {
    if (sibling.classList.contains('navigation-menu__submenu-list--is-open')) {
      closeSubmenu(sibling);
      submenubutton.classList.remove('navigation-menu__submenu-button--active');
    } else {
      openSubmenu(sibling);
      submenubutton.classList.add('navigation-menu__submenu-button--active');
    }
  }
};

const setOverlay = () => {
  overlay.classList.add('page-overlay--active');
};

const removeOverlay = () => {
  overlay.classList.remove('page-overlay--active');
};

// Обработчик клика по кнопке навигации
const handleNavButtonClick = () => {
  // toggleNavButton();
  if (navMenu.classList.contains('navigation-menu--is-opened')) {
    closeMenu();
    removeOverlay();
  } else {
    openMenu();
    setOverlay();
  }
};

// Обработчик клика по ссылкам основного меню
const handleNavLinkClick = (evt) => {
  if (evt.target.classList.contains('navigation-menu__link')) {
    document.querySelectorAll('.navigation-menu__link').forEach((link) => {
      link.classList.remove('navigation-menu__link--active');
    });
    evt.target.classList.add('navigation-menu__link--active');
    removeOverlay();
    closeMenu();
  }
};

// Обработчик клика по ссылкам подменю
const handleSubNavLinkClick = (evt) => {
  if (evt.target.classList.contains('navigation-menu__submenu-link')) {
    document.querySelectorAll('.navigation-menu__submenu-link').forEach((link) => {
      link.classList.remove('navigation-menu__submenu-link--active');
    });
    evt.target.classList.add('navigation-menu__submenu-link--active');
    removeOverlay();
    closeMenu();
  }
};

// Экспортируем функцию для установки всех обработчиков управления меню
export const handleNavMenuControls = () => {
  navButton.addEventListener('click', handleNavButtonClick);
  submenuButtons.forEach((button) => button.addEventListener('click', handleSubMenuToggle));
  navMenu.addEventListener('click', handleNavLinkClick);
  navMenu.addEventListener('click', handleSubNavLinkClick);
  overlay.addEventListener('click', closeMenu);
  handleNavMenuTabIndexUpdates();
};
