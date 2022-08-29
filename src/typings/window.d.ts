/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface IpcAction {
  type: string,
  payload: any,
  IPC: boolean?
}

export default interface IpcStore {
  listen: (dispatch: (action: IpcAction) => void) => void,
  middleware: (_: any) => (next: any) => (action: any) => void
}

declare global {
  interface Window {
    ipcStore: IpcStore,
  }
}
