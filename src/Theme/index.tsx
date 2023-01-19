import { GlobalStyles } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useThemeColorRange, useThemeMode } from "contexts/hooks"
import { useEffect, useMemo, useState } from "react"

interface ThemeProps {
  children: React.ReactNode
}

const Theme: React.FC<ThemeProps> = ({ children, ...rest }) => {
  const [isDark, setIsDark] = useState(false)

  const color = useThemeColorRange()
  const bgcolor = useThemeColorRange(50)

  const selectedMode = useThemeMode()

  useEffect(() => {
    if (selectedMode === "system") {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      setIsDark(prefersDarkMode.matches)
    } else {
      setIsDark(selectedMode === "dark")
    }
  }, [selectedMode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
          primary: {
            main: color || (isDark ? "#fff" : "#000"),
          },
        },
      }),
    [color, bgcolor, isDark]
  )

  return (
    <ThemeProvider theme={theme} {...rest}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: isDark ? "#353535" : "#f0f0f0",
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
