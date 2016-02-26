(function () {
    function timecode () {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);
            if (Number.isNaN(seconds)) {
                return "- : - -";
            }
            var minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return minutes + ':' + seconds;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
