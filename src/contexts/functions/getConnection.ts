import { Web3ReactState } from "@web3-react/types"
import store from "contexts/store"
import {
  Connection,
  ConnectionStateWithActive,
  DefaultConnectionState,
} from "contexts/types/connection"
import { getChainNativeCurrency } from "utils/chains"
import { ConnectorName } from "utils/types"
import { findChainName } from "./getChain"

export function getConnectionState(): DefaultConnectionState {
  return store.getState().connection
}

export function getConnectorNameList(): ConnectorName[] {
  const connection = getConnectionState()
  return Object.keys(connection) as ConnectorName[]
}

export function getConnectionDetail(connectorName: ConnectorName): Connection {
  const connection = store.getState().connection[connectorName]

  return (
    connection || {
      chainId: undefined,
      accounts: undefined,
      activating: false,
      chainName: undefined,
      error: undefined,
    }
  )
}

export function getConnection(
  connectorName: ConnectorName
): ConnectionStateWithActive {
  const states = getConnectionDetail(connectorName)

  const isActive = computeConnectionIsActive(states)

  return {
    ...states,
    isActive,
  }
}

export function getConnectorNameByChainName(chainName: string) {
  const connectorNames = getConnectorNameList()

  return connectorNames.find(
    (connectorName) => getConnection(connectorName).chainName === chainName
  )
}

export function getChainIdByChainName(chainName: string) {
  const connector = getConnectorNameByChainName(chainName)

  if (!connector) return undefined

  return getConnection(connector).chainId
}

export function getNativeCurrencyByChainName(chainName: string) {
  const chainId = getChainIdByChainName(chainName)

  if (!chainId) return undefined

  return getChainNativeCurrency(chainId)
}

export function getAllActiveChainNames() {
  const connectorNames = getConnectorNameList()
  const activeChainNames: string[] = []

  connectorNames.forEach((connectorName) => {
    const { chainId } = getConnection(connectorName)
    if (chainId) {
      const chainName = findChainName(connectorName, chainId)
      if (chainName !== "default" && !activeChainNames.includes(chainName)) {
        activeChainNames.push(chainName)
      }
    }
  })

  return activeChainNames
}

export function getConnectionIsActiveByChainIds(
  connectorName: ConnectorName,
  chainIds: number[]
) {
  const { chainId, accounts, activating } = getConnection(connectorName)

  return chainIds.some(
    (id) =>
      chainId === id &&
      computeConnectionIsActive({
        chainId,
        accounts,
        activating,
      })
  )
}

export function getConnectionIsActive(connectorName: ConnectorName) {
  const { chainId, accounts, activating } = getConnection(connectorName)

  return computeConnectionIsActive({
    chainId,
    accounts,
    activating,
  })
}

export function computeConnectionIsActive(state?: Web3ReactState) {
  if (!state) return false
  return Boolean(state.chainId && state.accounts && !state.activating)
}
