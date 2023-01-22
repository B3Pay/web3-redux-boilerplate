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
  const { accounts, activating, isActive, chainId, error, chainName } =
    useConnectorStatesWithChainIds(name, chainIds)

  return (
    <Stack
      px={2}
      py={1}
      spacing={1}
      height={60}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        border={1}
        height={55}
        minWidth={55}
        borderRadius={1}
        justifyContent="center"
        alignItems="center"
        display="flex"
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
      >
        <Image
          alt={name}
          src={`/assets/images/wallet/${name}.svg`}
          width={35}
          height={35}
        />
      </Box>
      <Stack width="100%" height={45} justifyContent="center">
        <Typography
          textTransform="uppercase"
          variant="caption"
          fontWeight="500"
        >
          {name}
        </Typography>
        {error ? (
          <Typography
            component="span"
            variant="caption"
            overflow="hidden"
            whiteSpace="nowrap"
            color="text.secondary"
            textOverflow="ellipsis"
          >
            {error.name ?? "Error"}
            {error.message ? `: ${error.message}` : null}
          </Typography>
        ) : (
          accounts &&
          chainName && <Accounts accounts={accounts} chainName={chainName} />
        )}
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
