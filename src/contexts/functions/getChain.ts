import store from "contexts/store"
import { ConnectorName } from "utils/types"
import { getAllActiveChainNames } from "./getConnector"

export function getDefaultConnectors() {
  return store.getState().chain.list.default.connectors
}

export function getChainOrder() {
  return store.getState().chain.order
}

export function getChainList() {
  return store.getState().chain.list
}

export function getChainDetails(chainName: string) {
  return store.getState().chain.list[chainName]
}

export function getChainNameByChainId(chainId: number) {
  const chainNames = getChainOrder()

  return chainNames.find((chainName) =>
    getChainDetails(chainName).chainIds.includes(chainId)
  )
}

export function getChainNameByIndex(index = 0) {
  const chainNames = getChainOrder()

  return chainNames[index]
}

export function getIsActiveByChainName(chainName: string) {
  const activeChainNames = getAllActiveChainNames()

  return activeChainNames.includes(chainName)
}

export function findChainName(connectorName: ConnectorName, chainId: number) {
  if (getDefaultConnectors().includes(connectorName)) {
    return "default"
  }

  const chainName = getChainNameByChainId(chainId)

  if (chainName === undefined) throw new Error("Chain not found")

  return chainName
}
