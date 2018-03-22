
var main = (function($) {
    var rq,swiper,totalNum,stepNum,stepPercent,winW,winH,scrollTop,scrollBottom;
    var animate = function(){
        rq = window.requestAFrame(animate);
        //console.log(swiper.getPercent());
        var percent = swiper.getPercent();
        stepNum = Math.round(percent/stepPercent);
        console.log(stepNum,percent)

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

        totalNum = $('section').length;
        stepPercent = 100/(totalNum-1);
        // console.log("................",totalNum,stepPercent);

        swiper = swipeUtil({
            touchTarget : $('.wrap'),
            moveTarget : $('.contents'),
            mode : 'vertical'
        });

        animate();
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
