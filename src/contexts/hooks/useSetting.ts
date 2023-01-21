import * as colors from "@mui/material/colors"
import useMediaQuery from "@mui/material/useMediaQuery"
import { RootState } from "contexts/store"
import { ColorRanges } from "contexts/types/setting"
import { useSelector } from "react-redux"

export default function useSetting() {
  return useSelector((state: RootState) => state.setting)
}

export function useConnectModal() {
  return useSelector((state: RootState) => state.setting.connectModal)
}

export function useThemeColor() {
  return useSelector((state: RootState) => state.setting.theme.color)
}

export function useThemeMode() {
  return useSelector((state: RootState) => state.setting.theme.mode)
}

export function useMediaThemeMode() {
  const mode = useThemeMode()
  const system = useMediaQuery("(prefers-color-scheme: dark)")

  return mode === "system" ? (system ? "dark" : "light") : mode
}

export function useThemeColorPalette() {
  const color = useThemeColor()

  return colors[color] as ColorRanges
}
