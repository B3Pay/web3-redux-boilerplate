import store from "contexts/store"
import { ConnectorName } from "utils/types"

export function connectorActivate(key: ConnectorName, desiredChainId: number) {
  return store.dispatch.connection.activate({ key, desiredChainId })
}

export function connectorSwitchChain(
  key: ConnectorName,
  desiredChainId: number
) {
  return store.dispatch.connection.switchChainId({ key, desiredChainId })
}

export function connectorAddChain(key: ConnectorName, desiredChainId: number) {
  return store.dispatch.connection.addChain({ key, desiredChainId })
}

export function connectorDisconnect(key: ConnectorName) {
  store.dispatch.connection.disconnect(key)
}

export function connectorRemove(key: ConnectorName) {
  store.dispatch.connection.REMOVE_CONNECTION(key)
}
