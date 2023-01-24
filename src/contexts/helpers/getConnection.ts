import { AddEthereumChainParameter, Web3ReactState } from "@web3-react/types"
import store from "contexts/store"
import {
  Connection,
  ConnectionStateWithActive,
  DefaultConnectionState,
} from "contexts/types/connection"
import { getNativeCurrencyByChainId } from "utils/chains"
import { ConnectorName } from "utils/types"
import { getChainByConnectorNameAndChainId } from "./getChain"

export function getConnectionState(): DefaultConnectionState {
  return store.getState().connection
}

export function getConnectorNameList(): ConnectorName[] {
  const connection = getConnectionState()
  return Object.keys(connection) as ConnectorName[]
}

export function getConnection(connectorName: ConnectorName): Connection {
  const connection = store.getState().connection[connectorName]

  return (
    connection || {
      chainId: undefined,
      accounts: undefined,
      activating: false,
      chain: undefined,
      error: undefined,
    }
  )
}

export function getConnectionWithIsActive(
  connectorName: ConnectorName
): ConnectionStateWithActive {
  const states = getConnection(connectorName)

  const isActive = computeConnectionIsActive(states)

  return {
    ...states,
    isActive,
  }
}

export function getChainActiveConnectorName(
  chain: string
): ConnectorName | undefined {
  const connectorNames = getConnectorNameList()

  return connectorNames.find(
    (connectorName) => getConnection(connectorName).chain === chain
  )
}

export function getChainChainId(chain: string): number | undefined {
  const connector = getChainActiveConnectorName(chain)

  if (!connector) return undefined

  return getConnection(connector).chainId
}

export function getChainNativeCurrency(
  chain: string
): AddEthereumChainParameter["nativeCurrency"] | undefined {
  const chainId = getChainChainId(chain)

  if (!chainId) return undefined

  return getNativeCurrencyByChainId(chainId)
}

export function getActiveChainList(): string[] {
  const connectorNames = getConnectorNameList()
  const activeChainNames: string[] = []

  connectorNames.forEach((connectorName) => {
    const { chainId } = getConnection(connectorName)
    if (chainId) {
      const chain = getChainByConnectorNameAndChainId(connectorName, chainId)
      if (chain !== "default" && !activeChainNames.includes(chain)) {
        activeChainNames.push(chain)
      }
    }
  })

  return activeChainNames
}

export function getConnectionIsActiveByChainIds(
  connectorName: ConnectorName,
  chainIds: number[]
): boolean {
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

export function getConnectionIsActive(connectorName: ConnectorName): boolean {
  const { chainId, accounts, activating } = getConnection(connectorName)

  return computeConnectionIsActive({
    chainId,
    accounts,
    activating,
  })
}

export function computeConnectionIsActive(state?: Web3ReactState): boolean {
  if (!state) return false
  return Boolean(state.chainId && state.accounts && !state.activating)
}
