export class VideoPeer {
  constructor() {
    this.peer = new Peer({
      key: 'hhfk756t8o2prpb9',
      debug: 3
    });

    this.currentCall = null;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  }

  getUserVideo() {
    navigator.getUserMedia({ audio: true, video: true }, stream => {
      $('#myvideo').prop('src', URL.createObjectURL(stream));
      window.localStream = stream;
    }, () => {
      alert('Error! Make sure to click allow when asked for permission by the browser.');
    });
  }

  setPartnerVideo(call) {
    call.on('stream', stream => {
      $('#partnervideo').prop('src', URL.createObjectURL(stream));
    });

    this.currentCall = call;
  }

  callAKey(key) {
    const call = this.peer.call(key, window.localStream);
    this.setPartnerVideo(call);
  }

  hangup() {
    if (this.currentCall) {
      this.currentCall.close();
    }
  }

  bindOnOpen(callback) {
    this.peer.on('open', id => {
      this.getUserVideo();
      callback(id);
    });
  }

  bindOnCall() {
    this.peer.on('call', call => {
      call.answer(window.localStream);
      this.setPartnerVideo(call);
    });
  }

  bindOnError() {
    this.peer.on('error', err => {
      console.log('peer on error', err);
    });
  }

  bindOnClose() {
    this.peer.on('close', err => {
      console.log('peer on close', err);
    });
  }

  bindOnDisconnected() {
    this.peer.on('disconnected', () => {
      console.log('peer on disconnected');
    });
  }

  run({ onOpen }) {
    this.bindOnOpen(onOpen);
    this.bindOnCall();
    this.bindOnError();
    this.bindOnClose();
    this.bindOnDisconnected();
  }
}
