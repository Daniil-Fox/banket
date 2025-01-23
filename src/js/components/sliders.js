import { Swiper } from "swiper";
import { Navigation, Pagination } from "swiper/modules";

Swiper.use([Navigation, Pagination]);

new Swiper(".service__slider", {
  slidesPerView: 1,

  navigation: {
    prevEl: ".service__btn--prev",
    nextEl: ".service__btn--next",
  },
  pagination: {
    el: ".service__pagination",
    type: "fraction",
  },
});
