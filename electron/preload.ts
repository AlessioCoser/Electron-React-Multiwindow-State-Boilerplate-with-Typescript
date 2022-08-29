import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('ipcStore', createIpcStoreClient())

function createIpcStoreClient() {
  return {
    listen: (dispatch: Function) => {
      ipcRenderer.on("IPC_ACTION", (_: any, action: {type: string, payload: any}) => {
        dispatch({ ...action, IPC: true })
      })
    },
    middleware: (_: any) => (next: any) => (action: any) => {
      console.log("action", action);
      if(!action.IPC) {
        ipcRenderer.send("IPC_ACTION", action)
      }
      next(action);
    }
  }
}