import { app, BrowserWindow } from 'electron';
import { Action, broadcastElectronAction, createIpcStore } from './ipcStore';
import * as path from 'path';

let window: Electron.BrowserWindow | null;

function openDevTools(window: BrowserWindow) {
  if(process.env.NODE_ENV === 'development') {
    window.webContents.openDevTools();
  }
}

function loadView(window: BrowserWindow, view: string) {
  if(process.env.NODE_ENV === 'development' && !process.env.NO_DEV_SERVER) {
    const port = process.env.PORT || 3000
    window.loadURL(`http://localhost:${port}#/${view}`)
  } else {
    window.loadFile(path.join(app.getAppPath(), 'index.html'), { hash: `/${view}` })
  }
}

const windows: {[key: string]: BrowserWindow} = {}

function destroyWindow(view: string) {
  windows[view].destroy()
}

function createWindow(view: string) {
  // Create the browser window.electron
  windows[view] = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
    },
  });

  // const index = url.pathToFileURL(path.join(__dirname, "index.html?window=main"))
  // mainWindow.loadURL(index.toString());
  // mainWindow.loadURL("http://localhost:3000?view=main")
  // mainWindow.loadFile(path.join(__dirname, 'index.html'), { query: { view: 'main' }})
  loadView(windows[view], view)
  openDevTools(windows[view])

  // Emitted when the window is closed.
  windows[view].on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    delete windows[view]
    broadcastElectronAction(windows, { type: "closeDecrementWindow", payload: undefined })
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createIpcStore(windows, (action: Action) => {
    switch (action.type) {
      case "openDecrementWindow":
        createWindow("decrement");
        break;
      case "closeDecrementWindow":
        destroyWindow("decrement");
        break;
    }
  })

  createWindow('increment');
  // createWindow('browser');
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (window === null) {
    createWindow('main');
    createWindow('browser');
  }
});

