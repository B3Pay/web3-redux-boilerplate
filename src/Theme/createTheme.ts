import { createTheme } from "@mui/material/styles"
import { ColorRanges } from "contexts/types/setting"

export default function createMuiTheme(
  mode: "light" | "dark",
  palette: ColorRanges
) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: palette[700],
      },
    },
  })
}
