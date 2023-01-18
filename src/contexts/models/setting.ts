import { createModel } from "@rematch/core"
import { RootModel } from "../store"
import { SnackBarType, Translate } from "../types/setting"

export type ConnectModalType = {
  open: boolean
  tab?: string
}

export type DefaultSettingState = {
  showSnackBar: boolean
  showDetails: boolean
  showAddress: boolean
  modal: boolean
  connectModal: ConnectModalType
  snackbar: SnackBarType
}

const defaultState: DefaultSettingState = {
  showSnackBar: false,
  showDetails: false,
  showAddress: true,
  modal: false,
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
    SET_TRANSLATE: (state, translate: Translate) => ({
      ...state,
      loading: false,
      translate,
    }),
    SHOW_SNACKBAR: (state, showSnackBar: boolean) => {
      return {
        ...state,
        showSnackBar,
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
    async setModal(modal: boolean) {
      dispatch.settings.SET_MODAL(modal)
    },
    async setSnackBar(snackbar: SnackBarType) {
      dispatch.settings.SET_SNACKBAR(snackbar)
    },
    async setTranslate(translate: Translate) {
      dispatch.settings.SET_TRANSLATE(translate)
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
