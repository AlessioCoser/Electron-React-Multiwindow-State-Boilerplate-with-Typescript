const IPC_ACTION = "IPC_ACTION"

export function createIpcStore() {
  const { ipcMain, BrowserWindow } = require("electron")

  ipcMain.on(IPC_ACTION, (event, action: {type: string, payload: any}) => {
    const originWindow = (event.sender as any).getOwnerBrowserWindow()
    const windows = BrowserWindow.getAllWindows()

    for (let win of windows)
      // Loose equals is intended, idk why Electron does this uh.
      if (win.id !== originWindow.id) {
        console.log(IPC_ACTION, action)
        win.webContents.send(IPC_ACTION, action)
      }
  });
}

export function createIpcStoreClient() {
  const { ipcRenderer } = require('electron')

  return {
    listen: (dispatch: Function) => {
      ipcRenderer.on(IPC_ACTION, (_: any, action: {type: string, payload: any}) => {
        dispatch({ ...action, IPC: true })
      })
    },
    middleware: (_: any) => (next: any) => (action: any) => {
      console.log("action", action);
      if(!action.IPC) {
        ipcRenderer.send(IPC_ACTION, action)
      }
      next(action);
    }
  }
}