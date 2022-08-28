import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: Electron.BrowserWindow | null;

function openDevTools(window: BrowserWindow) {
  if(process.env.NODE_ENV === 'dev') {
    window.webContents.openDevTools();
  }
}

function loadView(window: BrowserWindow, view: string) {
  if(process.env.NODE_ENV === 'dev' && !process.env.NO_DEV_SERVER) {
    const port = process.env.PORT || 3000
    window.loadURL(`http://localhost:${port}#/${view}`)
  } else {
    window.loadFile(path.join(__dirname, 'index.html'), { hash: `/${view}` })
  }
}

function createWindow(view: string) {
  // Create the browser window.electron
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // const index = url.pathToFileURL(path.join(__dirname, "index.html?window=main"))
  // mainWindow.loadURL(index.toString());
  // mainWindow.loadURL("http://localhost:3000?view=main")
  // mainWindow.loadFile(path.join(__dirname, 'index.html'), { query: { view: 'main' }})
  loadView(mainWindow, view)
  openDevTools(mainWindow)

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.maximize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow('main');
  createWindow('browser');
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
  if (mainWindow === null) {
    createWindow('main');
    createWindow('browser');
  }
});

