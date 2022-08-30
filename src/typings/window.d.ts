/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface IpcAction {
  type: string,
  payload: any,
  IPC: boolean?
}

declare global {
  interface Window {
    ipcStoreMiddleware: (store: any) => (next: any) => (action: IpcAction) => void,
    createIpcStoreClient: () => Storage
  }
}
