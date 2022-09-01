import { AppWindow, AppWindowProps } from "./AppWindow";

export class WindowsManager {
  private _windows: AppWindow[] = []

  create(view: string, props: AppWindowProps) {
    this._windows.push(new AppWindow(view, props, () => this.onClose(view)))
  }

  get(view: string): AppWindow | null {
    return this._windows.find((win) => win.name() === view)
  }

  private onClose(view: string) {
    const index = this._windows.findIndex((win) => win.name() === view)
    if(index > -1) {
      delete this._windows[index]
    }
  }
}