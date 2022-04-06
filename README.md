# Cordova Flashlight / Torch plugin

1. [Description](https://github.com/derodero24/Cordova-Plugin-Flashlight2#1-description)
2. [Installation](https://github.com/derodero24/Cordova-Plugin-Flashlight2#2-installation)
3. [Usage](https://github.com/derodero24/Cordova-Plugin-Flashlight2#3-usage)
4. [Credits](https://github.com/derodero24/Cordova-Plugin-Flashlight2#4-credits)

## 1. Description

This is a fork of [EddyVerbruggen/Flashlight-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin)

This plugin allows you to switch the flashlight / torch of the device on and off.

- Works on iOS 5+
- Works on Android 2+
- Android 6+ runtime permissions are handled automatically
- Works on WP8
- Depends on capabilities of the device, so you can test it with an API call
- Compatible with [Cordova Plugman](https://github.com/apache/cordova-plugman)
- Pending review at [PhoneGap Build](https://build.phonegap.com/plugins)

## 2. Installation

```
$ cordova plugin add https://github.com/derodero24/Cordova-Plugin-Flashlight2
```

### PhoneGap Build

Flashlight works with PhoneGap build too! Compatible with PhoneGap 3.0.0 and up.
Just add the following xml to your `config.xml` to always use the latest version of this plugin:

```xml
<gap:plugin name="cordova-plugin-flashlight2" source="npm" />
```

## 3. Usage

Since version 3.2.0 of this plugin you can pass in an `intensity` property
which needs to be anywhere between 0.0 and 1.0. **Only** on iOS this will affect the
brightness of the torch.

```javascript
const flashlightPlugin = window.plugins.flashlight;

flashlightPlugin.available().then(result => {
  if (result) {
    // If available, switch the light on.
    flashlightPlugin
      .switchOn({ intensity: 0.3 }) // optional as well
      .then(() => {
        // If successful, switch off after 3 seconds.
        setTimeout(() => {
          flashlightPlugin.switchOff();
        }, 3000);
      })
      .catch(() => {
        // If it fails, show alert.
        alert('Cannot switch the light on.');
      });
  } else {
    alert('Flashlight not available on this device.');
  }
});
```

As an alternative to `switchOn` and `switchOff`, you can use the `toggle` function

```javascript
window.plugins.flashlight
  .toggle(
    { intensity: 0.3 } // optional as well, used on iOS when switching on
  )
  .then(() => {}) // optional success callback
  .catch(() => {}); // optional error callback
```

To know if the flashlight is on or off you can call `isSwitchedOn`

```javascript
window.plugins.flashlight.isSwitchedOn(); // returns true/false
```

A hint for `Android developers`: you'll want to make sure the torch is switched off when the app is exited via the backbutton.
Otherwise, the camera may be locked so it can't be used by other apps:

```javascript
document.addEventListener(
  'backbutton',
  // pass exitApp as callbacks to the switchOff method
  () => window.plugins.flashlight.switchOff().finally(exitApp),
  false
);

function exitApp() {
  navigator.app.exitApp();
}
```

## 4. CREDITS

- This plugin was streamlined and enhanced for Plugman / PhoneGap Build by [Eddy Verbruggen](http://www.x-services.nl).
- The Android code was inspired by the [PhoneGap Torch plugin](https://github.com/phonegap/phonegap-plugins/tree/DEPRECATED/Android/Torch).
- Thanks to [HuaHub](https://github.com/HuaHub) for [making me fix a camera lock issue on Android](https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin/issues/3).
- The iOS code was inspired by [Tom Schreck](https://github.com/tomschreck/iOS-Torch-Plugin).
