document.getElementsByClassName("preloader")[0].remove();
const wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 50,
    mobile: 0,
    live: 1
}
);
wow.init();