import type { colors } from "@mui/material"

export type ColorKeys = Exclude<keyof typeof colors, "common">

export type ColorPalette = typeof colors[ColorKeys]

export type ColorPaletteKeys = keyof ColorPalette

export type ColorRanges = {
  [key in ColorPaletteKeys]: string
}

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
  theme: {
    mode: "dark" | "light" | "system"
    color: ColorKeys
  }
}

export type SnackBarType = {
  title?: string
  severity?: "error" | "warning" | "info" | "success"
  message: string
}
