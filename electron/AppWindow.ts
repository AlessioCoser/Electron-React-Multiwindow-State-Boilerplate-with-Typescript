import { app, BrowserWindow } from "electron";
import * as path from 'path';
import { Action } from "../commons/Action";
import { AppWindowTypes } from "../commons/AppWindowTypes";

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
        preload: path.join(app.getAppPath(), 'preload.js')
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
      window.loadFile(path.join(app.getAppPath(), 'index.html'), { hash: `/${view}` })
    }
  }
}