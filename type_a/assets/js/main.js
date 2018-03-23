var main = (function($) {
    var CARD_MAX = 5;
    var CARD_MAX_SCALE = 1;
    var CARD_MOVE_SCALE = 1;
    var CARD_MIN_SCALE = 0.95;
    var CARD_MARGIN = 635;

    var IMAGE_MAX_SCALE = 1.1;
    var IMAGE_MOVE_SCALE = 0.8;
    var IMAGE_MIN_SCALE = 0.9;


    var winW,winH,ratio;
    var scrollTop, scrollBottom, scrollCenter;
    var topBgHeight, topMenuHeight;
    var menuBgEl = $('.menu-wrap .bg-holder');

    var cardHolder = $('.card-holder');
    var cardBox = $('.card-box');

    var cardContainer = $('.card-clip'); // 카드 전체 묶음 좌우 이동
    var cardPosElArray; //카드 하나하나 좌표
    var cardScaleElArray; // 카드 하나하나 크기
    var cardImageElArray;

    var currentFocus;
    var currentX;

    var setEl = function() {
        var i;

        cardPosElArray = [];
        cardScaleElArray = [];
        cardImageElArray = [];

        for (i=0;i<CARD_MAX;i++) {
            cardPosElArray.push($('.card-holder .card-pod-' + (i+1)));
            cardScaleElArray.push($('.card-holder .card-pod-' + (i+1) + ' .card-scale'));
            cardImageElArray.push($('.card-holder .card-pod-' + (i+1) + ' .card-image'));
        }

        var tmpX;
        for (i=0;i<CARD_MAX;i++){
            tmpX = CARD_MARGIN * i;
            cardPosElArray[i].css('transform','translateX(' + tmpX + 'px) ');
        }
    };

    var setSnap = function() {
        var tmpIndex = Math.round(currentX / CARD_MARGIN) * -1;

        if (tmpIndex <0) {tmpIndex = 0;}
        if (tmpIndex > CARD_MAX-1) {tmpIndex = CARD_MAX-1;}
        setFocus(tmpIndex);
    };

    var setNext = function() {

    };

    var setFocus = function($index) {
        var tmpX = $index * CARD_MARGIN * -1;
        currentX = tmpX;
        cardContainer.css('transform', 'translateX('+tmpX +'px)');
        // cardContainer.css('left', tmpX);

        currentFocus = $index;

        setScale($index);
        setBg($index);
    };

    var setBg = function($index) {

    };

    var setX = function($x) {
        currentX = currentX + $x;
        cardContainer.css('transform', 'translateX('+ currentX +'px)');
    };

    var setScale = function($index) {
        if ($index === -1) {
            for (i=0;i<CARD_MAX;i++) {
                cardScaleElArray[i].css('transform', 'scale(' + CARD_MOVE_SCALE + ')');
                cardImageElArray[i].css('transform', 'scale(' + IMAGE_MOVE_SCALE + ')');
            }
        } else {
            for (i=0;i<CARD_MAX;i++) {
                if (i===$index) {
                    cardScaleElArray[i].css('transform','scale(' + CARD_MAX_SCALE +')');
                    cardImageElArray[i].css('transform', 'scale(' + IMAGE_MAX_SCALE + ')');
                } else {
                    cardScaleElArray[i].css('transform','scale(' + CARD_MIN_SCALE +')');
                    cardImageElArray[i].css('transform', 'scale(' + IMAGE_MIN_SCALE + ')');
                }
            }
        }
    };


    /*== touch ==*/
    var isTouchDrag = false;
    var touchX, touchY;

    var onTouchStart = function($e) {

        // if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
            event.preventDefault();
        // }

        if(isTouchDrag === true) return;
        isTouchDrag = true;

        cardContainer.addClass('drag');

        var touch = $e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        touchY = touch.pageY;
        touchX = touch.pageX;

        setScale(-1);

        $(window).on('touchmove' ,onTouchMove);
        $(window).on('touchend' ,onTouchEnd);
    };

    var onTouchMove = function($e) {
        var touch = $e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        var distance = (touch.pageX - touchX)*2;
        touchX = touch.pageX;

        setX(distance);
    };

    var onTouchEnd = function($e) {
        isTouchDrag = false;
        cardContainer.removeClass('drag');

        setSnap();

        $(window).off('touchmove' ,onTouchMove);
        $(window).off('touchend' ,onTouchEnd);
    };

    /*== event ==*/

    var addEvent = function(){

        $(window).on('resize',onResize);
        $(window).on('scroll',onScroll);
        onResize();

        // cardHolder.on('touchstart' ,onTouchStart);
        $('.drag-area').on('touchstart' ,onTouchStart);
    };


    var onResize = function(e){
        winW = $(window).width();
        winH = $(window).height();
        ratio = winW / 720;

        topBgHeight = Math.floor(438 * ratio);
        topMenuHeight = Math.floor(80 * ratio);

        var txtHeight = Math.floor(26 * ratio);

        // cardHolder.css('height', Math.floor(670*ratio) )

        var margin = 246;
        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
            margin = 500;
        }

        var tmpH = winH - (246*ratio) - txtHeight;
        var cardRatio = ratio;

        if ( Math.floor(1006*cardRatio) > tmpH) {
            cardRatio = tmpH / 1006;
        }


        cardBox.css('transform', 'scale(' + cardRatio + ')');

        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
            cardBox.css('top', '50%');
        } else {
            cardBox.css('top', '48%');
        }

        scrollTo(0,0);

        onScroll();
    };

    var onScroll = function(){
        scrollTop = ($(window).scrollTop()|| $('body').scrollTop());
        scrollBottom = scrollTop + winH;
        scrollCenter = scrollTop + (scrollBottom / 2);

        // console.log(438 * ratio);
        if (scrollTop >= (topBgHeight-topMenuHeight)) {
            menuBgEl.addClass('onShow');
        } else {
            menuBgEl.removeClass('onShow');
        }
    };

    /*== init ==*/
    var _getTouchDrag = function() {
        return isTouchDrag;
    };

    var subLoadComplete = function(){
        popup.init();
        popup.load_init();
    };


    var _init = function(){

    };

    var _load_init = function(){
        addEvent();
        setEl();
        setFocus(0);

        $('.popup-con').load('popup.html .popup',subLoadComplete);
    };

    return{
        getTouchDrag:_getTouchDrag,
        resize:onResize,
        init:_init,
        load_init:_load_init
    }
})(jQuery);

$(window).on('ready',function(){
    main.init();
});
$(window).on('load',function(){
    main.load_init();
});


$(document).ready(function() {
    $('.hover').bind('touchstart', function(e) {
        console.log('xxx');
        e.preventDefault();
        $(this).addClass('hover-effect');
    });

    $('.hover').bind('touchend', function(e) {

        e.preventDefault();
        $(this).removeClass('hover-effect');

        if (main.getTouchDrag()) return;

        var index =$(this).attr('card-index');

        if (index === undefined) return;

        index = parseInt(index);


        popup.setSection(index);

        $('.popup-con').css('display','block');

        setTimeout(function(){
            $('.popup-con').addClass('onShow');
            $('.popup .menu-wrap').addClass('onShow');
        },100);
        $('body,html').css('overflow','initial');


        $('.popup-con .close-holder a').on('click',function(e){
            e.preventDefault();

            $('body,html').css('overflow','hidden');

            $('.popup-con .close-holder a').off('click');
            popup.setSection(0);

            $('.popup-con').removeClass('onShow');
            $('.popup .menu-wrap').removeClass('onShow');

            setTimeout(function(){
                $('.popup-con').css('display','none');
            },500);

            main.resize();
        })
    });

});


