import { createModel } from "@rematch/core"
import { getAllActiveChainNames } from "contexts/functions/getConnector"
import { ConnectorName } from "utils/types"
import { RootModel } from "../store"

export type ChainInfoWithKey = Partial<ChainInfo> & {
  key: string
}

export type ChainList = {
  [key: string]: ChainInfo
  default: ChainInfo
}

export type ChainInfo = {
  chainIds: number[]
  chainName: string
  connectors: ConnectorName[]
}

export interface DefaultChainState {
  initialized: boolean
  list: ChainList
  order: string[]
}

export type ChangeOrderParams = {
  chainId: number
  connectorName: ConnectorName
}

const chainStatus: ChainInfo = {
  chainIds: [1],
  chainName: "ethereum",
  connectors: ["network"],
}

const chain = createModel<RootModel>()({
  name: "chain",
  state: {
    order: ["ethereum"],
    initialized: false,
    list: {
      default: chainStatus,
    },
  } as DefaultChainState,

  reducers: {
    REMOVE: (state, key: string) => {
      const list = { ...state.list }
      delete list[key]
      const order = state.order.filter((item) => item !== key)
      return { ...state, order, list }
    },
    SET_INITIALIZED: (state) => {
      return { ...state, initialized: true }
    },
    UPDATE_CHAIN_LIST: (state, list: ChainList) => {
      const order = Object.keys(list)
      return {
        ...state,
        order,
        list,
      }
    },
    UPDATE_LIST_ITEM: (state, payload: ChainInfoWithKey) => {
      const { key, ...rest } = payload

      return {
        ...state,
        list: {
          ...state.list,
          [key]: {
            ...state.list[key],
            ...rest,
          },
        },
      }
    },
    UPDATE_ORDER: (state, payload: string[]) => {
      return {
        ...state,
        order: payload,
      }
    },
  },
  effects: (dispatch) => ({
    initializeChain: () => {
      dispatch.chain.SET_INITIALIZED()
      dispatch.chain.sortChainOrder(undefined)
    },
    sortChainOrder(firstItem: string | undefined, state) {
      const { initialized, order } = state.chain
      if (!initialized) return

      const chainNames: string[] = [...order]
      const activeChainNames: string[] = getAllActiveChainNames()

      order.forEach((chainName) => {
        if (!activeChainNames.includes(chainName)) {
          chainNames.splice(chainNames.indexOf(chainName), 1)
          chainNames.push(chainName)
        }
      })

      if (firstItem) {
        chainNames.splice(chainNames.indexOf(firstItem), 1)
        chainNames.unshift(firstItem)
      }

      dispatch.chain.UPDATE_ORDER(chainNames)
    },
  }),
})

export default chain
