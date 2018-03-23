var main = (function($) {
    var CARD_MAX = 3;
    var CARD_MAX_SCALE = 1;
    var CARD_MOVE_SCALE = 0.9;
    var CARD_MIN_SCALE = 0.8;
    var CARD_MARGIN = 458;

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
        console.log('ssss');
        var diff = currentX - startX;
        var tmpIndex;

        if (diff>0) {
            tmpIndex = Math.ceil(currentX / CARD_MARGIN) * -1;
        } else {
            tmpIndex = Math.floor(currentX / CARD_MARGIN) * -1;
        }

        if (tmpIndex <0) {tmpIndex = 0;}
        if (tmpIndex > CARD_MAX-1) {tmpIndex = CARD_MAX-1;}
        setFocus(tmpIndex);
    };

    var setFocus = function($index) {
        var tmpX = $index * CARD_MARGIN * -1;
        currentX = tmpX;
        cardContainer.css('transform', 'translateX('+tmpX +'px)');
        // cardContainer.css('left', tmpX);

        $('.txt-focus').css('transform', 'translateY( ' + -34*$index + 'px)'  );


        setScale($index);
        setBg($index);
    };

    var setBg = function($index) {

        var i;
        for (i=0;i<CARD_MAX;i++) {
            if (i===$index) {
                backgroundElArray[i].addClass('onFocus');
            } else {
                backgroundElArray[i].removeClass('onFocus');
            }
        }
    };

    var setX = function($x) {
        currentX = currentX + $x;

        cardContainer.css('transform', 'translateX('+ currentX +'px)');
        // cardContainer.css('left', currentX);
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
    var touchX, touchY, startX;

    var onTouchStart = function($e) {

        event.preventDefault();
        if(isTouchDrag === true) return;
        isTouchDrag = true;

        cardContainer.addClass('drag');

        var touch = $e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        touchY = touch.pageY;
        touchX = touch.pageX;
        startX = currentX;

        setScale(-1);

        $(window).on('touchmove' ,onTouchMove);
        $(window).on('touchend' ,onTouchEnd);
    };

    var onTouchMove = function($e) {
        var touch = $e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        var distance = (touch.pageX - touchX);
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

        topBgHeight = Math.round(438 * ratio);
        topMenuHeight = Math.round(80 * ratio) + 2;

        $('.bg-holder').css('height', topMenuHeight);
        $('.menu-wrap .bg-holder .bg img').css('height', topMenuHeight);

        cardHolder.css('height', Math.round(670*ratio) );
        cardBox.css('top',Math.round(437*ratio) );
        cardBox.css('transform', 'scale(' + ratio + ')');

        $('.txt-focus-clip').css('transform','scale3d(' + ratio + ', ' + ratio + ', ' + ratio + ')');

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
        setEl();
        setFocus(1);

        onResize();

        setTimeout(show1, 600);
        setTimeout(show2, 900);
        setTimeout(show3, 1200);
        setTimeout(show4, 1200);
    };

    var show1 = function() {
        $('.intro-bg').addClass('onShow');

        $('.list-1').addClass('onShow');
        $('.list-2').addClass('onShow');
        $('.list-3').addClass('onShow');
        $('.list-4').addClass('onShow');
    };

    var show2 = function() {
        $('.cont-box-txt').addClass('onShow');
    };

    var show3 = function(){
        $('.card-holder').addClass('onShow');
    };

    var show4 = function() {

        addEvent();
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
