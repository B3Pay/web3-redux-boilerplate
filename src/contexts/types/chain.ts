import { ConnectorName } from "utils/types"

export type PartialConfigDetail = Partial<ChainConfig> & {
  key: string
}

export type InitialConfig = {
  [key: string]: {
    chainIds: number[]
    name: string
    connectors: ConnectorName[]
  }
  default: {
    chainIds: number[]
    name: string
    connectors: ConnectorName[]
  }
}

export type ChainConfig = {
  [key: string]: ConfigDetail
  default: ConfigDetail
}

export type ConfigDetail = {
  key: string
  chainIds: number[]
  name: string
  connectors: ConnectorName[]
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
