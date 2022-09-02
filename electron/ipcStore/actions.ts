import { Action } from "../../commons/Action"
import { AppWindowTypes } from "../../commons/AppWindowTypes"

export const closeWindow: (view: AppWindowTypes) => Action = (view) => ({ type: `electron/closeWindow`, payload: view })
export const openWindow: (view: AppWindowTypes) => Action = (view) => ({ type: `electron/openWindow`, payload: view })
