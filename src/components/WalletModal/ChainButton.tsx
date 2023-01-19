import { Badge, Box, Paper, Stack, Typography } from "@mui/material"
import { useActiveChainNames } from "hooks/useChains"
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
  const activeChain = useActiveChainNames()

  return (
    <Paper
      onClick={() => setSelectChain(chainName)}
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
        bgcolor: selected ? "background.paper" : "transparent",
      }}
    >
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        color={connected ? "success" : "info"}
        variant="dot"
        invisible={!activeChain.includes(chainName)}
        sx={{
          margin: 1,
        }}
      >
        <Box
          border={1}
          borderRadius={1}
          borderColor="action.selected"
          width={55}
          height={55}
          justifyContent="center"
          alignItems="center"
          component={Stack}
        >
          <Image
            src={`./assets/chain/${chainName}.svg`}
            alt={chainName}
            width={40}
            height={40}
          />
        </Box>
      </Badge>
      <Typography
        textTransform="uppercase"
        variant="caption"
        maxWidth={100}
        textAlign="center"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        sx={{
          borderRadius: 1,
          paddingRight: 1,
          paddingLeft: 1,
        }}
      >
        {chainName}
      </Typography>
    </Paper>
  )
}

export default ChainButton
