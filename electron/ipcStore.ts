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
  const storage: {[key: string]: any} = {}

  ipcMain.handle("STORAGE_GET", (_: any, key: string) => {
    return storage[key]
  })

  ipcMain.handle("STORAGE_SET", (_: any, key: string, value: string | null) => {
    storage[key] = value
  })

  ipcMain.handle("STORAGE_DEL", (_: any, key: string) => {
    delete storage[key]
  })

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
      console.log(action)
      if(!action.IPC && !action.type.startsWith("persist/")) {
        ipcRenderer.send(IPC_ACTION, action)
      }
      next(action);
    }
  }
}

export function createIpcStoreClient() {
  const { ipcRenderer } = require('electron')

  return {
    getItem: async (key: string): Promise<string> => {
      return await ipcRenderer.invoke("STORAGE_GET", key)
    },
    setItem: async (key: string, item: string): Promise<void> => {
      return await ipcRenderer.invoke("STORAGE_SET", key, item)
    },
    removeItem: async (key: string): Promise<void> => {
      return await ipcRenderer.invoke("STORAGE_DEL", key)
    },
  }
}
