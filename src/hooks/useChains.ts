import { getIsActive } from "contexts/functions/getConnector"
import { useChainList } from "contexts/hooks/useChain"
import {
  useAllConnectorStates,
  useConnectorStates,
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

export function useActiveChainName() {
  const chainId = usePriorityChain()
  const chainInfo = useChainList()

  if (!chainId) return null

  return chainInfo.find((info) => info.chainIds.includes(chainId))?.chainName
}

// export function useActiveChainNamess() {
//   const avticeChains = useAllActiveChains()
//   const chainInfo = useChainsInfoWithoutDefault()

//   return useMemo(
//     () =>
//       chainInfo
//         .filter((info) =>
//           avticeChains.some((chain) => info.chainIds.includes(chain))
//         )
//         .map((info) => info.chainName),
//     [avticeChains, chainInfo]
//   )
// }

export default function useChains(key: ConnectorName) {
  const states = useConnectorStates(key)

  return states?.chainId
}
