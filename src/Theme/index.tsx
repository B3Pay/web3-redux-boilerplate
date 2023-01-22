import GlobalStyles from "@mui/material/GlobalStyles"
import ThemeProvider from "@mui/system/ThemeProvider"
import {
  useMediaThemeMode,
  useThemeColorPalette,
} from "contexts/hooks/useSetting"
import { useMemo } from "react"
import createMuiTheme from "./createTheme"

interface ThemeProps {
  children: React.ReactNode
}

const Theme: React.FC<ThemeProps> = ({ children, ...rest }) => {
  const palette = useThemeColorPalette()

  const mode = useMediaThemeMode()

  const theme = useMemo(() => createMuiTheme(mode, palette), [palette, mode])

  return (
    <ThemeProvider theme={theme} {...rest}>
      <GlobalStyles
        styles={{
          body: {
            fontFamily: theme.typography.fontFamily,
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      {children}
    </ThemeProvider>
  )
}

export default Theme
