import { app, BrowserWindow } from "electron";
import * as path from 'path';

export type AppWindowProps = {
  width: number,
  height: number
}

export class AppWindow {
  private _view: string
  private _window: BrowserWindow | null = null

  constructor(view: string, {width, height}: AppWindowProps, onClosed: () => void) {
    this._view = view
    this._window = new BrowserWindow({
      width,
      height,
      webPreferences: {
        preload: path.join(app.getAppPath(), 'preload.js')
      },
    });
    this._loadView(this._window, view)
    this._openDevTools(this._window)

    this._window.on('closed', () => {
      this._window = null
      onClosed()
    });
  }

  public name(): string {
    return this._view
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

  private _loadView(window: BrowserWindow, view: string) {
    if(process.env.NODE_ENV === 'development' && !process.env.NO_DEV_SERVER) {
      const port = process.env.PORT || 3000
      window.loadURL(`http://localhost:${port}#/${view}`)
    } else {
      window.loadFile(path.join(app.getAppPath(), 'index.html'), { hash: `/${view}` })
    }
  }
}