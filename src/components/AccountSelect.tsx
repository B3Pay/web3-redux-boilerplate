import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { setChainFirstOrder } from "contexts/helpers/setChain"
import { useSelectedChain } from "contexts/hooks/useChain"
import { useAllAccounts } from "hooks/useAccounts"
import { getEllipsis } from "utils"

interface AccountSelectProps {}

const AccountSelect: React.FC<AccountSelectProps> = () => {
  const selectedChainName = useSelectedChain()
  const allAccounts = useAllAccounts()

  return (
    <TextField
      select
      variant="outlined"
      size="small"
      value={selectedChainName}
      onChange={(e) => setChainFirstOrder(e.target.value)}
    >
      {allAccounts.map(({ chain, account }) => (
        <MenuItem key={chain} value={chain}>
          {getEllipsis(account)}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default AccountSelect
