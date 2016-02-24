(function () {
    function SongPlayer() {
        var SongPlayer = {};
        /**
        * @desc song object from Fixtures.js
        * @type {Object}
        */
        var currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        **/
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        **/
        var setSong = function (song) {
            if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    currentSong.playing = null;
                }
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
                currentSong = song;
        };
        /**
        * @function playSong
        * @desc plays the curentBuzzObject and sets .playing property of song to true
        * @param {Object} song
        **/
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        /**
        * @function SongPlay.play
        * @desc sets and plays song 
        * @param {Object} song
        */
        SongPlayer.play = function (song) {
            
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                   playSong(song);
                }
            }
        };
        /** 
        * @function SongPlayer.pause
        * @desc pauses the currently playing song (param)
        * @param {Object} song
        */
        SongPlayer.pause = function (song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
            
        return SongPlayer;
    }
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();