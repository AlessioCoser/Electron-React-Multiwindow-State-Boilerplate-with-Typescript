import { contextBridge } from 'electron';
import { createIpcStoreMiddleware } from './ipcStore/createIpcStoreMiddleware';
import { createIpcStateStorageClient } from './ipcStore/stateStorage';


contextBridge.exposeInMainWorld('ipcStoreMiddleware', createIpcStoreMiddleware())
contextBridge.exposeInMainWorld('createIpcStoreClient', createIpcStateStorageClient)
