$(document).ready(function () {
    //    var hamburger = $('.hamburger');
    //        hamburger.click(function () {
    //            hamburger_cross();
    //        });
    //        function hamburger_cross() {
    //    
    //            if (isClosed == true) {
    //                hamburger.removeClass('is-open');
    //                hamburger.addClass('is-closed');
    //                isClosed = false;
    //            } else {
    //                hamburger.removeClass('is-closed');
    //                hamburger.addClass('is-open');
    //                isClosed = true;
    //            }
    //        }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});