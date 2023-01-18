import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import WalletModal from "components/WalletModal"
import { initializeConnectors } from "contexts/functions/setConnector"
import { setConnectModal } from "contexts/functions/setSetting"
import {
  useConnectModal,
  useGlobalLoading,
  useInitialized,
} from "contexts/hooks"
import useConnector from "hooks/useConnector"
import { useEffect } from "react"
import { getEllipsis } from "utils"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  useEffect(() => initializeConnectors(), [])

  const { open, tab } = useConnectModal()

  const web3Loading = useGlobalLoading()
  const { signer, accounts } = useConnector()

  const initialized = useInitialized()

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
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">B3PAY</Typography>
          </Box>
          <Box justifyContent="flex-end" flex={4} display="flex">
            {signer && accounts ? (
              <Button
                variant="text"
                color="inherit"
                onClick={() => setConnectModal(true)}
              >
                {getEllipsis(accounts[0])}
              </Button>
            ) : initialized ? (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setConnectModal(true)}
              >
                CONNECT
              </Button>
            ) : (
              <Typography variant="button" color="inherit">
                Initializing...
              </Typography>
            )}
          </Box>
        </Box>
      </Toolbar>
      {initialized && (
        <WalletModal open={open} onClose={setConnectModal} tab={tab} />
      )}
      {web3Loading && <LinearProgress />}
    </AppBar>
  )
}

export default Header
