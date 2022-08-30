const IPC_ACTION = "IPC_ACTION"
export type Action = {type: string, payload: any}

function electronHandler(action: Action, onAction: (action: Action) => void) {
  const [prefix, type] = action.type.split("/")
  if(prefix !== "electron") {
    return
  }
  onAction({ type: type, payload: action.payload })
}

export function broadcastElectronAction(windows: {[key: string]: any}, action: Action) {
  for (let key of Object.keys(windows)) {
    const win = windows[key]
    win.webContents.send(IPC_ACTION, { type: `electron/${action.type}`, payload: action.payload })
  }
}

export function createIpcStore(windows: {[key: string]: any}, onElectronActions: (action: Action) => void) {
  const { ipcMain } = require("electron")

  ipcMain.on(IPC_ACTION, (event, action: Action) => {
    const originWindow = (event.sender as any).getOwnerBrowserWindow()

    electronHandler(action, onElectronActions)

    for (let key of Object.keys(windows)) {
      const win = windows[key]
      // Loose equals is intended, idk why Electron does this uh.
      if (win.id !== originWindow.id) {
        win.webContents.send(IPC_ACTION, action)
      }
    }
  });
}

export function createIpcStoreMiddleware() {
  const { ipcRenderer } = require('electron')

  return (store: any) => {
    ipcRenderer.on(IPC_ACTION, (_: any, action: Action) => {
      store.dispatch({ ...action, IPC: true })
    })
    return (next: any) => (action: any) => {
      if(!action.IPC) {
        ipcRenderer.send(IPC_ACTION, action)
      }
      next(action);
    }
  }
}