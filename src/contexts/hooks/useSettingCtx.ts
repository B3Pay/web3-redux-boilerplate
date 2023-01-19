import { colors } from "@mui/material"
import { ColorRange, Colors } from "contexts/models/setting"
import { RootState } from "contexts/store"
import { useMemo } from "react"
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

export const useThemeColorRange = (range: ColorRange = 700): Colors => {
  const color = useThemeColor()

  return useMemo(
    () => (color === "white" ? color : colors[color][range]),
    [color, range]
  )
}
