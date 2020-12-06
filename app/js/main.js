window.onload = () => {
    document.body.classList.add("loaded");

    $(".burger").click(() => {
        $(".nav-bar-menu")[0].classList.toggle("active");
    })
}
$(document).ready(function(){
    $(".scroll-btn").click(() => {
        let headerHeight = $("header").height();
        $("html,body").animate({ scrollTop: headerHeight}, { duration: 1000, specialEasing: { height: "easeInOutCubic" } });
    })
})

