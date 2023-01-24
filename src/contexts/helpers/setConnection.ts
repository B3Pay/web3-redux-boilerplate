import store from "contexts/store"
import { ConnectorName } from "utils/types"

export function setConnectionActivate(
  key: ConnectorName,
  desiredChainId: number
) {
  return store.dispatch.connection.activate({ key, desiredChainId })
}

export function setConnectionSwitchChain(
  key: ConnectorName,
  desiredChainId: number
) {
  return store.dispatch.connection.switchChainId({ key, desiredChainId })
}

export function setConnectionAddChain(
  key: ConnectorName,
  desiredChainId: number
) {
  return store.dispatch.connection.addChain({ key, desiredChainId })
}

export function setConnectionDisconnect(key: ConnectorName) {
  store.dispatch.connection.disconnect(key)
}

export function setConnectionRemove(key: ConnectorName) {
  store.dispatch.connection.REMOVE_CONNECTION(key)
}
