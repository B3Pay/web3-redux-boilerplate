import { createModel } from "@rematch/core"
import { RootModel } from "../store"
import {
  ColorKeys,
  ConnectModalType,
  DefaultSettingState,
  SnackBarType,
} from "../types/setting"

const defaultState: DefaultSettingState = {
  showSnackBar: false,
  showDetails: false,
  showAddress: true,
  modal: false,
  theme: {
    mode: "system",
    color: "blue",
  },
  connectModal: {
    open: false,
    tab: undefined,
  },
  snackbar: {
    message: "",
  },
}

const setting = createModel<RootModel>()({
  name: "setting",
  state: defaultState,
  reducers: {
    SET_MODAL: (state, modal: boolean) => ({
      ...state,
      modal,
    }),
    SET_CONNECT_MODAL: (state, connectModal: ConnectModalType) => ({
      ...state,
      connectModal,
    }),
    SET_SNACKBAR: (state, snackbar: SnackBarType) => ({
      ...state,
      snackbar,
      showSnackBar: true,
    }),
    SHOW_SNACKBAR: (state, showSnackBar: boolean) => {
      return {
        ...state,
        showSnackBar,
      }
    },
    SET_THEME_COLOR: (state, color: ColorKeys) => {
      return {
        ...state,
        theme: {
          ...state.theme,
          color,
        },
      }
    },
    SET_THEME_MODE: (state, mode: "dark" | "light" | "system") => {
      return {
        ...state,
        theme: {
          ...state.theme,
          mode,
        },
      }
    },
    SHOW_ADDRESS: (state) => {
      return {
        ...state,
        showAddress: !state.showAddress,
      }
    },
    SHOW_DETAILS: (state) => {
      return {
        ...state,
        showDetails: !state.showDetails,
      }
    },
  },

  effects: (dispatch) => ({
    async setThemeMode() {
      const savedMode = localStorage.getItem("themeMode")
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)")

      if (savedMode) {
        dispatch.settings.SET_THEME_MODE(
          savedMode as "dark" | "light" | "system"
        )
      } else if (prefersDarkMode.matches) {
        dispatch.settings.SET_THEME_MODE("dark")
      } else {
        dispatch.settings.SET_THEME_MODE("light")
      }
    },
    async setModal(modal: boolean) {
      dispatch.settings.SET_MODAL(modal)
    },
    async setSnackBar(snackbar: SnackBarType) {
      dispatch.settings.SET_SNACKBAR(snackbar)
    },
    async setShowSnackBar(showSnackBar: boolean) {
      dispatch.settings.SHOW_SNACKBAR(showSnackBar)
    },
    async setShowAddress() {
      dispatch.settings.SHOW_ADDRESS()
    },
    async setShowDetails() {
      dispatch.settings.SHOW_DETAILS()
    },
  }),
})

export default setting
