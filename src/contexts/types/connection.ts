import type {
  BaseProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers"
import type {
  Connector,
  Web3ReactState,
  Web3ReactStateUpdate,
} from "@web3-react/types"
import type {
  AbstractConnectorArguments,
  ConnectorUpdate,
} from "@web3-react/types6"
import type { EventEmitter } from "events"
import type { ConnectionType, ConnectorName } from "utils/types"

export type DefaultConnectionState = {
  [key in ConnectorName]?: Connection
}

export interface Web3Error extends Error {
  code: number
  data?: any
  message: string
}

export declare abstract class AbstractConnector extends EventEmitter {
  readonly supportedChainIds?: number[]
  constructor({ supportedChainIds }?: AbstractConnectorArguments)
  abstract activate(): Promise<ConnectorUpdate>
  abstract getProvider(): Promise<any>
  abstract getChainId(): Promise<number | string>
  abstract getAccount(): Promise<null | string>
  abstract deactivate(): void
  protected emitUpdate(update: ConnectorUpdate): void
  protected emitError(error: Web3Error): void
  protected emitDeactivate(): void
}

export type ConnectorWithKey = {
  connector: ConnectionType
  key: ConnectorName
}

export interface Web3ReactUpdateState {
  chainId: number
  accounts: string[]
  activating: boolean
}

export type Web3ReactStateWithKey = Web3ReactStateUpdate & {
  key: ConnectorName
}

export type UpdateWithKeyAndChainName = Web3ReactStateUpdate & {
  key: ConnectorName
  chain: string | undefined
}

export type Web3ReactStateWithConnector = Web3ReactStateWithKey & {
  connector: ConnectorName
}

export interface Connection extends Web3ReactState {
  error: Web3Error | undefined
  chain: string | undefined
}

export interface ConnectionStateWithActive extends Connection {
  isActive: boolean
}

export type ConnectorCache = {
  [key in ConnectorName]?: ConnectionType
}

export type Nullifier = {
  [key in ConnectorName]: number
}

export type Connections = {
  [key in ConnectorName]?: Connection
}

/**
 * @typeParam T - A type argument must only be provided if one or more of the connectors passed to Web3ReactProvider
 * is using `connector.customProvider`, in which case it must match every possible type of this
 * property, over all connectors.
 */
export type Web3ContextType<T extends BaseProvider = Web3Provider> = {
  connector: Connector
  chainId: number | undefined
  accounts: string[] | undefined
  activating: boolean
  isActive: boolean
  provider: T | undefined
  signer: JsonRpcSigner | undefined
}

export type UpdateConnectionParams = {
  key: ConnectorName
  desiredChainId: number
}

export type SwitchChainParams = {
  key: ConnectorName
  chainId?: number
  desiredChainId?: number
}

export type ErrorPayload = {
  key: ConnectorName
  error: Web3Error | undefined
}
