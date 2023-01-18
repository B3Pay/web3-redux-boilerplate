import CloseIcon from "@mui/icons-material/Close"
import { List } from "@mui/material"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import Fade from "@mui/material/Fade"
import IconButton from "@mui/material/IconButton"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import { setConnectModal } from "contexts/functions/setSetting"
import { useChainList, useChainOrderByIndex } from "contexts/hooks/useChainCtx"
import ChainButton from "./ChainButton"
import WalletCard from "./WalletCard"

interface WalletModalProps {
  open: boolean
  tab?: string
  onClose: (open: boolean) => void
}

const WalletModal: React.FC<WalletModalProps> = ({ open, tab, onClose }) => {
  const matches = useMediaQuery("(min-width:600px)")

  const chainList = useChainList()
  const connectedChain = useChainOrderByIndex(0)

  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      closeAfterTransition
      disableEnforceFocus
      keepMounted
      sx={{
        top: {
          xs: "inherit",
          sm: 0,
        },
      }}
    >
      <Box
        component={matches ? Fade : Slide}
        in={open}
        direction="up"
        margin={{ xs: 0, sm: "10% auto" }}
        maxWidth={{ xs: "100%", sm: 440 }}
      >
        <Card>
          <Stack justifyContent="space-between" alignItems="center">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              px={2}
            >
              <Typography textTransform="uppercase" fontWeight="bolder">
                Connect Wallet
              </Typography>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={() => onClose(false)}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider flexItem />
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              overflow="scroll"
              bgcolor="grey.200"
            >
              {chainList.map(({ chainName }) => (
                <ChainButton
                  key={chainName}
                  chainName={chainName}
                  selected={chainName === tab}
                  connected={connectedChain === chainName}
                  setSelectChain={() => setConnectModal(true, chainName)}
                />
              ))}
            </Stack>
          </Stack>
          <List>
            {chainList.map(
              ({ chainName, connectors, chainIds }) =>
                chainName === tab &&
                connectors.map((connector, index) => (
                  <Box key={connector}>
                    <WalletCard name={connector} chainIds={chainIds} />
                    {index !== connectors.length - 1 && (
                      <Divider sx={{ my: 1 }} component="li" variant="middle" />
                    )}
                  </Box>
                ))
            )}
          </List>
        </Card>
      </Box>
    </Modal>
  )
}

export default WalletModal
