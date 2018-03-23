var step = (function($){
    var _motion = function(per,num){
        switch(num){
            case 0 :
                motion0(per);
                $('.circle-1').removeClass('onShow');
                $('.sub-1').removeClass('onShow');
                $('.txt-1').removeClass('onShow')
                break;
            case 1 :
                motion1(per);
                $('.circle-1').removeClass('onHide').addClass('onShow');
                $('.sub-1').removeClass('onHide').addClass('onShow');
                $('.txt-1').removeClass('onHide').addClass('onShow');
                $('.circle-2 .circle').removeClass('onShow');

                $('.circle-2').removeClass('onShow');
                $('.sub-2').removeClass('onShow');
                $('.txt-2').removeClass('onShow');
                break;
            case 2 :
                $('.circle-1').removeClass('onShow').addClass('onHide');
                $('.sub-1').removeClass('onShow').addClass('onHide');
                $('.txt-1').removeClass('onShow').addClass('onHide');
                $('.circle-2 .circle').addClass('onShow');

                $('.circle-2').removeClass('onHide').addClass('onShow');
                $('.sub-2').removeClass('onHide').addClass('onShow');
                $('.txt-2').removeClass('onHide').addClass('onShow');
                motion2(per);
                break
            case 3 :
                motion3(per);
                break
            case 4 :
                motion4(per);
                break
        }

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
        var pp2,pp3,pp4
        if(per < 0.5){
            $('.card-con').css({'transform':'translateY('+p1*-30+'%) scale('+(1-p1*0.3)+')', 'opacity' : 1-p1});

            $('.circle-con-list').css('opacity',0);
            $('.txt-con-list').css({'opacity' : 0});

/*            $('.circle-1 .flight').css({'transform':'translate('+0+'%,'+100+'%)'});
            $('.circle-1 .bag').css({'transform':'translate('+ -200+'%,'+ -10+'%) rotate('+120+'deg)'});
            $('.circle-1 .camera').css({'transform':'translate('+ 50+'%,'+ 50+'%) rotate('+ -30+'deg)'});
            $('.circle-1 .glass').css({'transform':'translate('+ 200+'%,'+ -200+'%) rotate('+ -200+'deg)'});

            $('.sub-1 .cloud-1').css({'transform':'translateY('+ -50+'%)', 'opacity' : 0});
            $('.sub-1 .cloud-2').css({'transform':'translateY('+40+'%)', 'opacity' : 0});
            $('.sub-1 .cloud-3').css({'transform':'translateY('+ -80+'%)', 'opacity' : 0});*/

            $('.shadow-1').css('opacity',0);
        }else{
            $('.card-con').css('opacity',0);

            $('.circle-con-list').css({'transform':'translateY('+((pp1*-50)+50)+'%) scale('+(pp1*0.3 + 0.7)+')', 'opacity' : pp1});
            $('.txt-con-list').css({'transform':'translateY('+((pp1*-30)+30)+'%)', 'opacity' : pp1});

           /* $('.circle-1 .flight').css({'transform':'translate('+0+'%,'+ (pp1*-100+100)+'%)'});
            $('.circle-1 .bag').css({'transform':'translate('+ (200*pp1-200)+'%,'+ (10*pp1-10)+'%) rotate('+(120-120*pp1)+'deg)'});
            $('.circle-1 .camera').css({'transform':'translate('+ (50-50*pp1)+'%,'+ (50-50*pp1)+'%) rotate('+ (-30+30*pp1)+'deg)'});
            $('.circle-1 .glass').css({'transform':'translate('+ (200-200*pp1)+'%,'+ (-200+200*pp1)+'%) rotate('+ (-200+200*pp1)+'deg)'});*/

           /* $('.shadow-1').css('opacity',pp1);*/

            /*if(per>0.5) {
                pp2 = linearTween(per-0.5,0,1,0.5);
                $('.sub-1 .cloud-1').css({'transform':'translateX('+(-50+pp2*50)+'%)', 'opacity' : pp2});
            }
            if(per>0.6) {
                pp3 = linearTween(per-0.6,0,1,0.4);
                $('.sub-1 .cloud-2').css({'transform':'translateX('+(40-pp3*40)+'%)', 'opacity' : pp3});
            }
            if(per>0.7) {
                pp4 = linearTween(per-0.7,0,1,0.3);
                $('.sub-1 .cloud-3').css({'transform':'translateX('+(-80+pp4*80)+'%)', 'opacity' : pp4});
            }*/
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
