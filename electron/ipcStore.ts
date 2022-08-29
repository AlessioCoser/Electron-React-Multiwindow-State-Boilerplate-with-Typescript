const IPC_ACTION = "IPC_ACTION"

export function createIpcStore() {
  const { ipcMain, BrowserWindow } = require("electron")

  ipcMain.on(IPC_ACTION, (event, action: {type: string, payload: any}) => {
    const originWindow = (event.sender as any).getOwnerBrowserWindow()
    const windows = BrowserWindow.getAllWindows()

    for (let win of windows)
      // Loose equals is intended, idk why Electron does this uh.
      if (win.id !== originWindow.id) {
        win.webContents.send(IPC_ACTION, action)
      }
  });
}

export function createIpcStoreMiddleware() {
  const { ipcRenderer } = require('electron')

  return (store: any) => {
    ipcRenderer.on(IPC_ACTION, (_: any, action: {type: string, payload: any}) => {
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