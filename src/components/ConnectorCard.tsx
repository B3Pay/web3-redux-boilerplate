import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useConnectionWithChainIds } from "contexts/hooks/useConnection"
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
  const { accounts, activating, isActive, chainId, error, chain } =
    useConnectionWithChainIds(name, chainIds)

  return (
    <Grid
      px={2}
      container
      height={80}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item xs={2}>
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
      </Grid>
      <Grid item xs={6} display="flex" flexDirection="column" pl={0.5}>
        <Typography
          textTransform="uppercase"
          variant="caption"
          fontWeight="600"
        >
          {name}
        </Typography>
        {error ? (
          <Typography
            component="span"
            variant="caption"
            color="text.secondary"
            overflow="hidden"
            maxHeight={40}
            justifyContent="center"
            textOverflow="ellipsis"
          >
            {error.name ?? "Error"}
            {error.message ? `: ${error.message}` : null}
          </Typography>
        ) : (
          accounts && chain && <Accounts accounts={accounts} chain={chain} />
        )}
      </Grid>
      <Grid item xs={4} justifyContent="flex-end">
        <ConnectWithSelect
          spacing={0.5}
          isActive={isActive}
          chainIds={chainIds}
          connectorName={name}
          isActivating={activating}
          needSelection={chainIds.length > 1}
        />
      </Grid>
    </Grid>
  )
}

export default ConnectorCard
