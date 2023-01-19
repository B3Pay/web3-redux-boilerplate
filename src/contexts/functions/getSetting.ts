import { colors } from "@mui/material"
import { ColorKeys, ColorPaletteKeys } from "contexts/types/setting"

export const ALLCOLORS = Object.entries(colors).filter(
  ([key]) => !["grey", "common"].includes(key)
) as [ColorKeys, { [key in ColorPaletteKeys]: string }][]

export function getAllThemeColorsByRange(range: ColorPaletteKeys = 700) {
  return ALLCOLORS.reduce((acc, [name, value]) => {
    const color = value[range]
    return [...acc, { name, color }]
  }, [] as { name: ColorKeys; color: string }[])
}
