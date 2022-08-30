import { contextBridge } from 'electron';
import { createIpcStoreClient, createIpcStoreMiddleware } from './ipcStore';

contextBridge.exposeInMainWorld('ipcStoreMiddleware', createIpcStoreMiddleware())
contextBridge.exposeInMainWorld('createIpcStoreClient', createIpcStoreClient)
