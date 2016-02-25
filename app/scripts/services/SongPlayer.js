(function () {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        /**
        * @desc stores the current album object from Fixtures service
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
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
                    SongPlayer.currentSong.playing = null;
                }
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
                SongPlayer.currentSong = song;
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
        * @function getSongIndex
        * @desc takes a song and returns the index of the song in the current album
        * @param {Object} song
        * @return {Number} indexOf(song)
        */
        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);  
        };
        /**
        * @desc SongPlayer.song object from Fixtures.js
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        /**
        * @function SongPlayer.play
        * @desc sets and plays song 
        * @param {Object} song
        */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /** 
        * @function SongPlayer.previous
        * @desc will start playing the previous song in the album
        */
        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
                SongPlayer.currentSong = null;
                currentBuzzObject = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', ["Fixtures", SongPlayer]);
})();