import { Chip, Stack } from "@mui/material"
import Badge from "@mui/material/Badge"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { setChainNameFirst } from "contexts/functions"
import { useIsActiveChainName } from "hooks/useChains"
import Image from "next/image"

interface ChainButtonProps {
  selected: boolean
  connected: boolean
  chainName: string
  setSelectChain: (chainName: string) => void
}

const ChainButton: React.FC<ChainButtonProps> = ({
  selected,
  connected,
  chainName,
  setSelectChain,
}) => {
  const isActive = useIsActiveChainName(chainName)

  return (
    <Paper
      onClick={() => setSelectChain(chainName)}
      elevation={selected ? 1 : 0}
      sx={{
        cursor: "pointer",
        position: "relative",
        width: 100,
        height: 120,
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
        <Box
          border={1}
          borderRadius={1}
          borderColor={selected ? "primary.main" : "action.selected"}
          width={55}
          height={55}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Image
            src={`/assets/images/chain/${chainName}.svg`}
            alt={chainName}
            width={40}
            height={40}
          />
        </Box>
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
              width: 80,
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

export default ChainButton
