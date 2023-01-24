import { ConnectorName } from "utils/types"

export type InitConfigDetail = {
  chainIds: number[]
  name: string
  connectors: ConnectorName[]
}

export type ConfigDetail = {
  chain: string
  chainIds: number[]
  name: string
  connectors: ConnectorName[]
}

export type InitialConfig = {
  [key: string]: InitConfigDetail
  default: InitConfigDetail
}

export type ChainConfig = {
  [key: string]: ConfigDetail
  default: ConfigDetail
}

export interface DefaultChainState {
  initialized: boolean
  config: ChainConfig
  order: string[]
}

export type ChangeOrderParams = {
  chainId: number
  connectorName: ConnectorName
}
