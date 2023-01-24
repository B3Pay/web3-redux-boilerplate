import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { setChainFirstOrder } from "contexts/helpers/setChain"
import { useChainConfigList, useSelectedChain } from "contexts/hooks/useChain"

interface ChainSelectProps {}

const ChainSelect: React.FC<ChainSelectProps> = () => {
  const selectedChainName = useSelectedChain()
  const allChains = useChainConfigList()

  return (
    <TextField
      select
      variant="outlined"
      size="small"
      value={selectedChainName}
      onChange={(e) => setChainFirstOrder(e.target.value)}
    >
      {allChains.map(({ name, chain: key }) => (
        <MenuItem key={key} value={key}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default ChainSelect
