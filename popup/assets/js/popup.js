var popup = (function($) {
    var winW,winH,ratio;
    var scrollTop, scrollBottom, scrollCenter;
    var sectionTopArray = [];
    var sectionElArray = [];
    var titleElArray = [];
    var titleHeight;
    var currentSection = 0;
    var menuHolderEl = $('.menu-wrap');
    var titleHolderEl = $(' .popup .menu-wrap .title-holder');

    var addEvent = function(){
        $(window).on('resize',onResize);
        $(window).on('scroll',onScroll);
        onResize();
    };

    var onResize = function(e){
        winW = $(window).width();
        winH = $(window).height();
        ratio = winW / 720;

        sectionTopArray = [
            sectionElArray[0].offset().top,
            sectionElArray[1].offset().top,
            sectionElArray[2].offset().top,
            sectionElArray[3].offset().top
        ];

        titleHeight = Math.floor(300 *ratio);
        menuHolderEl.css('height', titleHeight);
        onScroll();
    };

    var onScroll = function(){
        scrollTop = ($(window).scrollTop()|| $('body').scrollTop());
        scrollBottom = scrollTop + winH;
        scrollCenter = scrollTop + (scrollBottom / 2);

        var i;
        for (i=0;i<4;i++) {
            // console.log(i , scrollTop  , sectionTopArray[i])
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

        // console.log(currentSection);
        console.log('curSection ' + currentSection + ' : ' + (sectionTopArray[currentSection] - scrollTop));


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
        $('html, body').animate({scrollTop: sectionTopArray[$index]}, 100);
        // console.log(sectionTopArray[$index]);
    };

    /*================================================================================================================*/
    var _init = function(){

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

$(window).on('ready',function(){
    popup.init();
});
$(window).on('load',function(){
    popup.load_init();
    popup.setSection(3);
});
