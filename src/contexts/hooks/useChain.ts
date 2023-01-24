import { getConnectionIsActiveByChainIds } from "contexts/helpers/getConnection"
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

export function useChainList(withDefault?: boolean): string[] {
  const order = useSelector((state: RootState) => state.chain.order)
  return withDefault ? order : order.filter((item) => item !== "default")
}

export function useChainConfigList(withDefault?: boolean): ConfigDetail[] {
  const chainList = useChainList(withDefault)
  const configList = useChainConfigState()

  return chainList.map((chain) => configList[chain])
}

export function useChainConfig(chain: string): ConfigDetail {
  const config = useSelector((state: RootState) => state.chain.config[chain])
  return (
    config ?? {
      chainIds: [],
      connectors: [],
      name: "",
      chain,
    }
  )
}

export function useSelectedChain(): string {
  return useSelector((state: RootState) => state.chain.order[0])
}

export function useSelectedChainName(): string {
  const chain = useSelectedChain()

  return useChainConfig(chain).name
}

export function useSelectedChainConfig(): ConfigDetail {
  const chain = useSelectedChain()

  return useChainConfig(chain)
}

export function useChainActiveConnectorName(chain: string): ConnectorName {
  const { chainIds, connectors } = useChainConfig(chain)

  return connectors.find((connector) =>
    getConnectionIsActiveByChainIds(connector, chainIds)
  ) as ConnectorName
}
