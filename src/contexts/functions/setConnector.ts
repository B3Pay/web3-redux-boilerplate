import store from "contexts/store"
import { ConnectorName } from "utils/types"

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
