import Typography from "@mui/material/Typography"
import useBalances from "hooks/useBalances"
import { formatBalance, getEllipsis } from "utils"
import { ConnectorName } from "utils/types"

interface AccountsProps {
  connectorName: ConnectorName
  accounts?: string[]
  error?: Error
}

const Accounts: React.FC<AccountsProps> = ({
  connectorName,
  accounts,
  error,
}) => {
  const balances = useBalances(connectorName, accounts)

  if (accounts === undefined) return null

  return (
    <Typography variant="caption" color="text.secondary" overflow="auto">
      {error ? (
        <span>
          {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </span>
      ) : accounts.length === 0 ? (
        "None"
      ) : (
        accounts?.map((account, i) => (
          <span key={account}>
            {getEllipsis(account, 2, 4)}(
            {formatBalance(connectorName, balances?.[i])})
          </span>
        ))
      )}
    </Typography>
  )
}

export default Accounts
