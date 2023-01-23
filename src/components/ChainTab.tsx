import { Chip, Stack } from "@mui/material"
import Badge from "@mui/material/Badge"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { setChainNameFirst } from "contexts/functions"
import { useIsActiveChainName } from "hooks/useChains"
import ChainIcon from "./ChainIcon"

interface ChainTabProps {
  selected: boolean
  connected: boolean
  chainName: string
  onChange: () => void
}

const ChainTab: React.FC<ChainTabProps> = ({
  selected,
  connected,
  chainName,
  onChange,
}) => {
  const isActive = useIsActiveChainName(chainName)

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
            fontSize: 10,
            width: 16,
            height: 16,
            minWidth: 16,
          },
        }}
      >
        <ChainIcon
          chainName={chainName}
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
            onClick={() => setChainNameFirst(chainName)}
            sx={{
              width: 60,
              height: 20,
              borderRadius: 1,
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
            {chainName}
          </Typography>
        )}
      </Stack>
    </Paper>
  )
}

export default ChainTab
