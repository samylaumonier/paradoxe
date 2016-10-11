import { browserHistory } from 'react-router';

export function notify(title, options) {
  if (Notification.permission === "granted") {
    newNotification(title, options);
  }
    
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        newNotification(title, options);
      }
    });
  }
}

function newNotification(title, options) {
  let notification = new Notification(title, options);
  notification.onclick = function (event) {
    if (options.location){
      browserHistory.push(options.location);
    }
  }
}
