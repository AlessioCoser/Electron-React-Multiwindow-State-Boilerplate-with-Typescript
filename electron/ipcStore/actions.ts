import { Action } from "../../commons/Action"
import { AppWindowTypes } from "../../commons/AppWindowTypes"

export const IPC_ACTION = "IPC_ACTION"
export const closeWindowAction: (view: AppWindowTypes) => Action = (view) => ({ type: `electron/closeWindow`, payload: view })
