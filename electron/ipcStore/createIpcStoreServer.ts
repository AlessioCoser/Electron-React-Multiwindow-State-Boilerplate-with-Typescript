import { Action } from "../../commons/Action"
import { AppWindow } from "../windows/AppWindow";
import { WindowsManager } from "../windows/WindowsManager"
import { closeWindowAction, IPC_ACTION } from "./actions";

export function createIpcStoreServer(windowsManager: WindowsManager) {
  const { ipcMain } = require("electron")

  ipcMain.on(IPC_ACTION, (event, action: Action) => {
    const originWindow = (event.sender as any).getOwnerBrowserWindow()

    windowsManager.broadcast(originWindow.id, IPC_ACTION, action)

    if(action.type.startsWith("electron/")) {
      switch (action.type) {
        case "electron/openWindow":
          windowsManager.create(action.payload, {width: 400, height: 400})
          break;
        case "electron/closeWindow":
          windowsManager.close(action.payload);
          break;
      }
    }
  })

  windowsManager.onClose((window: AppWindow) => {
    windowsManager.broadcast(window.id, IPC_ACTION, closeWindowAction(window.name))
  })
}