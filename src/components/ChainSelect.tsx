import { capitalize } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { setChainNameFirst } from "contexts/functions/setChain"
import { useChainList, useSelectedChainName } from "contexts/hooks/useChain"

interface ChainSelectProps {}

const ChainSelect: React.FC<ChainSelectProps> = () => {
  const selectedChainName = useSelectedChainName()
  const allChains = useChainList()

  return (
    <TextField
      select
      variant="outlined"
      size="small"
      value={selectedChainName}
      onChange={(e) => setChainNameFirst(e.target.value)}
    >
      {allChains.map(({ chainName }) => (
        <MenuItem key={chainName} value={chainName}>
          {capitalize(chainName)}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default ChainSelect
