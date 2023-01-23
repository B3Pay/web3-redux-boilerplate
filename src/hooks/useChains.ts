import { getConnectionIsActive } from "contexts/functions/getConnection"
import {
  useChainActiveConnectorName,
  useChainConfigList,
  useSelectedChainOrder,
} from "contexts/hooks/useChain"
import useConnectionState, {
  useConnection,
  useConnectionWithChainIds,
} from "contexts/hooks/useConnection"
import { useMemo } from "react"
import { ConnectorName } from "utils/types"

export function usePriorityChain() {
  const key = useSelectedChainOrder()

  const connectorName = useChainActiveConnectorName(key)

  return useChains(connectorName)
}

export function useActiveChainNames() {
  const connectors = useConnectionState()

  return useMemo(
    () =>
      Object.keys(connectors).reduce((acc, key) => {
        const chain = connectors[key as ConnectorName]?.chainName
        if (chain && getConnectionIsActive(key as ConnectorName)) {
          return [...acc, chain]
        }
        return acc
      }, [] as string[]),
    [connectors]
  )
}

export function useIsActiveChainName(chainName: string) {
  const chainNames = useActiveChainNames()

  return chainNames.includes(chainName)
}

export function useActiveChainName() {
  const chainId = usePriorityChain()
  const chainList = useChainConfigList()

  if (!chainId) return null

  return chainList.find((info) => info.chainIds.includes(chainId))?.name
}

export function useCurrentChainId(key: ConnectorName) {
  const chainId = useChains(key)

  if (!chainId) return null

  const states = useConnectionWithChainIds(key, [chainId])

  return states?.chainId
}

export default function useChains(key: ConnectorName) {
  const states = useConnection(key)

  return states?.chainId
}
