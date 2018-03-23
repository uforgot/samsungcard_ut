var swipeUtil = (function($){

    var defaults = {
        touchTarget : $('body'),
        moveTarget : $('body'),
        mode : 'horizontal',
        swipeThreshold: 100,
        contentsNumber : 5,
        freeze : false,
        checkPercent: function(){}
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
        var isFreeze = that.settings.freeze;
        var totalNum = that.settings.contentsNumber;
        var checkPercent = that.settings.checkPercent;
        var moveHeight = moveTarget.height();
        var moveWidth = moveTarget.width();
        var curNum = 0;
        var obj = {x:0,y:0};

        var addEvent = function(){

            touchTarget.on('touchstart',function(e){
                //e.preventDefault();
                var event = e.originalEvent;
                //event.preventDefault();

                isTouch = true;
                sx = dx = event.touches[0].clientX;
                sy = dy = event.touches[0].clientY;
                // console.log('touchstart');

            });

            touchTarget.on('touchmove',function(e){
                //e.preventDefault();
                var event = e.originalEvent;
                //event.preventDefault();
                if(isTouch){
                    dx = event.touches[0].clientX - sx + ox;
                    dy = event.touches[0].clientY - sy + oy;
                    //console.log('touchmove',dx,dy);
                    movePosition(dx,dy);
                }
            });

            touchTarget.on('touchend',function(e){
                var event = e.originalEvent;
                //event.preventDefault();
                //e.preventDefault();
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
                        that.goToSlide(curNum);
                    }
                }

            });
        };
        var movePosition = function(dx,dy){
            var x = mode === 'horizontal' ? dx : 0 ;
            var y = mode === 'vertical' ? dy : 0 ;

            if(isFreeze) {
                obj.x = x;
                obj.y = y;

            }else{
                moveTarget.css({'transform' : 'translate('+ x +'px,'+ y +'px)'})
            }

            checkPercent(that.getPercent());
        };


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
                    percent = -(dx /moveTarget.width()/(totalNum-1))*100;
                    break;
                case 'vertical' :
                    percent = -(dy / moveTarget.height()/(totalNum-1))*100;
                    break;
            }
            //console.log("dd",percent)
            percent = percent ? percent : 0;
            return percent;
        }
        that.goToPrevSlide = function(){
            // console.log('prev')
            curNum = curNum === 0 ? 0 : curNum-1;
            that.goToSlide(curNum);
        }
        that.goToNextSlide = function(){
            // console.log('next')
            curNum = curNum === totalNum-1 ? totalNum-1 : curNum+1;
            that.goToSlide(curNum);
        }

        that.goToSlide = function(num){
            curNum = num;
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

            if(isFreeze) {
                $(obj).stop(true,true).animate({x : x , y : y}, {
                    duration: 400,
                    step: function (now, fx) {
                        dx = obj.x;
                        dy = obj.y;
                        checkPercent(that.getPercent());
                    },
                    complete: function () {
                        ox = dx = x;
                        oy = dy = y;
                        checkPercent(that.getPercent());
                        isTouch = false;
                       console.log("end",sy,dy,oy,y)
                    }
                });
            }else{
                moveTarget.stop().animate({transform : 'translate('+ x +'px,'+ y +'px)'}, {
                    duration: 400,
                    step: function (now, fx) {

                        var matrix = moveTarget.css('transform').split(')')[0];
                        dx = matrix.split(',')[4];
                        dy = matrix.split(',')[5];
                    },
                    complete: function () {
                        ox = dx = x;
                        oy = dy = y;
                        isTouch = false;
                    }
                });
            }
        }

        that.init();
        return that;
    }

    return swipeUtil;

})(jQuery)