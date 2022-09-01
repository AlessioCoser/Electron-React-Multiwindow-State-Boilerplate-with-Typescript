import { app } from 'electron';
import { createIpcStoreServer } from './ipcStore/createIpcStoreServer';
import { startIpcStateStorage } from './ipcStore/stateStorage';
import { WindowsManager } from './windows/WindowsManager';

const windowsManager = new WindowsManager()

app.on('ready', () => {
  startIpcStateStorage()
  createIpcStoreServer(windowsManager)

  windowsManager.create('increment', {width: 400, height: 400})
});

app.on('activate', () => {
  if (windowsManager.allClosed()) {
    windowsManager.create('increment', {width: 400, height: 400})
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

