import { getFirstChainName } from "contexts/functions/getChain"
import { Colors } from "contexts/models/setting"
import store from "../store"
import { SnackBarType, Translate } from "../types/setting"

export const setModal = (modal: boolean) =>
  store.dispatch.setting.SET_MODAL(modal)

export const setThemeColor = (color: Colors) =>
  store.dispatch.setting.SET_THEME_COLOR(color)

export const setThemeMode = (mode: "dark" | "light" | "system") => {
  store.dispatch.setting.SET_THEME_MODE(mode)
}

export const setShowSnackbar = (snackbar: boolean) =>
  store.dispatch.setting.setShowSnackBar(snackbar)

export const setShowAddress = () => store.dispatch.setting.setShowAddress()

export const setShowDetails = () => store.dispatch.setting.setShowDetails()

export const setSnackbar = (props: SnackBarType) =>
  store.dispatch.setting.setSnackBar(props)

export const setTranslate = (translate: Translate) =>
  store.dispatch.setting.setTranslate(translate)

export function setConnectModal(open: boolean, selectedTab?: string) {
  const tab = selectedTab ?? getFirstChainName()
  store.dispatch.setting.SET_CONNECT_MODAL({ open, tab })
}
