var step = (function($){
    var _motion = function(per,num){
        switch(num){
            case 0 :
                motion0(per);
                $('.circle-1').removeClass('onShow');
                $('.sub-1').removeClass('onShow');
                $('.txt-1').removeClass('onShow');
                $('.shadow-1').removeClass('onShow');
                break;
            case 1 :
                motion1(per);
                $('.circle-1').removeClass('onHide').addClass('onShow');
                $('.sub-1').removeClass('onHide').addClass('onShow');
                $('.txt-1').removeClass('onHide').addClass('onShow');
                $('.shadow-1').addClass('onShow');
                $('.circle-2 .circle').removeClass('onShow');

                $('.circle-2').removeClass('onShow');
                $('.sub-2').removeClass('onShow');
                $('.txt-2').removeClass('onShow');
                $('.shadow-2').removeClass('onShow');
                break;
            case 2 :
                $('.circle-1').removeClass('onShow').addClass('onHide');
                $('.sub-1').removeClass('onShow').addClass('onHide');
                $('.txt-1').removeClass('onShow').addClass('onHide');
                $('.shadow-1').removeClass('onShow');

                $('.circle-2 .circle').addClass('onShow');
                $('.circle-2').removeClass('onHide').addClass('onShow');
                $('.sub-2').removeClass('onHide').addClass('onShow');
                $('.txt-2').removeClass('onHide').addClass('onShow');
                $('.shadow-2').addClass('onShow');

                $('.circle-3 .circle').removeClass('onShow');
                $('.circle-3').removeClass('onShow')
                $('.sub-3').removeClass('onShow')
                $('.txt-3').removeClass('onShow')
                $('.shadow-3').removeClass('onShow');

                motion2(per);
                break
            case 3 :
                $('.circle-2').removeClass('onShow').addClass('onHide');
                $('.sub-2').removeClass('onShow').addClass('onHide');
                $('.txt-2').removeClass('onShow').addClass('onHide');
                $('.shadow-2').removeClass('onShow');

                $('.circle-3 .circle').addClass('onShow');
                $('.circle-3').removeClass('onHide').addClass('onShow');
                $('.sub-3').removeClass('onHide').addClass('onShow');
                $('.txt-3').removeClass('onHide').addClass('onShow');
                $('.shadow-3').addClass('onShow');

                $('.circle-4 .circle').removeClass('onShow');
                $('.circle-4').removeClass('onShow')
                $('.sub-4').removeClass('onShow')
                $('.txt-4').removeClass('onShow')
                $('.shadow-4').removeClass('onShow');
                motion3(per);
                break
            case 4 :
                $('.circle-3').removeClass('onShow').addClass('onHide');
                $('.sub-3').removeClass('onShow').addClass('onHide');
                $('.txt-3').removeClass('onShow').addClass('onHide');
                $('.shadow-3').removeClass('onShow');

                $('.circle-4 .circle').addClass('onShow');
                $('.circle-4').removeClass('onHide').addClass('onShow');
                $('.sub-4').removeClass('onHide').addClass('onShow');
                $('.txt-4').removeClass('onHide').addClass('onShow');
                $('.shadow-4').addClass('onShow');

                motion4(per);
                break
        }
        // console.log(num);

    }

    var motion0 = function(p){
        //console.log(per)
        var per = p*(TOTALNUM-1)/100;
        per = per<0 ? 0 : per;

        $('.event-txt').css({'transform':'translateY('+per*-30+'%)'});
        $('.slide-btn-holder').css({'transform':'translateY('+per*200+'%)','opacity':1-per*2});

        var p1 = per/0.5;
        var p2,p3,p4,p5;

        var pp1 = (per-0.5)/0.5;
        if(per < 0.5){
            $('.card-con').css({'transform':'translateY('+p1*-30+'%) scale('+(1-p1*0.3)+')', 'opacity' : 1-p1});

            $('.circle-con-list').css('opacity',0);
            $('.txt-con-list').css({'opacity' : 0});

        }else{
            $('.card-con').css('opacity',0);

            $('.circle-con-list').css({'transform':'translateY('+((pp1*-50)+50)+'%) scale('+(pp1*0.3 + 0.7)+')', 'opacity' : pp1});
            $('.txt-con-list').css({'transform':'translateY('+((pp1*-30)+30)+'%)', 'opacity' : pp1});
        }
        if(per>0) {
            p2 = easeInOutCubic(per,0,1,0.5);
            $('.main-txt .txt').css({'transform':'translateY('+p2*-10+'%)', 'opacity' : 1-p2});
        }
        if(per>0.1) {
            p3 = easeInOutCubic(per-0.1,0,1,0.5);
            $('.main-txt .title').css({'transform':'translateY('+p3*-20+'%)', 'opacity' : 1-p3});
        }
        if(per>0.2) {
            p4 = easeInOutCubic(per-0.2,0,1,0.5);
            $('.main-txt .btn').css({'transform':'translateY('+p4*-20+'%)', 'opacity' : 1-p4});
        }
        if(per>0.3) {
            p5 = easeInOutCubic(per-0.3,0,1,0.5);
            $('.main-txt .benefit').css({'transform':'translateY('+p5*-20+'%)', 'opacity' : 1-p5});
        }
    }
    var motion1 = function(per){

    }
    var motion2 = function(per){

    }
    var motion3 = function(per){

    }
    var motion4 = function(per){

    }

    return {
        motion : _motion
    }
})(jQuery);
