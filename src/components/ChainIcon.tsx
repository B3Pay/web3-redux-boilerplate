import Box, { BoxProps } from "@mui/material/Box"
import Image from "next/image"

interface ChainIconProps extends BoxProps {
  chain: string
  width?: number
  height?: number
  borderColor?: string
}

const ChainIcon: React.FC<ChainIconProps> = ({
  chain,
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <Box
      border={1}
      width={width}
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={1}
      borderColor="primary.main"
      {...rest}
    >
      <Image
        src={`/assets/images/chain/${chain}.svg`}
        alt={chain}
        width={width - 15}
        height={height - 15}
      />
    </Box>
  )
}

export default ChainIcon
