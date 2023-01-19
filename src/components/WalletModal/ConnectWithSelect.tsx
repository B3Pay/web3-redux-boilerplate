import { Button, MenuItem, Select, Stack, StackProps } from "@mui/material"
import {
  connectorActivate,
  connectorAddChain,
  connectorDisconnect,
  connectorSwitchChain,
} from "contexts/functions/setConnector"
import { useConnectorStates } from "contexts/hooks/useConnectorCtx"
import { useMemo, useState } from "react"
import { CHAINS } from "utils/chains"
import { ConnectorName } from "utils/types"
import { validateChainId } from "utils/validators"

interface ConnectorButtonProps {
  children: string
  color: "success" | "error" | "warning" | "info" | "secondary" | "primary"
  onClick: () => void
}
interface ConnectWithSelectProps extends StackProps {
  connectorName: ConnectorName
  isActivating?: boolean
  isActive: boolean
  needSelection: boolean
  chainIds: number[]
}

const ConnectWithSelect: React.FC<ConnectWithSelectProps> = ({
  connectorName,
  isActivating,
  isActive,
  needSelection,
  chainIds,
  ...rest
}) => {
  const { error, chainId } = useConnectorStates(connectorName)
  const [desiredChainId, setDesiredChainId] = useState(
    validateChainId(chainIds, chainId)
  )

  function onChange(event: any) {
    setDesiredChainId(event.target.value)
    if (error?.code || !isActive)
      connectorSwitchChain(connectorName, event.target.value)
  }

  const buttonProps: ConnectorButtonProps = useMemo(() => {
    if (error?.code && [4902, -32000].includes(error?.code)) {
      return {
        children: "Add Chain",
        color: "warning",
        onClick: () => connectorAddChain(connectorName, desiredChainId),
      }
    }
    if (error) {
      return {
        children: "Try Again?",
        color: "info",
        onClick: () => connectorActivate(connectorName, desiredChainId),
      }
    }
    if (chainId !== undefined && chainId !== desiredChainId) {
      return {
        children: "Switch Chain",
        color: "secondary",
        onClick: () => connectorSwitchChain(connectorName, desiredChainId),
      }
    }
    if (isActive) {
      return {
        children: "Disconnect",
        color: "error",
        onClick: () => connectorDisconnect(connectorName),
      }
    }
    return {
      children: "Connect",
      color: "success",
      onClick: () => connectorActivate(connectorName, desiredChainId),
    }
  }, [connectorName, desiredChainId, isActive, error, chainId])

  return (
    <Stack
      justifyContent={needSelection ? "space-between" : "center"}
      {...rest}
    >
      {needSelection && (
        <Select
          fullWidth
          size="small"
          onChange={onChange}
          disabled={isActivating}
          value={desiredChainId}
          sx={{
            padding: 0,
            "& .MuiSelect-select": {
              padding: 0.7,
              paddingLeft: 1,
              fontSize: 12,
            },
          }}
        >
          {chainIds.map((chainId: any) => (
            <MenuItem key={chainId} value={chainId}>
              {CHAINS[chainId]?.name ?? chainId}
            </MenuItem>
          ))}
        </Select>
      )}
      <Button
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          padding: 0.5,
          fontSize: 12,
        }}
        {...buttonProps}
      />
    </Stack>
  )
}

export default ConnectWithSelect
