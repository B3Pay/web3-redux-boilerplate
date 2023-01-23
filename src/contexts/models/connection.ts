import { createModel } from "@rematch/core"
import { Network } from "@web3-react/network"
import { Actions, Web3ReactStateUpdate } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { findChainName } from "contexts/functions/getChain"
import { getAddChainParameters } from "utils/chains"
import { ConnectorName } from "utils/types"
import { isValidChainId, validateAccount } from "utils/validators"
import { RootModel } from "../store"
import {
  Connection,
  ConnectorCache,
  DefaultConnectionState,
  ErrorPayload,
  Nullifier,
  SwitchChainParams,
  UpdateConnectionParams,
  UpdateWithKeyAndChainName,
} from "../types/connection"

// we save connectors here, because it is too big
// and causes performance issues when serializing
export const connectorCache: ConnectorCache = {}

export const connectionDefaultState: Connection = {
  chainId: undefined,
  accounts: undefined,
  activating: false,
  chainName: undefined,
  error: undefined,
}

const nullifier: Nullifier = {
  url: 0,
  empty: 0,
  eip1193: 0,
  network: 0,
  injected: 0,
  gnosisSafe: 0,
  coinbase: 0,
  tronlink: 0,
  walletconnect: 0,
}

const connection = createModel<RootModel>()({
  name: "connection",
  state: {} as DefaultConnectionState,
  reducers: {
    ADD_CONNECTION: (state, key: ConnectorName) => {
      return {
        ...state,
        [key]: connectionDefaultState,
      }
    },
    RESET_CONNECTION: (state, key: ConnectorName) => {
      return {
        ...state,
        [key]: connectionDefaultState,
      }
    },
    REMOVE_CONNECTION: (state, key: ConnectorName) => {
      const newState = { ...state }
      delete newState[key]
      return newState
    },
    UPDATE_CONNECTION: (state, payload: UpdateWithKeyAndChainName) => {
      const { key } = payload
      // determine the next chainId and accounts
      const chainId = payload.chainId ?? state[key]?.chainId
      const accounts = payload.accounts ?? state[key]?.accounts
      const chainName = payload.chainName ?? state[key]?.chainName
      // ensure that the activating flag is cleared when appropriate
      let activating = state[key]?.activating
      if (activating && chainId && accounts) activating = false

      return {
        ...state,
        [key]: {
          error: undefined,
          chainId,
          accounts,
          activating,
          chainName,
        },
      }
    },
    START_ACTIVATION: (state, key: ConnectorName) => {
      return {
        ...state,
        [key]: { ...state[key], activating: true },
      }
    },
    STOP_ACTIVATION: (state, key: ConnectorName) => {
      return {
        ...state,
        [key]: { ...state[key], activating: false },
      }
    },
    SET_ERROR: (state, payload: ErrorPayload) => {
      const { key, error } = payload
      return {
        ...state,
        [key]: {
          ...state[key],
          error,
        },
      }
    },
  },
  effects: (dispatch) => ({
    initializeConnectors: async (names: ConnectorName[]) => {
      console.log("initializing connectors")
      for await (const name of names) {
        nullifier[name] = 0

        const connectorFile = await import(`connectors/${name}`)
        const connector = connectorFile.default(
          dispatch.connection.connectorActions(name)
        )

        connectorCache[name] = connector

        dispatch.connection.ADD_CONNECTION(name)

        try {
          console.log(`Attempting to connect eagerly to ${name}`)
          if (connector.connectEagerly) await connector.connectEagerly()
          else await connector.activate()
        } catch {
          console.debug(`Failed to connect eagerly to ${name}`)
        }
      }
      dispatch.chain.initializeChain()
    },
    activate: async ({ key, desiredChainId }: UpdateConnectionParams) => {
      console.log(
        `Attempting to connect to ${key} on chainId ${desiredChainId}`
      )
      try {
        const connector = connectorCache[key]
        if (!connector) throw new Error(`Connector ${key} not found`)

        if (connector instanceof WalletConnect || connector instanceof Network)
          await connector.activate(
            desiredChainId === -1 ? undefined : desiredChainId
          )
        else
          await connector.activate(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId)
          )

        dispatch.connection.SET_ERROR({ key, error: undefined })
      } catch (error: any) {
        console.log(error)
        dispatch.connection.SET_ERROR({ key, error })
      }
    },
    addChain: ({ key, desiredChainId }: UpdateConnectionParams) => {
      console.log(
        `Attempting to connect to ${key} on chainId ${desiredChainId}`
      )
      try {
        const connector = connectorCache[key]
        if (!connector) throw new Error(`Connector ${key} not found`)
        const params = getAddChainParameters(desiredChainId)

        connector.provider?.request({
          method: "wallet_addEthereumChain",
          params: [{ ...params, chainId: `0x${desiredChainId.toString(16)}` }],
        })
        dispatch.connection.SET_ERROR({ key, error: undefined })
      } catch (error: any) {
        dispatch.connection.SET_ERROR({ key, error })
      }
    },
    switchChainId: async ({ key, desiredChainId }: SwitchChainParams) => {
      try {
        console.log(`Attempting to switch chain to ${desiredChainId}`)
        const connector = connectorCache[key]
        if (!connector) throw new Error(`Connector ${key} not found`)

        await connector.activate(
          desiredChainId === -1 ? undefined : desiredChainId
        )
      } catch (error: any) {
        dispatch.connection.SET_ERROR({ key, error })
      }
    },
    disconnect: async (key: ConnectorName) => {
      console.log(`Attempting to disconnect from ${key}`)
      const connector = connectorCache[key]
      if (!connector) throw new Error(`Connector ${key} not found`)

      if (connector.deactivate) {
        await connector.deactivate()
      } else {
        await connector.resetState()
      }

      dispatch.chain.sortChainOrder(undefined)
    },
    connectorActions: (key: ConnectorName): Actions => ({
      startActivation: () => {
        const nullifierCached = ++nullifier[key]

        dispatch.connection.START_ACTIVATION(key)
        // return a function that cancels the activation iff nothing else has happened
        return () => {
          if (nullifier[key] === nullifierCached)
            dispatch.connection.STOP_ACTIVATION(key)
        }
      },
      update: (payload: Web3ReactStateUpdate) => {
        const updateState: UpdateWithKeyAndChainName = {
          key,
          chainName: undefined,
          ...payload,
        }

        if (payload.accounts !== undefined && key !== "tronlink") {
          updateState.accounts = []
          for (let i = 0; i < payload.accounts.length; i++) {
            updateState.accounts[i] = validateAccount(payload.accounts[i])
          }
        }
        // validate chainId statically, independent of existing state
        if (payload.chainId !== undefined && isValidChainId(payload.chainId)) {
          updateState.chainId = payload.chainId
          updateState.chainName = findChainName(key, payload.chainId)
        }

        nullifier[key]++
        dispatch.connection.UPDATE_CONNECTION({ ...updateState, key })

        dispatch.chain.sortChainOrder(updateState.chainName)
      },
      resetState: () => {
        nullifier[key]++
        dispatch.connection.RESET_CONNECTION(key)
      },
    }),
  }),
})

export default connection
