var main = (function($) {
    var CARD_MAX = 5;
    var CARD_MAX_SCALE = 1;
    var CARD_MOVE_SCALE = 1;
    var CARD_MIN_SCALE = 0.95;
    var CARD_MARGIN = 635;

    var winW,winH,ratio;
    var scrollTop, scrollBottom, scrollCenter;
    var topBgHeight, topMenuHeight;
    var menuBgEl = $('.menu-wrap .bg-holder');

    var cardHolder = $('.card-holder');
    var cardBox = $('.card-box');

    var cardContainer = $('.card-clip'); // 카드 전체 묶음 좌우 이동
    var cardPosElArray; //카드 하나하나 좌표
    var cardScaleElArray; // 카드 하나하나 크기

    var backgroundElArray;

    var currentFocus;
    var currentX;

    var setEl = function() {
        var i;
        cardPosElArray = [];
        cardScaleElArray = [];

        backgroundElArray = [
            $('.bg-1'),
            $('.bg-2'),
            $('.bg-3')
        ];

        for (i=0;i<CARD_MAX;i++) {
            cardPosElArray.push($('.card-holder .card-pod-' + (i+1)));
            cardScaleElArray.push($('.card-holder .card-pod-' + (i+1) + ' .card-scale'));
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
                cardScaleElArray[i].css('transform', 'scale(' + CARD_MOVE_SCALE + ')')
            }
        } else {
            for (i=0;i<CARD_MAX;i++) {
                if (i===$index) {
                    cardScaleElArray[i].css('transform','scale(' + CARD_MAX_SCALE +')')
                } else {
                    cardScaleElArray[i].css('transform','scale(' + CARD_MIN_SCALE +')')
                }
            }
        }
    };


    /*== touch ==*/
    var isTouchDrag = false;
    var touchX, touchY;

    var onTouchStart = function($e) {

        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
            event.preventDefault();
        }

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

        cardHolder.on('touchstart' ,onTouchStart);
    };


    var onResize = function(e){
        winW = $(window).width();
        winH = $(window).height();
        ratio = winW / 720;

        topBgHeight = Math.floor(438 * ratio);
        topMenuHeight = Math.floor(80 * ratio);

        // cardHolder.css('height', Math.floor(670*ratio) )
        cardBox.css('top', winH/2 - $('footer').height() );
        cardBox.css('transform', 'scale(' + ratio + ')');

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

    var _init = function(){

    };

    var _load_init = function(){
        addEvent();
        setEl();
        setFocus(0);
    };

    return{
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
    $('.hover').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover-effect');
    });
});


