import { Action } from "../../commons/Action"
import { AppWindow } from "../windows/AppWindow";
import { WindowsManager } from "../windows/WindowsManager"
import { closeWindow, hideWindow, openWindow, showWindow } from "./actions";
import { IPC_EVENT } from "./events"

export function createIpcStoreServer(windowsManager: WindowsManager) {
  const { ipcMain } = require("electron")

  ipcMain.on(IPC_EVENT, (event, action: Action) => {
    const originWindow = (event.sender as any).getOwnerBrowserWindow()

    windowsManager.broadcast(originWindow.id, IPC_EVENT, action)

    switch (action.type) {
      case openWindow.type:
        windowsManager.create(action.payload, { width: 400, height: 400 })
        break;
      case closeWindow.type:
        windowsManager.close(action.payload);
        break;
      case showWindow.type:
        windowsManager.get(action.payload)?.show()
        break;
      case hideWindow.type:
        windowsManager.get(action.payload)?.hide()
        break;
    }
  })

  windowsManager.onClose((window: AppWindow) => {
    windowsManager.broadcast(window.id, IPC_EVENT, closeWindow.action(window.name))
  })
}