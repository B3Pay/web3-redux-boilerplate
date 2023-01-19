import { GlobalStyles } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMediaThemeMode, useThemeColorPalette } from "contexts/hooks"
import { useMemo } from "react"

interface ThemeProps {
  children: React.ReactNode
}

const Theme: React.FC<ThemeProps> = ({ children, ...rest }) => {
  const palette = useThemeColorPalette()

  const mode = useMediaThemeMode()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: palette[700],
          },
        },
      }),
    [palette, mode]
  )

  return (
    <ThemeProvider theme={theme} {...rest}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: mode === "dark" ? "#353535" : "#f0f0f0",
            boxSizing: "border-box",
            padding: 0,
            margin: 0,
          },
        }}
      />
      {children}
    </ThemeProvider>
  )
}

export default Theme
