// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';
import { initSwipers } from './swiper';
import { handleFormValidationModal } from './modal';
import { handleNavMenuControls } from './nav';
import { handleFormValidation } from './form';
import './accordion';
import './news';

initSwipers();
handleFormValidationModal();
handleNavMenuControls();
handleFormValidation();

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {

  });
});
