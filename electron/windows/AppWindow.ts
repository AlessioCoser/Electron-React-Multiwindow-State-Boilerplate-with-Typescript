import { app, BrowserWindow } from "electron";
import { Action } from "../../commons/Action";
import { AppWindowTypes } from "../../commons/AppWindowTypes";

export type AppWindowProps = {
  width: number,
  height: number
}

export class AppWindow {
  public readonly name: AppWindowTypes
  private _window: BrowserWindow | null = null
  public readonly id: number

  constructor(name: AppWindowTypes, {width, height}: AppWindowProps, onClosed: (view: AppWindow) => void) {
    this._window = new BrowserWindow({
      width,
      height,
      webPreferences: {
        preload: this._serverPath('preload.js')
      },
    });
    this._loadView(this._window, name)
    this._openDevTools(this._window)

    this.name = name
    this.id = this._window?.id

    this._window.on('closed', () => {
      onClosed(this)
      this._window = null
    });
  }

  public send(event: string, action: Action) {
    this._window?.webContents.send(event, action)
  }

  public show() {
    if(!this._window?.isVisible()) {
      this._window?.show()
    }
  }

  public hide() {
    if(this._window?.isVisible()) {
      this._window?.hide()
    }
  }

  public destroy() {
    this._window?.destroy()
    this._window = null
  }

  private _openDevTools(window: BrowserWindow) {
    if(process.env.NODE_ENV === 'development') {
      window.webContents.openDevTools();
    }
  }

  private _loadView(window: BrowserWindow, view: AppWindowTypes) {
    if(process.env.NODE_ENV === 'development' && !process.env.NO_DEV_SERVER) {
      const port = process.env.PORT || 3000
      window.loadURL(`http://localhost:${port}#/${view}`)
    } else {
      window.loadFile(this._clientPath('index.html'), { hash: `/${view}` })
    }
  }

  private _serverPath(file: string): string {
    return `${app.getAppPath()}/build/electron/${file}`
  }

  private _clientPath(file: string): string {
    return `${app.getAppPath()}/build/${file}`
  }
}