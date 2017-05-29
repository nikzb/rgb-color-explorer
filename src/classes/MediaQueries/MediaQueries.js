
class MediaQueries{
  static lowResQuery() {
    const lowResMedia = "(-webkit-max-device-pixel-ratio: 1.99) and (min-width: 25em), (max-resolution: 191dpi) and (min-width: 25em)";
    return window.matchMedia(lowResMedia);
  }

  static phoneLargeQuery() {
    const phoneLargeMedia = "(-webkit-min-device-pixel-ratio: 2) and (min-width: 25em), (min-resolution: 192dpi) and (min-width: 25em)";
    return window.matchMedia(phoneLargeMedia);
  }
}

export default MediaQueries;
