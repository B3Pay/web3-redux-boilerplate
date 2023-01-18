import { Web3ReactState } from "@web3-react/types"
import store from "contexts/store"
import { findChainName } from "utils"
import { ConnectorName } from "utils/types"

export function getConnectors() {
  return store.getState().connector
}

export function getConnectorKey() {
  return Object.keys(getConnectors()) as ConnectorName[]
}

export function getConnector(key: ConnectorName) {
  return (
    store.getState().connector[key] ?? {
      chainId: undefined,
      accounts: undefined,
      activating: false,
    }
  )
}

export function getIsActive(key: ConnectorName) {
  const { chainId, accounts, activating } = getConnector(key)

  return computeIsActive({
    chainId,
    accounts,
    activating,
  })
}

export function getAllActiveChainNames() {
  const connectors = getConnectorKey()
  const activeChainNames: string[] = []

  connectors.forEach((connector) => {
    const { chainId } = getConnector(connector)
    if (chainId) {
      const chainName = findChainName(connector, chainId)
      if (chainName !== "default" && !activeChainNames.includes(chainName)) {
        activeChainNames.push(chainName)
      }
    }
  })

  return activeChainNames
}

export function getIsActiveWithChainIds(
  key: ConnectorName,
  chainIds: number[]
) {
  const { chainId, accounts, activating } = getConnector(key)

  return chainIds.some((id) =>
    chainId === id
      ? computeIsActive({
          chainId,
          accounts,
          activating,
        })
      : false
  )
}

export function computeIsActive(state?: Web3ReactState) {
  if (!state) return false
  return Boolean(state.chainId && state.accounts && !state.activating)
}
