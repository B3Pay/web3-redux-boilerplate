import store from "contexts/store"
import { ConfigDetail, DefaultChainState } from "contexts/types/chain"
import { ConnectorName } from "utils/types"
import { getAllActiveChainNames } from "./getConnection"

export default function getChainState(): DefaultChainState {
  return store.getState().chain
}

export function getChainConfigState(): DefaultChainState["config"] {
  return getChainState().config
}

export function getChainOrderList(): string[] {
  return getChainState().order
}

export function getChainConfig(chainName: string): ConfigDetail {
  return getChainState().config[chainName]
}

export function getChainNameByIndex(index = 0): string {
  const chainNames = getChainOrderList()

  return chainNames[index]
}

export function getIsActiveByChainName(chainName: string): boolean {
  const activeChainNames = getAllActiveChainNames()

  return activeChainNames.includes(chainName)
}

export function getChainNameByChainId(chainId: number): string | undefined {
  const chainNames = getChainOrderList()

  return chainNames.find((chainName) =>
    getChainConfig(chainName).chainIds.includes(chainId)
  )
}

export function findChainName(
  connectorName: ConnectorName,
  chainId: number
): string {
  if (getDefaultConnectors().includes(connectorName)) {
    return "default"
  }

  const chainName = getChainNameByChainId(chainId)

  if (chainName === undefined) throw new Error("Chain not found")

  return chainName
}

export function getDefaultConnectors(): ConnectorName[] {
  return getChainState().config.default.connectors
}
