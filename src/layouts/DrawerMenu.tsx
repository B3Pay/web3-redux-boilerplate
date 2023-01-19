import { RestartAlt } from "@mui/icons-material"
import LensIcon from "@mui/icons-material/Lens"
import {
  capitalize,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { setThemeColor, setThemeMode } from "contexts/functions"
import { getAllThemeColorsByRange } from "contexts/functions/getSetting"
import { useThemeMode } from "contexts/hooks"
import { ColorKeys } from "contexts/types/setting"
import Image from "next/image"

interface DrawerProps {
  toggleDrawer: (arg: boolean) => void
  drawerOpen: boolean
}

export const SELECTABLE_COLORS = getAllThemeColorsByRange()

const options = ["system", "light", "dark"] as const

const DrawerMenu: React.FC<DrawerProps> = ({ toggleDrawer, drawerOpen }) => {
  const mode = useThemeMode()

  const handleColorChange = (color: ColorKeys) => {
    setThemeColor(color)
    localStorage.setItem("color", color)
  }

  return (
    <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{ width: 250, height: "100%", p: 0 }}
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        role="presentation"
        onClick={() => toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <Image src="/assets/logo.svg" height={50} width={50} alt="logo" />
            </ListItemIcon>
            <ListItemText primary="B3PAY" />
          </ListItem>
          <Divider />
        </List>
        <List>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Theme</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={mode}
                label="Theme"
                onChange={(e) => {
                  const value = e.target.value as typeof options[number]
                  setThemeMode(value)
                  localStorage.setItem("theme", value)
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {capitalize(option)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <ListItemIcon
              sx={{
                display: "flex",
                direction: "row",
                width: "100%",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {SELECTABLE_COLORS.map(({ name, color }) => (
                <IconButton
                  key={name}
                  onClick={() => handleColorChange(name)}
                  size="small"
                  sx={{
                    border: "1px dashed",
                    borderRadius: "50%",
                    padding: 0.25,
                    margin: 0.5,
                    color,
                  }}
                >
                  <LensIcon fontSize="small" />
                </IconButton>
              ))}
            </ListItemIcon>
          </ListItem>
          <Divider
            variant="middle"
            component="li"
            sx={{
              my: 1,
            }}
          />
          <ListItem sx={{ color: "red" }} disablePadding onClick={() => {}}>
            <ListItemButton>
              <ListItemIcon>
                <RestartAlt color="error" />
              </ListItemIcon>
              <ListItemText primary="Reset Database" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default DrawerMenu
