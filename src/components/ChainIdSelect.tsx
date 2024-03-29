import Button, { ButtonProps } from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { CHAINS } from "utils/chains"
import { ConnectorName } from "utils/types"

interface ChainIdSelectProps extends ButtonProps {
  connectorName: ConnectorName
  title: string
  chainId?: number
  chainIds: number[]
  onClick?: () => void
  onChange?: (e: any) => void
  loading?: boolean
}

const ChainIdSelect: React.FC<ChainIdSelectProps> = ({
  connectorName,
  chainId,
  title,
  loading,
  chainIds,
  onChange,
  ...rest
}) => {
  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent="space-between"
      spacing={1}
      pt={1}
    >
      {chainIds.length > 1 && (
        <TextField
          label="Select a chain"
          fullWidth
          select
          variant="outlined"
          size="small"
          onChange={onChange}
          disabled={loading}
          value={chainId}
        >
          {chainIds.map((chainId: any) => (
            <MenuItem key={chainId} value={chainId}>
              {CHAINS[chainId]?.name ?? chainId}
            </MenuItem>
          ))}
        </TextField>
      )}
      <Button fullWidth size="small" variant="outlined" {...rest}>
        {title}
      </Button>
    </Stack>
  )
}

export default ChainIdSelect
