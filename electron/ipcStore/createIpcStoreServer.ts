import { Action } from "../../commons/Action"
import { AppWindow } from "../windows/AppWindow";
import { WindowsManager } from "../windows/WindowsManager"
import { closeWindow } from "./actions";
import { IPC_EVENT } from "./events"

export function createIpcStoreServer(windowsManager: WindowsManager) {
  const { ipcMain } = require("electron")

  ipcMain.on(IPC_EVENT, (event, action: Action) => {
    const originWindow = (event.sender as any).getOwnerBrowserWindow()

    windowsManager.broadcast(originWindow.id, IPC_EVENT, action)

    if(action.type.startsWith("electron/")) {
      switch (action.type) {
        case "electron/openWindow":
          windowsManager.create(action.payload, { width: 400, height: 400 })
          break;
        case "electron/closeWindow":
          windowsManager.close(action.payload);
          break;
        case "electron/showWindow":
          windowsManager.get(action.payload)?.show()
          break;
        case "electron/hideWindow":
          windowsManager.get(action.payload)?.hide()
          break;
      }
    }
  })

  windowsManager.onClose((window: AppWindow) => {
    windowsManager.broadcast(window.id, IPC_EVENT, closeWindow(window.name))
  })
}