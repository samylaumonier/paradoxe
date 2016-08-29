import { Meteor } from 'meteor/meteor';

export class VideoPeer {
  constructor() {
    this.peer = new Peer({
      host: Meteor.settings.public.peer.host,
      port: Meteor.settings.public.peer.port,
      path: Meteor.settings.public.peer.path
    });

    this.currentCall = null;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  }

  getUserVideo(audio = true, video = true, display = true, callback = null) {
    console.log('get my video');
    navigator.getUserMedia({ audio, video }, stream => {
      if (display) {
        $('#my-video').prop('src', URL.createObjectURL(stream));
      }

      window.localStream = stream;
      callback && callback(null);
    }, () => {
      callback && callback('Make sure to click allow when asked for permission by the browser.');
    });
  }

  setPartnerVideo(call) {
    console.log('get partner video');

    call.on('stream', stream => {
      $('#partner-video').prop('src', URL.createObjectURL(stream));
    });

    this.currentCall = call;
  }

  callAKey(key) {
    console.log('call key', key, window.localStream);
    const call = this.peer.call(key, window.localStream);
    console.log(call);
    this.setPartnerVideo(call);
  }

  hangup() {
    console.log('hangup');

    if (this.currentCall) {
      this.currentCall.close();
    }
  }

  bindOnOpen(callback) {
    this.peer.on('open', id => {
      console.log('on open', id);
      callback && callback(id);
    });
  }

  bindOnCall() {
    this.peer.on('call', call => {
      console.log('on call', call);
      call.answer(window.localStream);
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

  run(onOpen = null) {
    this.bindOnOpen(onOpen);
    this.bindOnCall();
    this.bindOnError();
    this.bindOnClose();
    this.bindOnDisconnected();
  }
}
