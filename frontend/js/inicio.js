$(document).scroll(function () {
    if ($(window).scrollTop() > 720) {
        $(".fixed-top").css("background", "#eac715");
        $("#nav-item").css("color", "#604292");
    }else{
        $(".fixed-top").css("background", "none");
        $("#nav-item").css("color", "#d9d9e1");
    }
});
