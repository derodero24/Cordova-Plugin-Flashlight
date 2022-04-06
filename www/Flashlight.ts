declare const cordova: {
  exec: (
    successCallback: (_: any) => void,
    errorCallback: () => void,
    pluginName: string,
    actionName: string,
    options: any[]
  ) => void;
  addConstructor: (installer: () => void) => void;
};

declare const window: any;

class Flashlight {
  _isSwitchedOn: boolean;

  constructor() {
    this._isSwitchedOn = false;
  }

  available(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      cordova.exec(
        (result: number) => resolve(result ? true : false),
        () => reject(),
        'Flashlight',
        'available',
        []
      );
    });
  }

  isSwitchedOn(): boolean {
    return this._isSwitchedOn;
  }

  switchOn(options?: object): Promise<void> {
    let opts = options || {};
    return new Promise((resolve, reject) => {
      cordova.exec(
        () => {
          this._isSwitchedOn = true;
          resolve();
        },
        reject,
        'Flashlight',
        'switchOn',
        [opts]
      );
    });
  }

  switchOff(): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(
        () => {
          this._isSwitchedOn = false;
          resolve();
        },
        reject,
        'Flashlight',
        'switchOff',
        []
      );
    });
  }

  toggle(options?: object): Promise<void> {
    if (this._isSwitchedOn) {
      return this.switchOff();
    } else {
      return this.switchOn(options);
    }
  }
}

// plugin installer
cordova.addConstructor(() => {
  if (!window.plugins) {
    window.plugins = {};
  }
  window.plugins.flashlight = new Flashlight();
  return window.plugins.flashlight;
});
