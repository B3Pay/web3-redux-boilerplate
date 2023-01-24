import { getConnectionIsActive } from "contexts/helpers/getConnection"
import {
  useChainActiveConnectorName,
  useChainConfigList,
  useSelectedChain,
} from "contexts/hooks/useChain"
import useConnectionState, {
  useConnection,
  useConnectionWithChainIds,
} from "contexts/hooks/useConnection"
import { useMemo } from "react"
import { ConnectorName } from "utils/types"

export function usePriorityChain() {
  const chain = useSelectedChain()

  const connectorName = useChainActiveConnectorName(chain)

  return useChains(connectorName)
}

export function useActiveChainList() {
  const connectors = useConnectionState()

  return useMemo(
    () =>
      Object.keys(connectors).reduce((acc, key) => {
        const chain = connectors[key as ConnectorName]?.chain
        if (chain && getConnectionIsActive(key as ConnectorName)) {
          return [...acc, chain]
        }
        return acc
      }, [] as string[]),
    [connectors]
  )
}

export function useIsActiveChain(chain: string) {
  const chains = useActiveChainList()

  return chains.includes(chain)
}

export function useActiveChain() {
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
