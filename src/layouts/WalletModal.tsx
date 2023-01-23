import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import Fade from "@mui/material/Fade"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import ChainTab from "components/ChainTab"
import ConnectorCard from "components/ConnectorCard"
import { setConnectModal } from "contexts/functions/setSetting"
import {
  useChainConfigList,
  useChainOrderList,
  useSelectedChainOrder,
} from "contexts/hooks/useChain"

interface WalletModalProps {
  open: boolean
  tab: string | undefined
}

const WalletModal: React.FC<WalletModalProps> = ({ open, tab }) => {
  const matches = useMediaQuery("(min-width:600px)")

  const chainConfigList = useChainConfigList()
  const chainOrderList = useChainOrderList()

  const selectedChain = useSelectedChainOrder()

  return (
    <Modal
      open={open}
      onClose={() => setConnectModal(false)}
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
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
              onClick={() => setConnectModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider flexItem />
          <Stack
            width="100%"
            direction="row"
            overflow="scroll"
            justifyContent="space-between"
            bgcolor="background.default"
          >
            {chainOrderList.map((chainName) => (
              <ChainTab
                key={chainName}
                chainName={chainName}
                selected={chainName === tab}
                connected={selectedChain === chainName}
                onChange={() => setConnectModal(true, chainName)}
              />
            ))}
          </Stack>
          <List>
            {chainConfigList.map(
              ({ key, connectors, chainIds }) =>
                key === tab &&
                connectors.map((connector, index) => (
                  <Box key={connector} component="li">
                    <ConnectorCard name={connector} chainIds={chainIds} />
                    {index !== connectors.length - 1 && (
                      <Divider sx={{ my: 1 }} variant="middle" />
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
