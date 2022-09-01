const STORAGE = { GET: "STORAGE_GET", SET: "STORAGE_SET", DEL: "STORAGE_DEL" }

export function startIpcStateStorage() {
  const { ipcMain } = require("electron")
  const storage: {[key: string]: any} = {}

  ipcMain.handle(STORAGE.GET, (_: any, key: string) => {
    return storage[key]
  })

  ipcMain.handle(STORAGE.SET, (_: any, key: string, value: string | null) => {
    storage[key] = value
  })

  ipcMain.handle(STORAGE.DEL, (_: any, key: string) => {
    delete storage[key]
  })
}

export function createIpcStateStorageClient() {
  const { ipcRenderer } = require('electron')

  return {
    getItem: async (key: string): Promise<string> => {
      return await ipcRenderer.invoke(STORAGE.GET, key)
    },
    setItem: async (key: string, item: string): Promise<void> => {
      return await ipcRenderer.invoke(STORAGE.SET, key, item)
    },
    removeItem: async (key: string): Promise<void> => {
      return await ipcRenderer.invoke(STORAGE.DEL, key)
    }
  }
}
