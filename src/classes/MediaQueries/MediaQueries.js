
class MediaQueries{
  static lowResQuery() {
    const lowResMedia = "(-webkit-max-device-pixel-ratio: 1.99) and (min-width: 25em), (max-resolution: 191dpi) and (min-width: 25em)";
    return window.matchMedia(lowResMedia);
  }

  static phoneMediumQuery() {
    const phoneMediumMedia = "(-webkit-min-device-pixel-ratio: 2) and (min-width: 23em), (min-resolution: 192dpi) and (min-width: 23em)";
    return window.matchMedia(phoneMediumMedia);
  }

  static phoneLargeQuery() {
    const phoneLargeMedia = "(-webkit-min-device-pixel-ratio: 2) and (min-width: 25em), (min-resolution: 192dpi) and (min-width: 25em)";
    return window.matchMedia(phoneLargeMedia);
  }

  static tabletPortraitQuery() {
    const tabletPortraitMedia = "(-webkit-min-device-pixel-ratio: 2) and (min-width: 37.5em), (min-resolution: 192dpi) and (min-width: 37.5em)";
    return window.matchMedia(tabletPortraitMedia);
  }

  static tabletLandscapeQuery() {
    const tabletLandscapeMedia = "(-webkit-min-device-pixel-ratio: 2) and (min-width: 54em), (min-resolution: 192dpi) and (min-width: 54em)";
    return window.matchMedia(tabletLandscapeMedia);
  }

  static desktopQuery() {
    const desktopMedia = "(-webkit-min-device-pixel-ratio: 2) and (min-width: 78em), (min-resolution: 192dpi) and (min-width: 78em)";
    return window.matchMedia(desktopMedia);
  }

  static desktopWideQuery() {
    const desktopWideMedia = "(-webkit-min-device-pixel-ratio: 2) and (min-width: 110em), (min-resolution: 192dpi) and (min-width: 110em)";
    return window.matchMedia(desktopWideMedia);
  }

  static bitPanelSizeMultiplier() {
    const lowResMediaQuery = this.lowResQuery();
    const phoneMediumQuery = this.phoneMediumQuery();
    const phoneLargeQuery = this.phoneLargeQuery();
    const tabletPortraitQuery = this.tabletPortraitQuery();
    const tabletLandscapeQuery = this.tabletLandscapeQuery();
    const desktopQuery = this.desktopQuery();
    const desktopWideQuery = this.desktopWideQuery();

    let sizeMultiplier = 1;

    if (lowResMediaQuery.matches) {
      sizeMultiplier = 1.4;
    }
    if (phoneMediumQuery.matches) {
      sizeMultiplier = 1.06;
    }
    if (phoneLargeQuery.matches) {
      sizeMultiplier = 1.12;
    }
    if (tabletPortraitQuery.matches) {
      sizeMultiplier = 1.4;
    }
    if (tabletLandscapeQuery.matches) {
      sizeMultiplier = 1.5;
    }
    if (desktopQuery.matches) {
      sizeMultiplier = 1.6;
    }
    if (desktopWideQuery.matches) {
      sizeMultiplier = 1.8;
    }

    return sizeMultiplier;
  }
}

export default MediaQueries;
