export function getVideoUserStream(onStream) {
  return () => {
    navigator.getUserMedia({ audio: true, video: true }, stream => {
      onStream(null, stream);
    }, err => {
      onStream(err);
    });
  };
}
