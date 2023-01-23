import {
  computeConnectionIsActive,
  getConnectionIsActive,
  getConnectionIsActiveByChainIds,
} from "contexts/functions/getConnection"
import {
  Connection,
  ConnectionStateWithActive,
  DefaultConnectionState,
} from "contexts/types/connection"
import { useSelector } from "react-redux"
import { ConnectorName } from "utils/types"
import { RootState } from "../store"

export default function useConnectionState(): DefaultConnectionState {
  return useSelector((state: RootState) => state.connection)
}

export function useConnectionNameList(): ConnectorName[] {
  const connection = useConnectionState()
  return Object.keys(connection) as ConnectorName[]
}

export function useConnectionStateList(): Connection[] {
  const connection = useConnectionState()
  return Object.values(connection)
}

export function useConnectionDetail(connectorName: ConnectorName): Connection {
  const connection = useSelector(
    (state: RootState) => state.connection[connectorName]
  )
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

export function useConnection(
  connectorName: ConnectorName
): ConnectionStateWithActive {
  const states = useConnectionDetail(connectorName)

  const isActive = computeConnectionIsActive(states)

  return {
    ...states,
    isActive,
  }
}

export function useConnectionWithChainIds(
  connectorName: ConnectorName,
  chainIds: number[]
): ConnectionStateWithActive {
  const states = useConnection(connectorName)

  const isActive = getConnectionIsActiveByChainIds(connectorName, chainIds)

  return {
    ...states,
    isActive,
  }
}

export function useConnectionByChainName(name: string): Connection | undefined {
  const connectionList = useConnectionStateList()
  return connectionList.find(({ chainName }) => chainName === name)
}

export function useConnectionNameByChainName(
  name: string
): ConnectorName | undefined {
  const connection = useConnectionState()

  return Object.keys(connection).find(
    (connectorName) =>
      connection[connectorName as ConnectorName]?.chainName === name
  ) as ConnectorName
}

export function usePriorityConnection(): ConnectionStateWithActive {
  const keys = useConnectionNameList()
  const connectorName = keys.find(getConnectionIsActive) as ConnectorName
  return useConnection(connectorName)
}
