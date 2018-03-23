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
    }

    var onResize = function(e){
        winW = $(window).width();
        winH = $(window).height();
    }



    /*================================================================================================================*/
    var _init = function(){


    };
    var _load_init = function(){
        stepPercent = 100/(TOTALNUM-1);
        // console.log("................",totalNum,stepPercent);

        swiper = swipeUtil({
           /* touchTarget : $('.wrap'),*/
            moveTarget : $('.contents'),
            mode : 'vertical',
            contentsNumber : TOTALNUM,
            freeze : true,
            checkPercent : animate
        });
        animate();
        addEvent();

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
