(function () {
    function timecode () {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);
            if (Number.isNaN(seconds)) {
                return "- : - -";
            }
            var buzzTime = buzz.toTimer(seconds);
            buzzTime = seconds < 600 ? buzzTime.slice(1) : buzzTime; 
            return buzzTime;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
