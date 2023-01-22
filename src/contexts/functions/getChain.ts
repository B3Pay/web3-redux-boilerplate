import store from "contexts/store"
import { getAllActiveChainNames } from "./getConnector"

export function getDefaultConnectors() {
  return store.getState().chain.list.default.connectors
}

export function getChainDetails(chainName: string) {
  return store.getState().chain.list[chainName]
}

export function getChainNameByChainId(chainId: number) {
  const chainList = getChainList()

  return Object.keys(chainList).find((key) =>
    chainList[key].chainIds.includes(chainId)
  )
}

export function getChainsInfo() {
  return store.getState().chain
}

export function getChainOrder() {
  return store.getState().chain.order
}

export function getChainList() {
  return store.getState().chain.list
}

export function getChainInitialed() {
  return store.getState().chain.initialized
}

export function getFirstChainName() {
  const chainNames = getChainOrder()

  return chainNames[0]
}

export function getChainNameIsActive(chainName: string) {
  const activeChainNames = getAllActiveChainNames()

  return activeChainNames.includes(chainName)
}

export function getSortedChainNames(beFirst: string | undefined = undefined) {
  const currentOrder: string[] = getChainOrder()
  const chainNames: string[] = [...currentOrder]
  const activeChainNames: string[] = getAllActiveChainNames()

  currentOrder.forEach((chainName) => {
    if (!activeChainNames.includes(chainName)) {
      chainNames.splice(chainNames.indexOf(chainName), 1)
      chainNames.push(chainName)
    }
  })

  if (beFirst) {
    chainNames.splice(chainNames.indexOf(beFirst), 1)
    chainNames.unshift(beFirst)
  }

  return chainNames
}
