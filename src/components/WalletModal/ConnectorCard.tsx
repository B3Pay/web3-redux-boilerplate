import { Badge, Box, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useConnectorStatesWithChainIds } from "contexts/hooks/useConnectorCtx"
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
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      spacing={1}
      height={70}
    >
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        variant="dot"
        color={
          error
            ? "error"
            : isActive
            ? "success"
            : activating
            ? "warning"
            : chainId
            ? "secondary"
            : "default"
        }
      >
        <Box
          border={1}
          borderRadius={1}
          borderColor="action.selected"
          width={50}
          height={50}
          justifyContent="center"
          alignItems="center"
          component={Stack}
        >
          <Image
            alt={name}
            src={`assets/wallet/${name}.svg`}
            width={45}
            height={45}
          />
        </Box>
      </Badge>
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
