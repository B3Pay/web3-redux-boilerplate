import store from "contexts/store"
import { ConfigDetail, DefaultChainState } from "contexts/types/chain"
import { ConnectorName } from "utils/types"
import { getActiveChainList } from "./getConnection"

export default function getChainState(): DefaultChainState {
  return store.getState().chain
}

export function getChainConfigState(): DefaultChainState["config"] {
  return getChainState().config
}

export function getChainList(): string[] {
  return getChainState().order
}

export function getChainConfig(chain: string): ConfigDetail {
  return getChainState().config[chain]
}

export function getSelectedChain(): string {
  const chainList = getChainList()

  return chainList[0]
}

export function getChainIsActive(chain: string): boolean {
  const activeChainNames = getActiveChainList()

  return activeChainNames.includes(chain)
}

export function getChainByChainId(chainId: number): string | undefined {
  const chainList = getChainList()

  return chainList.find((chain) =>
    getChainConfig(chain).chainIds.includes(chainId)
  )
}

export function getChainByConnectorNameAndChainId(
  connectorName: ConnectorName,
  chainId: number
): string {
  if (getDefaultConnectors().includes(connectorName)) {
    return "default"
  }

  const chain = getChainByChainId(chainId)

  if (chain === undefined) throw new Error("Chain not found")

  return chain
}

export function getDefaultConnectors(): ConnectorName[] {
  return getChainState().config.default.connectors
}
