/* eslint-disable no-console */
const app = require('electron').app; // Module to control application life.
const path = require('path');
const fs = require('fs');
const BrowserWindow = require('electron').BrowserWindow; // Module to create native browser window.
const AppUpdater = require('./AppUpdater');
const handleStartupEvent = require('./winSquirrelStartupEventHandler');
const createDefaultMenu = require('./menu.js');
const proxyWindowEvents = require('./proxyWindowEvents');
const _ = require('lodash');
require('electron-debug')({ showDevTools: false });

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));

if (handleStartupEvent()) return;

const windowOptions = _.defaults(settings.windowOptions, {
  width: settings.width || 800,
  height: settings.height || 600,
  resizable: true,
  frame: true,
  title: settings.name,
});


/**
 * Disable Electron's Node integration so that browser dependencies like `moment` will load themselves
 * like normal i.e. into the window rather than into modules, and also to prevent untrusted client
 * code from having access to the process and file system:
 *  - https://github.com/atom/electron/issues/254
 *  - https://github.com/atom/electron/issues/1753
 */
_.set(windowOptions, 'webPreferences.nodeIntegration', false);
_.set(windowOptions, 'webPreferences.preload', path.join(__dirname, 'preload.js'));

// Keep a global reference of the window object so that it won't be garbage collected
// and the window closed.
var mainWindow = null;

// Unfortunately, we must set the menu before the application becomes ready and so before the main
// window is available to be passed directly to `createDefaultMenu`.
createDefaultMenu(app, () => mainWindow, () => AppUpdater.checkForUpdates(true));

const hideInsteadofClose = e => {
  mainWindow.hide();
  e.preventDefault();
};

app.on('ready', () => {
  mainWindow = new BrowserWindow(windowOptions);
  proxyWindowEvents(mainWindow);

  // Hide the main window instead of closing it, so that we can bring it back
  // more quickly.
  mainWindow.on('close', hideInsteadofClose);

  if (settings.maximize) mainWindow.maximize();
  mainWindow.focus();
  mainWindow.loadURL(settings.rootUrl);
});

app.on('before-quit', () => {
  // We need to remove our close event handler from the main window,
  // otherwise the app will not quit.
  mainWindow.removeListener('close', hideInsteadofClose);
});

app.on('activate', () => {
  // Show the main window when the customer clicks on the app icon.
  if (!mainWindow.isVisible()) mainWindow.show();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});