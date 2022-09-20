import { Action } from "../../commons/Action"
import { AppWindowTypes } from "../../commons/AppWindowTypes"

const electronAction = (type: string) => ({
  type,
  action(payload: AppWindowTypes): Action {
    return { type, payload }
  }
})

export const closeWindow = electronAction(`electron/closeWindow`)
export const openWindow = electronAction(`electron/openWindow`)
export const showWindow = electronAction(`electron/showWindow`)
export const hideWindow = electronAction(`electron/hideWindow`)