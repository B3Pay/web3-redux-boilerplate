import Box, { BoxProps } from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { getChainNativeCurrency } from "contexts/helpers"
import useBalances from "hooks/useBalances"
import { formatBalance, getEllipsis } from "utils"

interface AccountsProps extends BoxProps {
  chain: string
  accounts?: string[]
}

const Accounts: React.FC<AccountsProps> = ({ chain, accounts, ...rest }) => {
  const balances = useBalances(chain, accounts)

  const tokenDetail = getChainNativeCurrency(chain)

  return (
    <Box {...rest}>
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
