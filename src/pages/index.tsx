import { capitalize } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Accounts from "components/Accounts"
import { setChainNameFirst } from "contexts/functions/setChain"
import { useSelectedChainName } from "contexts/hooks/useChain"
import { useAllAccounts } from "hooks/useAccounts"
import useConnector from "hooks/useConnector"
import Image from "next/image"
import { useState } from "react"
import { getEllipsis } from "utils"

export default function Home() {
  const selectedChainName = useSelectedChainName()
  const { signer, accounts } = useConnector()

  const [to, setTo] = useState<string>("")

  const [signature, setSignature] = useState<string | null>(null)

  const allAccounts = useAllAccounts()

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
      <CardHeader
        title={capitalize(selectedChainName)}
        subheader={
          <Accounts chainName={selectedChainName} accounts={accounts} />
        }
        avatar={
          <Box
            border={1}
            borderRadius={1}
            width={45}
            height={45}
            borderColor="primary.main"
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Image
              src={`/assets/images/chain/${selectedChainName}.svg`}
              alt={selectedChainName}
              width={30}
              height={30}
            />
          </Box>
        }
        action={
          <TextField
            select
            variant="outlined"
            size="small"
            value={selectedChainName}
            onChange={(e) => setChainNameFirst(e.target.value)}
          >
            {allAccounts.map(({ chainName, account }) => (
              <MenuItem key={chainName} value={chainName}>
                {getEllipsis(account)}
              </MenuItem>
            ))}
          </TextField>
        }
      />

      <Box px={2} py={1}>
        {accounts && accounts.length > 0 ? (
          <Stack
            spacing={2}
            direction={{ xs: "column" }}
            alignItems="center"
            justifyContent="center"
            pb={2}
          >
            <Typography variant="body1">Chain: {selectedChainName}</Typography>

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
