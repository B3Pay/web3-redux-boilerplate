import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Stack } from "@mui/system"
import { useConnectorStatesWithChainIds } from "contexts/hooks/useConnector"
import Image from "next/image"
import React from "react"
import { ConnectorName } from "utils/types"
import Accounts from "./Accounts"
import ConnectWithSelect from "./ConnectWithSelect"

interface ConnectorCardProps {
  name: ConnectorName
  chainIds: number[]
}

const ConnectorCard: React.FC<ConnectorCardProps> = ({ name, chainIds }) => {
  const { accounts, activating, isActive, chainId, error } =
    useConnectorStatesWithChainIds(name, chainIds)

  return (
    <Stack
      px={2}
      py={1}
      spacing={1}
      height={70}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        border={1}
        width={110}
        height={50}
        borderRadius={1}
        borderColor={
          error
            ? "error.main"
            : isActive
            ? "success.main"
            : activating
            ? "warning.main"
            : chainId
            ? "secondary.main"
            : "text.disabled"
        }
        justifyContent="center"
        alignItems="center"
        component={Stack}
      >
        <Image
          alt={name}
          src={`/assets/images/wallet/${name}.svg`}
          width={35}
          height={35}
        />
      </Box>
      <Stack width="100%" height={45}>
        <Typography
          textTransform="uppercase"
          variant="caption"
          fontWeight="500"
        >
          {name}
        </Typography>
        <Accounts accounts={accounts} connectorName={name} error={error} />
      </Stack>
      <ConnectWithSelect
        width={300}
        height={60}
        spacing={0.5}
        isActive={isActive}
        chainIds={chainIds}
        connectorName={name}
        isActivating={activating}
        needSelection={chainIds.length > 1}
      />
    </Stack>
  )
}

export default ConnectorCard
