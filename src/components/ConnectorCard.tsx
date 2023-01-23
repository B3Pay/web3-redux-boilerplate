import Typography from "@mui/material/Typography"
import { Stack } from "@mui/system"
import { useConnectorStatesWithChainIds } from "contexts/hooks/useConnector"
import React from "react"
import { ConnectorName } from "utils/types"
import Accounts from "./Accounts"
import ConnectorIcon from "./ConnectorIcon"
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
      <ConnectorIcon
        conectorName={name}
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
      />
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
