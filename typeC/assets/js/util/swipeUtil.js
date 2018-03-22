var swipeUtil = (function($){

    var defaults = {
        touchTarget : $('body'),
        moveTarget : $('body'),
        mode : 'horizontal',
        swipeThreshold: 100
    }

    var swipeUtil = function(spec){
        var that = {};
        that.settings = $.extend({}, defaults, spec);

        var isTouch = false;
        var sx,sy,dx,dy,ox=0,oy=0;
        var touchTarget = that.settings.touchTarget;
        var moveTarget = that.settings.moveTarget;
        var mode = that.settings.mode;
        var swipeThreshold = that.settings.swipeThreshold;
        var totalNum = moveTarget.children().length;
        var moveHeight = moveTarget.height()/totalNum;
        var moveWidth = moveTarget.width()/totalNum;
        var curNum = 0;

        var addEvent = function(){

            touchTarget.bind('touchstart',function(e){
                var event = e.originalEvent;

                isTouch = true;
                sx = event.touches[0].clientX;
                sy = event.touches[0].clientY;
                // console.log('touchstart');

                event.preventDefault();
            });

            touchTarget.bind('touchmove',function(e){
                var event = e.originalEvent;


                if(isTouch){
                    dx = event.touches[0].clientX - sx + ox;
                    dy = event.touches[0].clientY - sy + oy;
                    //console.log('touchmove',dx,dy);

                    movePosition(dx,dy);
                }

                event.preventDefault();
            });

            touchTarget.bind('touchend',function(e){
                var event = e.originalEvent;

                if(isTouch){
                    // console.log('touchend');

                    var distance;

                    switch(mode){
                        case 'horizontal' :
                            distance = dx - ox;
                            break;
                        case 'vertical' :
                            distance = dy - oy;
                            break;
                    }


                    if (Math.abs(distance) >= swipeThreshold) {
                        if (distance < 0) {
                            that.goToNextSlide();
                        } else {
                            that.goToPrevSlide();
                        }
                        //el.stopAuto();
                    } else {
                        // el.animate(property, 200);
                        //setPositionProperty(value, 'reset', 200);
                        goToSlide();
                    }
                }
                event.preventDefault();
            });
        };
        var movePosition = function(dx,dy){
            var x = mode === 'horizontal' ? dx : 0 ;
            var y = mode === 'vertical' ? dy : 0 ;
            moveTarget.css({'transform' : 'translate('+ x +'px,'+ y +'px)'})
        };

        var goToSlide = function(){

            var x,y

            switch(mode){
                case 'horizontal' :
                    x = -moveWidth*curNum;
                    y = 0;
                    break;
                case 'vertical' :
                    x = 0;
                    y = -moveHeight*curNum;
                    break;
            }

            moveTarget.animate({transform : 'translate('+ x +'px,'+ y +'px)'},{duration:400,
                step : function(now,fx) {

                    var matrix = moveTarget.css('transform').split(')')[0];
                    dx = matrix.split(',')[4]; dy = matrix.split(',')[5];
                },
                complete : function(){
                    ox = dx = x; oy = dy = y;
                    isTouch = false;
                }
            });
        }

        /*================================================== [ method ] ==========================================================*/
        that.init = function(){
            addEvent();
        };
        that.getPos = function(){
            var obj = { x : dx , y : dy};
            return obj;
        }
        that.getPercent = function(){
            var percent;
            switch(mode){
                case 'horizontal' :
                    percent = Math.abs(dx /moveTarget.width()/(totalNum-1))*100;
                    break;
                case 'vertical' :
                    percent = Math.abs(dy / moveTarget.height()/(totalNum-1))*100;
                    break;
            }
            console.log("dd",percent)
            percent = percent ? percent : 0;
            return percent;
        }
        that.goToPrevSlide = function(){
            // console.log('prev')
            curNum = curNum === 0 ? 0 : curNum-1;
            goToSlide();
        }
        that.goToNextSlide = function(){
            // console.log('next')
            curNum = curNum === totalNum-1 ? totalNum-1 : curNum+1;
            goToSlide();
        }

        that.init();
        return that;
    }

    return swipeUtil;

})(jQuery)