// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';
import { initSwipers } from './swiper';
import { handleFormValidation } from './modal';
import './accordion';
import './news';
import './tabs';

initSwipers();
handleFormValidation();

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    acc();
  });
});