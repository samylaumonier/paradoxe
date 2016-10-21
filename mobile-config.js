App.accessRule('https://paradoxe.io');

App.info({
  id: 'io.paradoxe',
  name: 'Paradoxe',
  description: 'Multi platform chat application',
  author: 'Paradoxe',
  email: 'contact@paradoxe.io',
  website: 'https://paradoxe.io',
  version: '0.0.4'
});

//App.icons({
//  // iOS
//  'iphone_2x': 'resources/icons/apple-touch-icon-120x120.png',
//  'iphone_3x': 'resources/icons/apple-touch-icon-180x180.png',
//  'ipad': 'resources/icons/apple-touch-icon-76x76.png',
//  'ipad_2x': 'resources/icons/apple-touch-icon-152x152.png',
//  'ipad_pro': 'resources/icons/apple-touch-icon-167x167.png',
//
//  'ios_settings': 'resources/icons/apple-touch-icon-29x29.png',//(29x29)
//  'ios_settings_2x': 'resources/icons/apple-touch-icon-58x58.png',//(58x58)
//  'ios_settings_3x': 'resources/icons/apple-touch-icon-87x87.png',//(87x87)
//  'ios_spotlight': 'resources/icons/apple-touch-icon-40x40.png',//(40x40)
//  'ios_spotlight_2x': 'resources/icons/apple-touch-icon-80x80.png',//(80x80)
//
//  // Android
//  'android_mdpi': 'resources/icons/android-chrome-48x48.png',
//  'android_hdpi': 'resources/icons/android-chrome-72x72.png',
//  'android_xhdpi': 'resources/icons/android-chrome-96x96.png',
//  'android_xxhdpi': 'resources/icons/android-chrome-144x144.png',
//  'android_xxxhdpi': 'resources/icons/android-chrome-192x192.png'
//});
//
//App.launchScreens({
//  // iOS
//  'iphone_2x':'resources/splash/splash_640x960.png',  //(640x960),
//  'iphone5': 'resources/splash/splash_640x1136.png', //(640x1136),
//  'iphone6': 'resources/splash/splash_750x1334.png', //(750x1334),
//  'iphone6p_portrait': 'resources/splash/splash_1242x2208.png', //(1242x2208)
//  'iphone6p_landscape': 'resources/splash/splash_landscape_2208x1242.png', //(2208x1242),
//  'ipad_portrait': 'resources/splash/splash_768x1024.png', //(768x1024)
//  'ipad_portrait_2x': 'resources/splash/splash_1536x2048.png', //(1536x2048)
//  'ipad_landscape': 'resources/splash/splash_landscape_1024x748.png', //(1024x768)
//  'ipad_landscape_2x': 'resources/splash/splash_landscape_2048x1536.png', //(2048x1536)
//
//  // Android
//  'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
//  'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
//  'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
//  'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
//  'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
//  'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
//});

App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#bdc3c7');
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.setPreference('StatusBarOverlaysWebView', 'true');
