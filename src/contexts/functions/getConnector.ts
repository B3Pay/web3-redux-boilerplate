import { Web3ReactState } from "@web3-react/types"
import store from "contexts/store"
import { getChainNativeCurrency } from "utils/chains"
import { ConnectorName } from "utils/types"
import { findChainName } from "./getChain"

export function getConnectors() {
  return store.getState().connector
}

export function getConnector(connectorName: ConnectorName) {
  return store.getState().connector[connectorName]
}

export function getConnectorNames() {
  return Object.keys(getConnectors()) as ConnectorName[]
}

export function getConnectorStates(connectorName: ConnectorName) {
  return (
    getConnector(connectorName) ?? {
      chainId: undefined,
      accounts: undefined,
      activating: false,
      chainName: "default",
    }
  )
}

export function getConnectorNameByChainName(chainName: string) {
  const connectorNames = getConnectorNames()

  return connectorNames.find(
    (connectorName) => getConnectorStates(connectorName).chainName === chainName
  )
}

export function getChainIdByChainName(chainName: string) {
  const connector = getConnectorNameByChainName(chainName)

  if (!connector) return undefined

  return getConnectorStates(connector).chainId
}

export function getNativeCurrencyByChainName(chainName: string) {
  const chainId = getChainIdByChainName(chainName)

  if (!chainId) return undefined

  return getChainNativeCurrency(chainId)
}

export function getAllActiveChainNames() {
  const connectorNames = getConnectorNames()
  const activeChainNames: string[] = []

  connectorNames.forEach((connectorName) => {
    const { chainId } = getConnectorStates(connectorName)
    if (chainId) {
      const chainName = findChainName(connectorName, chainId)
      if (chainName !== "default" && !activeChainNames.includes(chainName)) {
        activeChainNames.push(chainName)
      }
    }
  })

  return activeChainNames
}

export function getIsActiveByChainIds(
  connectorName: ConnectorName,
  chainIds: number[]
) {
  const { chainId, accounts, activating } = getConnectorStates(connectorName)

  return chainIds.some(
    (id) =>
      chainId === id &&
      computeIsActive({
        chainId,
        accounts,
        activating,
      })
  )
}

export function getIsActive(connectorName: ConnectorName) {
  const { chainId, accounts, activating } = getConnectorStates(connectorName)

  return computeIsActive({
    chainId,
    accounts,
    activating,
  })
}

export function computeIsActive(state?: Web3ReactState) {
  if (!state) return false
  return Boolean(state.chainId && state.accounts && !state.activating)
}
