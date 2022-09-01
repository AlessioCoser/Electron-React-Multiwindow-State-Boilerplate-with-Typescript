import { Action } from "../../commons/Action"
import { IPC_ACTION } from "./actions"

export function createIpcStoreMiddleware() {
  const { ipcRenderer } = require('electron')

  return (store: any) => {
    ipcRenderer.on(IPC_ACTION, (_: any, action: Action) => {
      store.dispatch({ ...action, IPC: true })
    })
    return (next: any) => (action: any) => {
      if(!action.IPC && !action.type.startsWith("persist/")) {
        ipcRenderer.send(IPC_ACTION, action)
      }
      next(action);
    }
  }
}