import Box, { BoxProps } from "@mui/material/Box"
import Image from "next/image"

interface ConnectorIconProps extends BoxProps {
  conectorName: string
  width?: number
  height?: number
  borderColor?: string
}

const ConnectorIcon: React.FC<ConnectorIconProps> = ({
  conectorName,
  width = 55,
  height = 55,
  ...rest
}) => {
  return (
    <Box
      width={width}
      height={height}
      minWidth={width}
      display="flex"
      alignItems="center"
      justifyContent="center"
      border={1}
      borderRadius={1}
      borderColor="primary.main"
      {...rest}
    >
      <Image
        src={`/assets/images/connector/${conectorName}.svg`}
        alt={conectorName}
        width={width - 20}
        height={height - 20}
      />
    </Box>
  )
}

export default ConnectorIcon
