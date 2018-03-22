
var main = (function($) {
    var rq,swiper,totalNum,stepNum,stepPercent;
    var checkPercent = function(){
        rq = window.requestAFrame(checkPercent);
        //console.log(swiper.getPercent());
        var percent = swiper.getPercent();
        stepNum = Math.round(percent/stepPercent);
        console.log(stepNum,percent)

    }

    /*================================================================================================================*/
    var _init = function(){


    };
    var _load_init = function(){

        totalNum = $('.main-list li').length;
        stepPercent = 100/(totalNum-1);
        console.log("................",totalNum,stepPercent);

      swiper = swipeUtil({
          moveTarget : $('.main-list'),
          mode : 'vertical'
      });

      checkPercent();
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
