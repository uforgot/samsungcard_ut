var easeInExpo = function (t, b, c, d) {
    return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
};
var easeInOutExpo = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
    t--;
    return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};
var easeInCubic = function (t, b, c, d) {
    t /= d;
    return c*t*t*t + b;
};
var easeInOutCubic = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
};
var easeOutCubic = function (t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t + 1) + b;
};
var easeInQuart = function (t, b, c, d) {
    t /= d;
    return c*t*t*t*t + b;
};

var easeInOutQuart = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t + b;
    t -= 2;
    return -c/2 * (t*t*t*t - 2) + b;
};
var linearTween = function (t, b, c, d) {
    return c*t/d + b;
};