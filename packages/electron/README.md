# meteor-electron

##### This project started as a fork from https://github.com/electron-webapps/meteor-electron. A lot parts have been refactored and simplified, `electron-packager` has been replaced with `electron-builder`.

meteor-electron lets you easily transform your Meteor webapp to a desktop app. Its ultimate goal is
to build `meteor add-platform desktop`.

Some of the things it does:

* automatically builds and launches a desktop application, rebuilding when the native code changes
* defines feature detection APIs and a bridge between web and native code
* wraps `electron-builder` without loosing configuration abilities

![](docs/overview.png)

## Getting Started

`meteor add risetechnologies:electron` (to be done)

meteor-electron will download the Electron binary for your system and build and launch an Electron
app pointing to your local development server. The download process may take a few minutes based on
your Internet connection but only needs to be done once.

The app, as well as the ready-to-distribute binaries (see [Deploy](#deploy)), is built within
`YOUR_PROJECT_DIRECTORY/.meteor-electron`. This allows the apps to be easily located as well as the
builds to be cached for speedier startup. You should add this directory to your `.gitignore`.

## Configuration

Configuration is possible via `Meteor.settings.electron` and `Meteor.settings.electronBuilder`. For example,

```json
  "electron": {
    "name": "meteor electron",
    "author": "risetechnologies",
    "version": "0.0.1",
    "description": "description",
    "maximize": true,
    "windowOptions": {
      "height": 768,
      "width": 1024,
      "frame": true,
      "resizable": true
    }
  },
  "electronBuilder": {
    "autoRun": true,
    "targets": ["CURRENT", "MAC", "WINDOWS"],
    "devMetadata": {
      "build": {
        "win": {
          "target": ["squirrel", "zip"],
          "iconUrl": "https://github.com/foobar/releases/blob/04ca7ce418062f99e7bb37111054bfa516024948/icon.ico?raw=true"
        }
      },
      "directories": {
        "buildResources": "./resources/electron/"
      }
    }
  },
```
## electron

<dl>
  <dt>...</dt>
  <dd>https://github.com/electron-userland/electron-builder/wiki/Options (Application package.json)</dd>
  <dt>rootUrl</dt>
  <dd>defaults to ROOT_URL ENV</dd>
  <dt>feedURL</dt>
  <dd>the url where updates are served from (see https://github.com/GitbookIO/nuts)</dd>
  <dt>maximize</dt>
  <dd>start maximized</dd>
  <dt>windowOptions</dt>
  <dd>options used to ininiate the browser windows (https://github.com/electron/electron/blob/master/docs/api/browser-window.md)</dd>
</dl>

*This file gets saved to project/app/package.json*

## electronBuilder

<dl>
  <dt>targets</dt>
  <dd>["CURRENT", "MAC", "WINDOWS", "LINUX"]</dd>
  <dt>autoRun</dt>
  <dd>should electron be started when a build has run? You should choose ["CURRENT"] as a minimal target set</dd>
  <dt>devMetadata</dt>
  <dd>https://github.com/electron-userland/electron-builder/wiki/Options (Development package.json)</dd>
  <dt>devMetadata.directories.buildResources</dt>
  <dd>relative path from meteor to your build resources</dd>
</dl>

*This file gets saved to project/package.json*

## Electron-specific code

By default, all client web code will be executed in Electron. To include/exclude code use `Electron.isElectron`

```javascript
if (!Electron.isElectron()){
  showModal("Have you considered downloading our Electron app?");
}
```

## Deploying

Hot code push will work to update your app's UI just like it does on the web, since the app is loading the UI
_from_ the web. If you want to update the part of the app that interfaces with the OS, though&mdash;to change
the app icon, to add a menu bar icon, etc.&mdash;you'll need to distribute a new version of the `.app` or
`.exe`. Here's how to do that.

### Building && Autoupdates

Please refer to https://github.com/electron-userland/electron-builder/wiki as this projects tries to let electron-builder to all the heavy lifting. We also advise to use https://github.com/GitbookIO/nuts as an autoupdate server.

## Example

[TODO] link to an example app
[TODO] add proper linting rules
[TODO] release on atmosphere
[TODO] test on windows
[TODO] test on linux
[TODO] enable autorun on linux
[TODO] test if custom appsrc works

## Q&A
### Q: How is this different from https://github.com/electron-webapps/meteor-electron?

We heavily rely on `electron-builder` instead of `electron-packager`. This simplifies the build process as we do not need to care about all the heavily lifting behind it. 

### Q: How is this different from all the other Meteor electron packages?

This package differs from [Electrometeor](https://github.com/sircharleswatson/Electrometeor) and
[Electrify](https://github.com/arboleya/electrify) by *not* baking Meteor into the packaged app.
This makes things significantly simpler, but if you need strong offline support, one of them is a
better solution.

### Q: How can I create new browser windows, set app notifications and all the other awesome native functionality that Electron gives me?

This project selectively exposes such functionality to the client, in a way that is safe and avoids
memory leaks, via the `Electron` module--see [`client.js`](client.js). To request that this module
expose additional functionality, please [submit a pull request](https://github.com/rissem/meteor-electron/pull/new/master)
or [file an issue](https://github.com/rissem/meteor-electron/issues/new).

You may also substitute your own application code for `meteor-electron`'s default application by
setting the `appSrcDir` settings option. `meteor-electron` will continue to package your application
and serve the application update feed and download URLs, but in-app functionality will be your
responsibility.  **Warning**: this responsibility includes setting up your application window and menu,
checking for remote updates, registering the `Electron` module (that defines `Electron.isElectron`),
and possibly other things. If you take this route, it's recommended that you start by copying
`meteor-electron`'s `app` directory.

Also, you also probably want to keep your application code in a subdirectory of your application's
`private` directory so that Meteor will observe changes to it and restart the server; when it does
so, `meteor-electron` will rebuild and relaunch the app.
