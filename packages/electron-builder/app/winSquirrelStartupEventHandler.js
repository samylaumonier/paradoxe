/* eslint-disable no-console */
const app = require('electron').app; // Module to control application life.
const spawn = require('child_process').spawn;
const path = require('path');

const _ = require('lodash');
require('electron-debug')({ showDevTools: false });

function run(args, done) {
  const updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
  const child = spawn(updateDotExe, args, { detached: true });
  child.on('close', done);
}

const handleStartupEvent = () => {
  var result = false;

  if (process.platform !== 'win32') return false;

  const squirrelCommand = process.argv[1];
  const target = path.basename(process.execPath);
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      console.info('SQUIRREL INSTALL/UPDATE');
      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Always quit when done
      run(['--createShortcut', target], app.quit);
      result = true;
      break;
    case '--squirrel-uninstall':
      console.info('SQUIRREL UNINSTALL');

      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Always quit when done
      run(['--removeShortcut', target], app.quit);
      app.quit();
      result = true;
      break;
    case '--squirrel-obsolete':
      console.info('SQUIRREL OBSOLETE');
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      result = true;
      break;
    default:
      result = false;
  }
  return result;
};

module.exports = handleStartupEvent;
