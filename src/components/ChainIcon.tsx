import Box, { BoxProps } from "@mui/material/Box"
import Image from "next/image"

interface ChainIconProps extends BoxProps {
  chainName: string
  width?: number
  height?: number
  borderColor?: string
}

const ChainIcon: React.FC<ChainIconProps> = ({
  chainName,
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
        src={`/assets/images/chain/${chainName}.svg`}
        alt={chainName}
        width={width - 10}
        height={height - 10}
      />
    </Box>
  )
}

export default ChainIcon
