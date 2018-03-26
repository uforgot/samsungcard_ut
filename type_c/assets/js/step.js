var step = (function($){
    var stepPercent = 100/(TOTALNUM-1);
    var _motion = function(per,step,num){

        switch(step) {
            case 0 :
                motion0(per);
                break;
            case 1 :
                motion1(per);
                $('.txt-1').css('z-index',10);
                $('.txt-2').css('z-index',0);
                break;
            case 2 :
                motion2(per);
                $('.txt-2').css('z-index',10);
                $('.txt-1').css('z-index',0);
                $('.txt-3').css('z-index',0);
                break;
            case 3 :
                motion3(per);
                $('.txt-3').css('z-index',10);
                $('.txt-4').css('z-index',0);
                $('.txt-2').css('z-index',0);
                break;
            case 4 :
                motion4(per);
                $('.txt-3').css('z-index',0);
                $('.txt-4').css('z-index',10);
                break;
        }

        var circlePer = ( Math.abs(per%stepPercent-stepPercent/2))/(stepPercent/2)*0.1 + 0.9;
        if(per>=stepPercent){
           $('.circle-con-list').css({'transform':toScale3d(circlePer,circlePer,circlePer)});
        }
        // console.log(num);

    }

    var motion0 = function(p){
        //console.log(per)
        var per = p*(TOTALNUM-1)/100;
        per = per<0 ? 0 : per;

        $('.event-txt').css({'transform':'translate3d(0,'+per*-30+'%,0)'});
        $('.slide-btn-holder').css({'transform':'translate3d(0,'+per*200+'%,0)','opacity':1-per*2});

        var p1 = per/0.5;
        var p2,p3,p4,p5;

        var pp1 = (per-0.5)/0.5;
        if(per < 0.5){
            $('.card-con').css({'transform':'translate3d(0,'+p1*-30+'%,0) scale3d('+(1-p1*0.3)+','+(1-p1*0.3)+','+(1-p1*0.3)+')', 'opacity' : 1-p1});

            $('.circle-con-list').css('opacity',0);
            $('.txt-con-list').css({'opacity' : 0});

        }else{
            $('.card-con').css('opacity',0);
            $('.circle-con-list').css({'transform':'translate3d(0,'+((pp1*-50)+50)+'%,0) scale3d('+(pp1*0.3 + 0.7)+','+(pp1*0.3 + 0.7)+','+(pp1*0.3 + 0.7)+')', 'opacity' : pp1});
            $('.txt-con-list').css({'transform':'translate3d(0,'+((pp1*-30)+30)+'%,0)', 'opacity' : pp1});

            var pp2 = setPer(pp1,0,0.8);
            $('.circle-1 .glass').css({'transform': toTrans2d(100-100*pp2,0) + toRotate2d(-100 + 100*pp2)});
            $('.circle-1 .camera').css({'transform': toTrans2d(50-50*pp2,50-50*pp2) + toRotate2d(-60 + 60*pp2)});
            $('.circle-1 .bag').css({'transform': toTrans2d(-100+100*pp2,0) + toRotate2d(80 - 80*pp2)});
            $('.circle-1 .flight').css({'transform': toTrans2d(0,80-80*pp1)});

            var pp3 = setPer(pp1,0,0.6);
            var pp4 = setPer(pp1,0,.8);
            $('.sub-1 .cloud-1').css({'transform':toTrans2d(0,150-150*pp1),'opacity':pp1});
            $('.sub-1 .cloud-2').css({'transform':toTrans2d(0,80-80*pp1),'opacity':pp4});
            $('.sub-1 .cloud-3').css({'transform':toTrans2d(0,50-50*pp1),'opacity':pp3});

            // $('.shadow-1').css({'opacity':pp1});
            $('.shadow').css({'opacity':pp1});
            $('.txt-1').css({'transform':toTrans2d(0,30-30*pp1),'opacity':pp1});

            $('.circle-1 .circle').css('opacity',pp1);

        }
        if(per>0) {
            p2 = easeInOutCubic(per,0,1,0.5);
            $('.main-txt .txt').css({'transform':'translate3d(0,'+p2*-10+'%,0)', 'opacity' : 1-p2});
        }
        if(per>0.1) {
            p3 = easeInOutCubic(per-0.1,0,1,0.5);
            $('.main-txt .title').css({'transform':'translate3d(0,'+p3*-20+'%,0)', 'opacity' : 1-p3});
        }
        if(per>0.2) {
            p4 = easeInOutCubic(per-0.2,0,1,0.5);
            $('.main-txt .btn').css({'transform':'translate3d(0,'+p4*-20+'%,0)', 'opacity' : 1-p4});
        }
        if(per>0.3) {
            p5 = easeInOutCubic(per-0.3,0,1,0.5);
            $('.main-txt .benefit').css({'transform':'translate3d(0,'+p5*-20+'%,0)', 'opacity' : 1-p5});
        }
    }
    var motion1 = function(p){
        var per = (p-stepPercent)/stepPercent;
        if(per < 0.5){
            var p1 = setPer(per,0,0.5);
            var p2 = setPer(per,0,0.4);
            var p3 = setPer(per,0,0.35);
            var p4 = setPer(per,0,0.3);

            $('.circle-1 .glass').css({'transform': toTrans2d(100*p1,0) + toRotate2d(100*p1)});
            $('.circle-1 .camera').css({'transform': toTrans2d(50*p1,50*p1) + toRotate2d(60*p1)});
            $('.circle-1 .bag').css({'transform': toTrans2d(-100*p1,0) + toRotate2d(-80*p1)});
            $('.circle-1 .flight').css({'transform': toTrans2d(0,-100*p1)});

            $('.sub-1 .cloud-1').css({'transform':toTrans2d(0,-60*p4),'opacity':1-p4});
            $('.sub-1 .cloud-2').css({'transform':toTrans2d(0,-100*p3),'opacity':1-p3});
            $('.sub-1 .cloud-3').css({'transform':toTrans2d(0,-120*p2),'opacity':1-p2});

            $('.circle-1 .circle').css('opacity',1-p1);
            $('.circle-2 .circle').css('opacity',p1);

            // $('.shadow-1').css('opacity',1-p1);
            // $('.shadow-2').css('opacity',p1);

            $('.txt-1').css({'transform':toTrans2d(0,-30*p1),'opacity':1-p1});
            $('.txt-2').css({'opacity':0});

            $('.circle-2 .coke').css({'transform': toTrans2d(0,120)});
        }else{
            var pp1 = setPer(per,0.5,1);
            var pp2 = setPer(per,0.5,0.9);
            var pp3 = setPer(per,0.5,0.85);
            var pp4 = setPer(per,0.5,0.8);

            $('.circle-2 .glass').css({'transform': toTrans2d(-80+80*pp4,0) + toRotate2d(50-50*pp4)});
            $('.circle-2 .popcorn').css({'transform': toTrans2d(100-100*pp3,0) + toRotate2d(60-60*pp4)});
            $('.circle-2 .coke').css({'transform': toTrans2d(0,120-120*pp2)});

            $('.sub-2 .s-1').css({'transform':toTrans2d(0,50-50*pp2),'opacity':pp1});
            $('.sub-2 .s-2').css({'transform':toTrans2d(0,30-30*pp1),'opacity':pp4});

            $('.circle-1 .glass').css({'transform': toTrans2d(100,0) + toRotate2d(100)});
            $('.circle-1 .camera').css({'transform': toTrans2d(50,50) + toRotate2d(60)});
            $('.circle-1 .bag').css({'transform': toTrans2d(-100,0) + toRotate2d(-80)});
            $('.circle-1 .flight').css({'transform': toTrans2d(0,-100)});

            $('.txt-1').css({'opacity':0});
            $('.txt-2').css({'transform':toTrans2d(0,30-30*pp1),'opacity':pp1});

        }
    }
    var motion2 = function(p){
        var per = (p-stepPercent*2)/stepPercent;
        if(per < 0.5){
            var p1 = setPer(per,0,0.5);
            var p2 = setPer(per,0,0.4);
            var p3 = setPer(per,0,0.35);

            $('.circle-2 .glass').css({'transform': toTrans2d(-80*p2,0) + toRotate2d(-50*p2)});
            $('.circle-2 .popcorn').css({'transform': toTrans2d(100*p3,0) + toRotate2d(60*p3)});
            $('.circle-2 .coke').css({'transform': toTrans2d(0,-140*p2)});

            $('.sub-2 .s-1').css({'transform':toTrans2d(0,-50*p2),'opacity':1-p2});
            $('.sub-2 .s-2').css({'transform':toTrans2d(0,-30*p1),'opacity':1-p1});

            $('.circle-2 .circle').css('opacity',1-p1);
            $('.circle-3 .circle').css('opacity',p1);

            $('.circle-3 .ktx').css({'transform': toTrans2d(0,30),'opacity' : 0});
            $('.sub-3 .s-1').css({'transform':toTrans2d(0,50),'opacity':0});

            // $('.shadow-2').css('opacity',1-p1);
            // $('.shadow-3').css('opacity',p1);

            $('.txt-2').css({'transform':toTrans2d(0,-30*p1),'opacity':1-p1});
            $('.txt-3').css({'opacity':0});
        }else{
            var pp1 = setPer(per,0.5,1);
            var pp2 = setPer(per,0.5,0.9);

            $('.circle-3 .ktx').css({'transform': toTrans2d(0,30-30*pp2),'opacity' : pp1});
            $('.sub-3 .s-1').css({'transform':toTrans2d(0,30-30*pp1),'opacity':pp1});

            $('.txt-2').css({'opacity':0});
            $('.txt-3').css({'transform':toTrans2d(0,30-30*pp1),'opacity':pp1});

            $('.circle-2 .glass').css({'transform': toTrans2d(-80,0) + toRotate2d(-50)});
            $('.circle-2 .popcorn').css({'transform': toTrans2d(100,0) + toRotate2d(60)});
            $('.circle-2 .coke').css({'transform': toTrans2d(0,-140)});
        }

    }
    var motion3 = function(p){
        var per = (p-stepPercent*3)/stepPercent;
        if(per < 0.5) {
            var p1 = setPer(per, 0, 0.5);
            var p2 = setPer(per, 0, 0.4);
            var p3 = setPer(per, 0, 0.35);

            $('.circle-3 .ktx').css({'transform': toTrans2d(0,-40 * p1)});

            $('.sub-3 .s-1').css({'transform': toTrans2d(0, -50 * p3), 'opacity': 1 - p3});

            $('.circle-3 .circle').css('opacity',1-p1);
            $('.circle-4 .circle').css('opacity',p1);

            $('.circle-4 .puppy').css({'transform': toTrans2d(0,100),'opacity' : 0});
            $('.sub-4 .s-1').css({'transform':toTrans2d(0,50),'opacity':0});

            // $('.shadow-3').css('opacity',1-p1);
            // $('.shadow-4').css('opacity',p1);

            $('.txt-3').css({'transform':toTrans2d(0,-30*p1),'opacity':1-p1});
            $('.txt-4').css({'opacity':0});
        }else{
            var pp1 = setPer(per,0.5,1);
            var pp2 = setPer(per,0.5,0.9);

            $('.circle-4 .puppy').css({'transform': toTrans2d(0,100-100*pp2),'opacity' : pp1});
            $('.sub-4 .s-1').css({'transform':toTrans2d(0,50-50*pp1),'opacity':pp1});

            $('.txt-3').css({'opacity':0});
            $('.txt-4').css({'transform':toTrans2d(0,30-30*pp1),'opacity':pp1});
        }
    }
    var motion4 = function(per){

    }

    var setPer = function(per,s,t){
        var p;
        if(per < s){
            p = 0;
        }else if(per > t){
            p = 1;
        }else{
            p = (per-s) / (t-s);
        }
        return p;
    }
    var toTrans3d = function(x,y,z){
        var str = 'translate3d('+x+'%,'+y+'%,'+z+'%)'
        return str;
    }
    var toScale3d = function(x,y,z){
        return 'scale3d('+x+','+y+','+z+') ';
    }
    var toRotate3d = function(x,y,z,a){
        return 'rotate3d('+x+','+y+','+z+','+a+'deg) ';
    }
    var toTrans2d = function(x,y){
        var str = 'translate('+x+'%,'+y+'%)'
        return str;
    }
    var toRotate2d = function(a){
        return 'rotate('+a+'deg) ';
    }
    var toTrans3dtoScale3d = function(arr1,arr2){

        return 'translate3d('+arr1[0]+'%,'+arr1[1]+'%,'+arr1[2]+'%) scale3d('+arr2[0]+','+arr2[1]+','+arr2[2]+') ';
    }
    return {
        motion : _motion
    }
})(jQuery);
