var popup = (function($) {
    var winW,winH,ratio;
    var scrollTop, scrollBottom, scrollCenter;
    var sectionTopArray = [];
    var sectionElArray = [];
    var titleElArray = [];
    var titleHeight;
    var currentSection = 0;

    var addEvent = function(){
        $(window).on('resize',onResize);
        $(window).on('scroll',onScroll);
        onResize();
    };

    var onResize = function(e){
        winW = $(window).width();
        winH = $(window).height();
        ratio = winW / 720;

        console.log($('.popup .content-holder .section-1'));

        sectionTopArray = [
            sectionElArray[0].offset().top,
            sectionElArray[1].offset().top,
            sectionElArray[2].offset().top,
            sectionElArray[3].offset().top
        ];

        titleHeight = Math.floor(300 *ratio);
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
        var height;
        var titleTop, titleTopTmp,  titleMaxTop;

        for (i=0;i<4;i++) {
            top = sectionTopArray[i];
            height = Math.round(sectionElArray[i].height());

            titleTop = Math.round(scrollTop -top);
            titleTopTmp = scrollTop -top;
            titleMaxTop = height - titleElArray[i].height();

            if (titleTop <0) titleTop = 0;
            if (titleTop > titleMaxTop) titleTop = titleMaxTop;

            if (titleTop === titleTopTmp) {
                titleElArray[i].addClass('onFix');
                titleElArray[i].css('top', 0);
            }else {
                titleElArray[i].removeClass('onFix');
                titleElArray[i].css('top', titleTop);
            }


            if (i<=currentSection) {
                titleElArray[i].addClass('onFocus');
            } else {
                titleElArray[i].removeClass('onFocus');
            }

            // console.log(i + ' : ' + scrollTop + ': top:' + top + ' , ' + 'height:' + height + ' maxTop:' + titleMaxTop + ' titleTop' + titleTop);
        }
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
        load_init:_load_init
    }
})(jQuery);

$(window).on('ready',function(){
    popup.init();
});
$(window).on('load',function(){
    popup.load_init();
});
