const TOTALNUM = 5;
var main = (function($) {

    var rq,swiper,stepNum,stepPercent,winW,winH,scrollTop,scrollBottom;
    var animate = function(){
        //rq = window.requestAFrame(animate);
        //console.log(swiper.getPercent());
        var percent = swiper.getPercent();
        percent = percent < 0 ? 0 : percent;
        percent = percent.toFixed(2);
        stepNum = Math.floor(percent/stepPercent);

        step.motion(percent,stepNum);
        var num = Math.round(percent/stepPercent);
        $('.indi-con-list li').removeClass('active');
        $('.indi-con-list li').eq(num).addClass('active');

        if(percent <= stepPercent){
            swiper.setSkipSlide(false);
        }else{
            swiper.setSkipSlide(true);
        }
    }

    var addEvent = function(){
        $(window).on('resize',onResize);

        onResize();

        $('.txt-con-list .btn').on('touchend',function(e){
            e.preventDefault();

            var index = $(this).parent().index();
            popup.setSection(index);

            $('.popup-con').css('display','block');

            swiper.removeEvent();

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
                    swiper.addEvent();
                },500);
            })
        })

        $('.hover').bind('touchstart', function(e) {
            e.preventDefault();
            $(this).addClass('hover-effect');
        });

        $('.hover').bind('touchend', function(e) {
            e.preventDefault();
            $(this).removeClass('hover-effect');
        });

    }

    var onResize = function(e){
        winW = $(window).width();
        winH = $(window).height();
    }


    var subLoadComplete = function(){
        popup.init();
        popup.load_init();
    }
    /*================================================================================================================*/
    var _init = function(){

    };
    var _load_init = function(){
        stepPercent = 100/(TOTALNUM-1);
        // console.log("................",totalNum,stepPercent);

        swiper = swipeUtil({
            /*touchTarget : $('.container'),*/
            moveTarget : $('.contents'),
            mode : 'vertical',
            contentsNumber : TOTALNUM,
            freeze : true,
            checkPercent : animate
        });
        animate();
        addEvent();

        $('.popup-con').load('popup.html .popup',subLoadComplete);

        //swiper.goToSlide(1);
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
