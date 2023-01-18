import { Badge, Box, Stack, Typography } from "@mui/material"
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
    <Stack
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      margin={0}
      onClick={() => setSelectChain(chainName)}
      width={100}
      height={100}
      boxShadow={selected ? 3 : 0}
      borderRadius={selected ? 1 : 0}
      sx={{
        cursor: "pointer",
        position: "relative",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        bgcolor: selected ? "background.paper" : "grey.200",
        color: selected ? "text.primary" : "text.secondary",
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
          boxShadow={selected ? 3 : 1}
          bgcolor="background.paper"
          width={55}
          height={55}
          justifyContent="center"
          alignItems="center"
          borderRadius={1}
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
    </Stack>
  )
}

export default ChainButton
