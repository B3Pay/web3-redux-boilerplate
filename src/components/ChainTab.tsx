import { Chip, Stack } from "@mui/material"
import Badge from "@mui/material/Badge"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { setChainFirstOrder } from "contexts/helpers"
import { useIsActiveChain } from "hooks/useChains"
import ChainIcon from "./ChainIcon"

interface ChainTabProps {
  selected: boolean
  connected: boolean
  chain: string
  name: string
  onChange: () => void
}

const ChainTab: React.FC<ChainTabProps> = ({
  selected,
  connected,
  chain,
  name,
  onChange,
}) => {
  const isActive = useIsActiveChain(chain)

  return (
    <Paper
      onClick={onChange}
      elevation={selected ? 1 : 0}
      sx={{
        cursor: "pointer",
        position: "relative",
        width: 100,
        height: 100,
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        bgcolor: selected ? "background.paper" : "background.default",
      }}
    >
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        color={connected ? "success" : "info"}
        variant="standard"
        badgeContent={connected ? "✓" : "!"}
        invisible={!isActive}
        sx={{
          margin: 1,
          "& .MuiBadge-badge": {
            top: 5,
            right: 5,
            width: 16,
            height: 16,
            fontSize: 10,
            minWidth: 16,
          },
        }}
      >
        <ChainIcon
          chain={chain}
          borderColor={selected ? "primary.main" : "action.selected"}
          width={55}
          height={55}
        />
      </Badge>
      <Stack>
        {!connected && selected && isActive ? (
          <Chip
            size="small"
            label="Switch"
            color="warning"
            variant="outlined"
            onClick={() => setChainFirstOrder(chain)}
            sx={{
              width: 60,
              height: 20,
              borderRadius: 1,
              fontSize: 10,
            }}
          />
        ) : (
          <Typography
            color={selected ? "text.primary" : "text.secondary"}
            textTransform="uppercase"
            variant="caption"
            textAlign="center"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            sx={{
              width: 90,
              height: 20,
              paddingLeft: 1,
              borderRadius: 1,
              paddingRight: 1,
            }}
          >
            {name}
          </Typography>
        )}
      </Stack>
    </Paper>
  )
}

export default ChainTab
