var popup = (function($) {

    var winW,winH,ratio;
    var scrollTop, scrollBottom, scrollCenter;
    var sectionTopArray = [];
    var sectionElArray = [];
    var titleElArray = [];
    var titleHeight;
    var currentSection;
    var menuHolderEl ;
    var titleHolderEl;

    var addEvent = function(){
        $(window).on('resize',onResize);
        $(window).on('scroll',onScroll);
        onResize();

        $('.tab-list li a').on('click',function(e){
            e.preventDefault();

            var index = $(this).parent().index();

            $('.tab-list li').removeClass('active');
            $('.tab-list li').eq(index).addClass('active');

            var tx = -50 * index;
            $('.content-list').css({'transform' : 'translateX('+ tx +'%)'});
        });
    };

    var onResize = function(e){
        winW = $(window).width();
        winH = $(window).height();

        ratio = winW / 720;
        sectionTopArray = [
            0,
            1557*ratio,
            (1557+1113)*ratio,
            (1557+1113+1184)*ratio
        ];

        titleHeight = Math.floor(159 *ratio);
        menuHolderEl.css('height', titleHeight);

        onScroll();
    };

    var onScroll = function(){
        scrollTop = ($(window).scrollTop()|| $('body').scrollTop());
        scrollBottom = scrollTop + winH;
        scrollCenter = scrollTop + (scrollBottom / 2);

        var i;
        for (i=0;i<4;i++) {
            if ((scrollTop +1)>= sectionTopArray[i] - titleElArray[i].height()) {
                currentSection = i;
            }
        }

        setTitleTop();
    };

    var setTitleTop = function() {
        var i;
        var top;
        var titleTop , titleMargin;
        var currentSection = 0;


        for (i=0;i<4;i++) {
            top = sectionTopArray[i];
            if (( top - scrollTop) < titleHeight) {
                currentSection = i;

            }
        }

        if (currentSection === 0) {
            titleTop = 0;
        } else {
            titleMargin = (sectionTopArray[currentSection] - scrollTop);
            if (titleMargin < 0) titleMargin = 0;
            titleTop = (titleHeight * currentSection * -1) + titleMargin;
        }
        titleHolderEl.css('top', titleTop)
    };

    var _setSection = function($index) {
        $('html, body').animate({scrollTop: sectionTopArray[$index]}, 10);
    };

    /*================================================================================================================*/
    var _init = function(){
        currentSection = 0;
        menuHolderEl = $(' .popup .menu-wrap');
        titleHolderEl = $(' .popup .menu-wrap .title-holder');
    };

    var _load_init = function(){
        sectionElArray = [
            $('.popup .content-holder .section-1'),
            $('.popup .content-holder .section-2'),
            $('.popup .content-holder .section-3'),
            $('.popup .content-holder .section-4')
        ];

        titleElArray = [
            $('.popup .content-holder .section-1 .top-holder'),
            $('.popup .content-holder .section-2 .top-holder'),
            $('.popup .content-holder .section-3 .top-holder'),
            $('.popup .content-holder .section-4 .top-holder')
        ];
        addEvent();
    };
    return{
        init:_init,
        load_init:_load_init,
        setSection:_setSection
    }
})(jQuery);

/*$(window).on('ready',function(){
    popup.init();
});
$(window).on('load',function(){
    popup.load_init();
    popup.setSection(3);
});*/
