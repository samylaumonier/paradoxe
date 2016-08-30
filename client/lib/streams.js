// Get streams
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// Stop steams
MediaStream = window.MediaStream;

if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
  MediaStream = webkitMediaStream;
}

if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
  MediaStream.prototype.stop = function() {
    this.getAudioTracks().forEach(function(track) {
      track.stop();
    });

    this.getVideoTracks().forEach(function(track) {
      track.stop();
    });
  };
}
