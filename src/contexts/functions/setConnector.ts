import { CHAIN_LIST } from "connectors"
import store from "contexts/store"
import { ConnectorName } from "utils/types"

export function initializeConnectors() {
  // get unique connectors from CONNECTOR_CONFIG
  const uniqueConnectors = Object.values(CHAIN_LIST).reduce(
    (acc, { connectors }) => {
      connectors.forEach((connector) => {
        if (!acc.includes(connector)) {
          acc.unshift(connector)
        }
      })
      return acc
    },
    [] as ConnectorName[]
  )

  store.dispatch.chain.UPDATE_CHAIN_LIST(CHAIN_LIST)
  store.dispatch.connector.initializeConnectors(uniqueConnectors)
}

export function connectorActivate(key: ConnectorName, desiredChainId: number) {
  return store.dispatch.connector.activate({ key, desiredChainId })
}

export function connectorSwitchChain(
  key: ConnectorName,
  desiredChainId: number
) {
  return store.dispatch.connector.switchChainId({ key, desiredChainId })
}

export function connectorAddChain(key: ConnectorName, desiredChainId: number) {
  return store.dispatch.connector.addChain({ key, desiredChainId })
}

export function connectorDisconnect(key: ConnectorName) {
  store.dispatch.connector.disconnect(key)
}

export function connectorRemove(key: ConnectorName) {
  store.dispatch.connector.REMOVE_CONNECTOR(key)
}
