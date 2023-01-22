import { getIsActive } from "contexts/functions/getConnector"
import { useChainList } from "contexts/hooks/useChain"
import {
  useAllConnectorStates,
  useConnectorStates,
  useConnectorStatesWithChainIds,
} from "contexts/hooks/useConnector"
import { useMemo } from "react"
import { ConnectorName } from "utils/types"
import { useActiveConnectorName } from "./useConnector"

export function usePriorityChain() {
  const key = useActiveConnectorName()

  return useChains(key)
}

export function useActiveChainNames() {
  const connectors = useAllConnectorStates()

  return useMemo(
    () =>
      Object.keys(connectors).reduce((acc, key) => {
        const chain = connectors[key as ConnectorName]?.chainName
        if (chain && getIsActive(key as ConnectorName)) {
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
  const chainInfo = useChainList()

  if (!chainId) return null

  return chainInfo.find((info) => info.chainIds.includes(chainId))?.chainName
}

export function useCurrentChainId(key: ConnectorName) {
  const chainId = useChains(key)

  if (!chainId) return null

  const states = useConnectorStatesWithChainIds(key, [chainId])

  return states?.chainId
}

export default function useChains(key: ConnectorName) {
  const states = useConnectorStates(key)

  return states?.chainId
}
