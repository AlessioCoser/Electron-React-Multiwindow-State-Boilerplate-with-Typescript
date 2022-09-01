import { Action } from "../../commons/Action";
import { AppWindowTypes } from "../../commons/AppWindowTypes";
import { AppWindow, AppWindowProps } from "./AppWindow";

export class WindowsManager {
  private _windows: AppWindow[] = []
  private _onCloseListener: (window: AppWindow) => void

  onClose(listener: (window: AppWindow) => void = () => {}) {
    this._onCloseListener = listener
  }

  create(view: AppWindowTypes, props: AppWindowProps) {
    this._windows.push(new AppWindow(view, props, (window) => this._close(window)))
  }

  close(view: AppWindowTypes) {
    this._close(this.get(view))
  }

  get(view: AppWindowTypes): AppWindow | undefined {
    return this._windows.find((win) => win.name === view)
  }

  allClosed(): boolean {
    return this._windows.length === 0
  }

  broadcast(fromId: number, eventName: string, action: Action) {
    this._windows?.forEach((win: AppWindow) => {
      if (win.id !== fromId) {
        win.send(eventName, action)
      }
    })
  }

  private _close(window: AppWindow | undefined) {
    if(window) {
      this._onCloseListener(window)
      window.destroy()
      this._windows = this._windows.filter((win) => win.name !== window.name)
    }
  }
}