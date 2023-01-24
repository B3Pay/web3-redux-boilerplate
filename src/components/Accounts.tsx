import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"
import { getChainNativeCurrency } from "contexts/helpers"
import useBalances from "hooks/useBalances"
import { formatBalance, getEllipsis } from "utils"

interface AccountsProps {
  chain: string
  accounts?: string[]
}

const Accounts: React.FC<AccountsProps> = ({ chain, accounts }) => {
  const balances = useBalances(chain, accounts)

  const tokenDetail = getChainNativeCurrency(chain)

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
