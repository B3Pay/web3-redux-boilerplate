import type { BaseProvider, Web3Provider } from "@ethersproject/providers"
import { useEffect, useMemo, useState } from "react"
import { ConnectorName } from "utils/types"
import { useConnection } from "../contexts/hooks/useConnection"
import {
  getConnector,
  useActiveConnectorName,
  useActiveConnectorNameByChainName,
} from "./useConnector"

let DynamicProvider: typeof Web3Provider | null | undefined

async function importProvider(): Promise<void> {
  if (DynamicProvider === undefined) {
    try {
      const { Web3Provider } = await import("@ethersproject/providers")
      DynamicProvider = Web3Provider
    } catch {
      console.debug("@ethersproject/providers not available")
      DynamicProvider = null
    }
  }
}

export type ProviderType = ReturnType<typeof useProvider>

export const usePriorityProvider = (): ProviderType => {
  const key = useActiveConnectorName()
  return useProvider(key)
}

export const useProviderByChainName = (chain: string): ProviderType => {
  const key = useActiveConnectorNameByChainName(chain)

  return useProvider(key)
}

export function useProvider<T extends BaseProvider = Web3Provider>(
  key: ConnectorName,
  enabled = true
): T | undefined {
  const { isActive, chainId } = useConnection(key)

  const connector = getConnector(key)

  // ensure that Provider is going to be available when loaded if @ethersproject/providers is installed
  const [loaded, setLoaded] = useState(DynamicProvider !== undefined)

  useEffect(() => {
    if (loaded) return
    let stale = false
    void importProvider().then(() => {
      if (stale) return
      setLoaded(true)
    })
    return () => {
      stale = true
    }
  }, [loaded])

  return useMemo(() => {
    // to ensure connectors remain fresh, we condition re-renders on loaded, isActive and chainId
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    void loaded && isActive && chainId

    if (connector && enabled) {
      if (connector.customProvider) return connector.customProvider as T
      // see tsdoc note above for return type explanation.
      else if (DynamicProvider && connector.provider) {
        return new DynamicProvider(connector.provider as any) as unknown as T
      }
    }
  }, [loaded, connector, enabled, isActive, chainId])
}
