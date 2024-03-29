import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Accounts from "components/Accounts"
import AccountSelect from "components/AccountSelect"
import ChainIcon from "components/ChainIcon"
import ChainSelect from "components/ChainSelect"
import { useSelectedChainConfig } from "contexts/hooks/useChain"
import useConnector from "hooks/useConnector"
import { useState } from "react"

export default function Home() {
  const { chain, name } = useSelectedChainConfig()
  const { signer, accounts } = useConnector()

  const [to, setTo] = useState<string>("")

  const [signature, setSignature] = useState<string | null>(null)

  const testSignature = async () => {
    if (!signer) return
    const signature = await signer.signMessage("test")
    console.log(signature)
    setSignature(signature)
  }

  const testTransaction = async () => {
    if (!signer) return
    const tx = await signer.sendTransaction({
      to,
      data: "0x",
      value: 1,
    })
    console.log(tx)
  }

  return (
    <Card>
      <Stack
        p={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1}>
          <ChainIcon chain={chain} />
          <Stack justifyContent="center">
            <Typography
              textTransform="uppercase"
              variant="caption"
              fontWeight="500"
            >
              {name}
            </Typography>
            <Accounts accounts={accounts} chain={chain} />
          </Stack>
        </Stack>
        <Box>{accounts?.length ? <AccountSelect /> : <ChainSelect />}</Box>
      </Stack>
      <Box px={2} py={1}>
        {accounts && accounts.length > 0 ? (
          <Stack
            spacing={2}
            direction={{ xs: "column" }}
            alignItems="center"
            justifyContent="center"
            pb={2}
          >
            <Typography variant="body1">Chain: {name}</Typography>
            <Typography variant="body1">{accounts[0]}</Typography>
            <Button variant="outlined" fullWidth onClick={testSignature}>
              Test Signature
            </Button>
            <Typography variant="body1">
              {signature ? signature : "No signature"}
            </Typography>
            <Stack direction="row" width="100%" spacing={2}>
              <TextField
                label="To"
                fullWidth
                variant="outlined"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <Button variant="outlined" fullWidth onClick={testTransaction}>
                Test Transaction
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body1">No account connected</Typography>
        )}
      </Box>
    </Card>
  )
}
