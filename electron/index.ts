import { app } from 'electron';
import { Action } from '../commons/Action';
import { AppWindow } from './AppWindow';
import { CloseDecrementWindowAction, IPC_ACTION } from './ipcStore/actions';
import { createIpcStoreServer } from './ipcStore/createIpcStoreServer';
import { startIpcStateStorage } from './ipcStore/stateStorage';
import { WindowsManager } from './WindowsManager';

const windowsManager = new WindowsManager()

windowsManager.onClose((window: AppWindow) => {
  if(window.name === 'decrement') {
    windowsManager.broadcast(window.id, IPC_ACTION, CloseDecrementWindowAction)
  }
})

app.on('ready', () => {
  startIpcStateStorage()
  createIpcStoreServer(windowsManager, (action: Action) => {
    switch (action.type) {
      case "electron/openDecrementWindow":
        windowsManager.create('decrement', {width: 400, height: 400})
        break;
      case "electron/closeDecrementWindow":
        windowsManager.close("decrement");
        break;
    }
  })

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

