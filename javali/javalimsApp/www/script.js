
$(document).ready(function () {
    $('#sideBar')
        .mouseenter(function () {
            $("a > span", this).show();
        })
        .mouseleave(function () {
            $("a > span", this).hide();
        });
});