import { createTheme } from "@mui/material/styles"
import { Inter } from "@next/font/google"
import { ColorRanges } from "contexts/types/setting"

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
})

export default function createMuiTheme(
  mode: "light" | "dark",
  palette: ColorRanges
) {
  return createTheme({
    typography: inter.style,
    palette: {
      mode,
      background: {
        default: mode === "light" ? palette[50] : "#121212",
      },
      primary: {
        main: palette[700],
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  })
}
