import {contextBridge} from 'electron';
import { createIpcStoreClient } from './ipcStore';

contextBridge.exposeInMainWorld('ipcStore', createIpcStoreClient())
