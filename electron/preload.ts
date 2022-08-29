import {contextBridge} from 'electron';
import { createIpcStoreMiddleware } from './ipcStore';

contextBridge.exposeInMainWorld('ipcStoreMiddleware', createIpcStoreMiddleware())
