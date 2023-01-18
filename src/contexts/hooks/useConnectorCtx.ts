import {
  computeIsActive,
  getIsActive,
  getIsActiveWithChainIds,
} from "contexts/functions/getConnector"
import { useSelector } from "react-redux"
import { ConnectorName } from "utils/types"
import { RootState } from "../store"

export default function useConnectorCtx() {
  return useSelector((state: RootState) => state.connector)
}

export function useConnectorState(key: ConnectorName) {
  return useSelector((state: RootState) => state.connector[key])
}

export function useAllConnectorStates() {
  return useSelector((state: RootState) => state.connector)
}

export function useConnectorStates(key: ConnectorName) {
  const states = useConnectorState(key)

  const isActive = computeIsActive(states)

  return {
    ...states,
    isActive,
  }
}

export function useConnectorStatesWithChainIds(
  key: ConnectorName,
  chainIds: number[]
) {
  const states = useConnectorState(key)

  const isActive = getIsActiveWithChainIds(key, chainIds)

  return {
    ...states,
    isActive,
  }
}

export function useConnectorKeys() {
  const connectors = useAllConnectorStates()
  return Object.keys(connectors) as ConnectorName[]
}

export function usePriorityConnector() {
  const keys = useConnectorKeys()
  const key = keys.find(getIsActive) as ConnectorName
  return useConnectorStates(key)
}
