import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { setChainNameFirst } from "contexts/functions/setChain"
import { useSelectedChainName } from "contexts/hooks/useChain"
import { useAllAccounts } from "hooks/useAccounts"
import { getEllipsis } from "utils"

interface AccountSelectProps {}

const AccountSelect: React.FC<AccountSelectProps> = () => {
  const selectedChainName = useSelectedChainName()
  const allAccounts = useAllAccounts()

  return (
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
  )
}

export default AccountSelect
