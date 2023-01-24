import LensIcon from "@mui/icons-material/Lens"
import RestartAlt from "@mui/icons-material/RestartAlt"
import { capitalize } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { setThemeColor, setThemeMode } from "contexts/helpers"
import {
  getAllThemeColorsByRange,
  getAppVersion,
} from "contexts/helpers/getSetting"
import { useThemeMode } from "contexts/hooks/useSetting"
import { ColorKeys, ThemeMode } from "contexts/types/setting"
import Image from "next/image"

interface DrawerProps {
  toggleDrawer: (arg: boolean) => void
  drawerOpen: boolean
}

const SELECTABLE_COLORS = getAllThemeColorsByRange()

const SELECTABLE_MODE = ["system", "light", "dark"] as const

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
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <Image
                src="/assets/images/logo-long.svg"
                height={50}
                width={100}
                alt="logo"
              />
            </ListItemIcon>
            <ListItemText
              secondary={getAppVersion()}
              sx={{
                textAlign: "end",
              }}
              inset
            />
          </ListItem>
          <Divider />
        </List>
        <List onClick={() => toggleDrawer(false)}>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Theme</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={mode}
                label="Theme"
                onChange={(e) => setThemeMode(e.target.value as ThemeMode)}
              >
                {SELECTABLE_MODE.map((option) => (
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
