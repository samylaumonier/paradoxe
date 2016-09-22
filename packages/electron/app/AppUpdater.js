/* eslint-disable no-console */
const app = require('electron').app;
const autoUpdater = require('electron').autoUpdater;
const dialog = require('electron').dialog;
const fs = require('fs');
const path = require('path');
const os = require('os');

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
const feedURL = settings.feedURL;
const updateURL = `${feedURL}/update/${os.platform()}_${os.arch()}/${app.getVersion()}`;

try {
  autoUpdater.setFeedURL(updateURL);
} catch (e) {
  console.error(e);
}

// Daily.
const SCHEDULED_CHECK_INTERVAL = 24 * 60 * 60 * 1000;

class AppUpdater {
  constructor() {
    const self = this;

    if (os.platform() !== 'darwin') {
      return;
    }

    this._onUpdateDownloaded.bind(this);
    this._onUpdateError.bind(this);
    this._onUpdateNotAvailable.bind(this);
    autoUpdater.addListener('update-available', () => {
      console.info('A new update is available');
    });
    autoUpdater.addListener('update-downloaded', (e, releaseNotes, releaseName, releaseDate, updateURL) => {
      console.info('A new update is ready to install', { releaseNotes, releaseName, releaseDate, updateURL });
      self._onUpdateDownloaded();
    });
    autoUpdater.addListener('error', (error) => {
      self._onUpdateError();
      console.error(error);
    });
    autoUpdater.addListener('checking-for-update', () => {
      console.info('checking-for-update');
    });
    autoUpdater.addListener('update-not-available', () => {
      self._onUpdateNotAvailable();
      console.log('update-not-available');
    });

    this.checkForUpdates();
  }

  checkForUpdates(userTriggered /* optional */) {
    // Asking the updater to check while it's already checking may result in an error.
    if (this._checkPending) return;
    this._clearScheduledCheck();
    if (this._updatePending) {
      this._askToApplyUpdate();
      return;
    }

    // this._checkPending = true;
    if (userTriggered) this._userCheckPending = true;
    try {
      autoUpdater.checkForUpdates();
    } catch (e) {
      console.error(e);
    }
  }

  _onUpdateError() {
    this._checkPending = false;
    if (this._userCheckPending) {
      this._userCheckPending = false;

      dialog.showMessageBox({
        type: 'error',
        message: 'An error occurred while checking for updates.',
        buttons: ['Ok'],
      });
    }

    this._scheduleCheck();
  }

  _onUpdateNotAvailable() {
    this._checkPending = false;
    if (this._userCheckPending) {
      this._userCheckPending = false;

      dialog.showMessageBox({
        type: 'info',
        message: 'An update is not available.',
        buttons: ['Ok'],
      });
    }

    this._scheduleCheck();
  }

  _onUpdateDownloaded() {
    this._checkPending = false;
    this._userCheckPending = false;
    this._updatePending = true;
    this._askToApplyUpdate();
  }

  _askToApplyUpdate() {
    const self = this;

    dialog.showMessageBox({
      type: 'question',
      message: 'An update is available! Would you like to quit to install it? The application will then restart.',
      buttons: ['Ask me later', 'Quit and install'],
    }, result => {
      if (result > 0) {
        // Emit the 'before-quit' event since the app won't quit otherwise
        // (https://app.asana.com/0/19141607276671/74169390751974) and the app won't:
        // https://github.com/atom/electron/issues/3837
        const event = {
          _defaultPrevented: false,
          isDefaultPrevented: () => this._defaultPrevented,
          preventDefault: () => {
            this._defaultPrevented = true;
          },
        };

        app.emit('before-quit', event);
        if (event.isDefaultPrevented()) return;

        autoUpdater.quitAndInstall();
      } else {
        self._scheduleCheck();
      }
    });
  }

  _clearScheduledCheck() {
    if (this._scheduledCheck) {
      clearTimeout(this._scheduledCheck);
      this._scheduledCheck = null;
    }
  }

  _scheduleCheck() {
    this._clearScheduledCheck();
    this._scheduledCheck = setTimeout(this.checkForUpdates.bind(this), SCHEDULED_CHECK_INTERVAL);
  }
}

module.exports = new AppUpdater();
