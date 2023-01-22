import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"
import { getNativeCurrencyByChainName } from "contexts/functions"
import useBalances from "hooks/useBalances"
import { formatBalance, getEllipsis } from "utils"

interface AccountsProps {
  chainName: string
  accounts?: string[]
}

const Accounts: React.FC<AccountsProps> = ({ chainName, accounts }) => {
  const balances = useBalances(chainName, accounts)

  const tokenDetail = getNativeCurrencyByChainName(chainName)

  return (
    <Box>
      {accounts?.map((account, i) => (
        <Typography
          variant="caption"
          color="text.secondary"
          overflow="auto"
          key={account}
        >
          {getEllipsis(account, 2, 4)}
          <small>
            ({formatBalance(balances?.[i])} {tokenDetail?.symbol})
          </small>
        </Typography>
      ))}
    </Box>
  )
}

export default Accounts
