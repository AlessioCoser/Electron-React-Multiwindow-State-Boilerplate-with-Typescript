import { Action } from "../../commons/Action"
import { WindowsManager } from "../WindowsManager"
import { IPC_ACTION } from "./actions";

export function createIpcStoreServer(windowsManager: WindowsManager, onElectronActions: (action: Action) => void) {
  const { ipcMain } = require("electron")

  ipcMain.on(IPC_ACTION, (event, action: Action) => {
    const originWindow = (event.sender as any).getOwnerBrowserWindow()

    windowsManager.broadcast(originWindow.id, IPC_ACTION, action)

    if(action.type.startsWith("electron/")) {
      onElectronActions(action)
    }
  });
}