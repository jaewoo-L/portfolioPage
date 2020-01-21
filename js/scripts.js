(function($) {
    var menuHeader = $('header'),
        menuHeight = menuHeader.outerHeight(),
        menuClone = menuHeader.contents().clone(),
        win = $(window),
        head = $('<header class="page-header-clone"></header>');
        head.append(menuClone);
        head.appendTo('body');
    var $menu = head.find('#menu li'),
        $contents = $('.contents > div');

    win.scroll($.throttle(1000/15, function(){
        if($(this).scrollTop() >= menuHeight) {
            head.addClass('visible');
        } else {
            head.removeClass('visible');
        }
        $contents.each(function(){
            var idx = $(this).index();
            if($(this).offset().top <= win.scrollTop() + 1) {
                $menu.eq(idx).addClass('on').siblings().removeClass('on');
            } else {
                $menu.eq(idx).removeClass('on');
            }
        });
    }));    
    win.scroll();
    // Animate to section when nav is clicked
    $('header a').click(function(e) {
        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;
        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        //Go to header
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });



})(jQuery);