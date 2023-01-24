import type { Connector } from "@web3-react/types"
import type { Web3Connectors } from "connectors"

export type ConnectorName = keyof Web3Connectors

export type ConnectionArray = ConnectorName[]

export type NeededConnection = Array<ConnectorName>

export type ConnectionType = Web3Connectors[ConnectorName] | Connector

export type ConnectionDetails = ConnectionDetail[]

export type ConnectionDetail = {
  name: ConnectorName
  icon: string
  connector: ConnectionType
}

export type ConnectionDetailFunction<T extends ConnectorName> = {
  name: T
  icon: string
  connector: Web3Connectors[T]
}

export type InitialConnectionDetail = {
  name: ConnectorName
  chain: string
}
