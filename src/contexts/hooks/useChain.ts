import { getConnectionIsActiveByChainIds } from "contexts/functions/getConnection"
import { RootState } from "contexts/store"
import { ConfigDetail, DefaultChainState } from "contexts/types/chain"
import { useSelector } from "react-redux"
import { ConnectorName } from "utils/types"

export default function useChainState(): DefaultChainState {
  return useSelector((state: RootState) => state.chain)
}

export function useChainConfigState(): DefaultChainState["config"] {
  return useSelector((state: RootState) => state.chain.config)
}

export function useIsInitialized(): DefaultChainState["initialized"] {
  return useSelector((state: RootState) => state.chain.initialized)
}

export function useChainOrderList(withDefault?: boolean): string[] {
  const order = useSelector((state: RootState) => state.chain.order)
  return withDefault ? order : order.filter((item) => item !== "default")
}

export function useSelectedChainOrder(): string {
  return useSelector((state: RootState) => state.chain.order[0])
}

export function useChainConfigList(withDefault?: boolean): ConfigDetail[] {
  const order = useChainOrderList(withDefault)
  const configs = useChainConfigState()

  return order.map((key) => configs[key])
}

export function useChainConfig(key: string): ConfigDetail {
  const config = useSelector((state: RootState) => state.chain.config[key])
  return (
    config ?? {
      chainIds: [],
      connectors: [],
      name: "",
    }
  )
}

export function useSelectedChainConfig(): ConfigDetail {
  const chainName = useSelectedChainOrder()

  return useChainConfig(chainName)
}

export function useChainActiveConnectorName(key: string): ConnectorName {
  const { chainIds, connectors } = useChainConfig(key)

  return connectors.find((connector) =>
    getConnectionIsActiveByChainIds(connector, chainIds)
  ) as ConnectorName
}
