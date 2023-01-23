import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { setChainNameFirst } from "contexts/functions/setChain"
import {
  useChainConfigList,
  useSelectedChainOrder,
} from "contexts/hooks/useChain"

interface ChainSelectProps {}

const ChainSelect: React.FC<ChainSelectProps> = () => {
  const selectedChainName = useSelectedChainOrder()
  const allChains = useChainConfigList()

  return (
    <TextField
      select
      variant="outlined"
      size="small"
      value={selectedChainName}
      onChange={(e) => setChainNameFirst(e.target.value)}
    >
      {allChains.map(({ name, key }) => (
        <MenuItem key={key} value={key}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default ChainSelect
