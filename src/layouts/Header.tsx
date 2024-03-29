import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Skeleton from "@mui/material/Skeleton"
import Toolbar from "@mui/material/Toolbar"
import { setConnectModal } from "contexts/helpers/setSetting"
import { useIsInitialized } from "contexts/hooks/useChain"
import { useConnectModal } from "contexts/hooks/useSetting"
import WalletModal from "layouts/WalletModal"
import Image from "next/image"
import { useState } from "react"
import DrawerMenu from "./DrawerMenu"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { open, tab } = useConnectModal()

  const initialized = useIsInitialized()

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box flex={8} display="flex" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src="/assets/images/logo.svg"
              height={56}
              width={56}
              alt="logo"
            />
          </Box>
          <Box justifyContent="flex-end" flex={4} display="flex">
            {initialized ? (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setConnectModal(true)}
              >
                CONNECT
              </Button>
            ) : (
              <Skeleton variant="rounded" width={115} height={36} />
            )}
          </Box>
        </Box>
      </Toolbar>
      {initialized && <WalletModal open={open} tab={tab} />}
      <DrawerMenu toggleDrawer={setDrawerOpen} drawerOpen={drawerOpen} />
    </AppBar>
  )
}

export default Header
