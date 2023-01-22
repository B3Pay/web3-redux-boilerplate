import {
  computeIsActive,
  getIsActive,
  getIsActiveWithChainIds,
} from "contexts/functions/getConnector"
import { ConnectorState } from "contexts/types/connector"
import { useSelector } from "react-redux"
import { ConnectorName } from "utils/types"
import { RootState } from "../store"

export default function useConnector() {
  return useSelector((state: RootState) => state.connector)
}

export function useAllConnectorStates() {
  return useSelector((state: RootState) => state.connector)
}

export function useConnectorState(key: ConnectorName) {
  return useSelector((state: RootState) => state.connector[key])
}

export function useAllConnectorNamesArray() {
  const connectors = useAllConnectorStates()
  return Object.keys(connectors) as ConnectorName[]
}

export function useAllConnectorStateArray() {
  const connectors = useAllConnectorStates()
  return Object.values(connectors) as ConnectorState[]
}

export function useAllConnectorArray() {
  const connectors = useAllConnectorStates()
  return Object.entries(connectors) as [ConnectorName, ConnectorState][]
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

export function useConnectorStatesByChainName(name: string) {
  const connectors = useAllConnectorStates()
  return Object.values(connectors).find(({ chainName }) => chainName === name)
}

export function useConnectorNameByChainName(name: string) {
  const connectors = useAllConnectorStates()

  return Object.keys(connectors).find(
    (key) => connectors[key as ConnectorName]?.chainName === name
  ) as ConnectorName
}

export function usePriorityConnector() {
  const keys = useAllConnectorNamesArray()
  const key = keys.find(getIsActive) as ConnectorName
  return useConnectorStates(key)
}
