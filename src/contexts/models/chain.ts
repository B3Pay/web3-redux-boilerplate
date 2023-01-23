import { createModel } from "@rematch/core"
import { getAllActiveChainNames } from "contexts/functions/getConnection"
import {
  ChainConfig,
  ConfigDetail,
  DefaultChainState,
  PartialConfigDetail,
} from "contexts/types/chain"
import { RootModel } from "../store"

const chainDetail: ConfigDetail = {
  key: "ethereum",
  chainIds: [1],
  name: "Ethereum",
  connectors: ["network"],
}

const chain = createModel<RootModel>()({
  name: "chain",
  state: {
    order: ["ethereum"],
    initialized: false,
    config: {
      default: chainDetail,
    },
  } as DefaultChainState,

  reducers: {
    REMOVE: (state, key: string) => {
      const config = { ...state.config }
      delete config[key]
      const order = state.order.filter((item) => item !== key)
      return { ...state, order, config }
    },
    SET_INITIALIZED: (state) => {
      return { ...state, initialized: true }
    },
    ADD_CONFIG: (state, config: ChainConfig) => {
      const order = Object.keys(config)
      return {
        ...state,
        order,
        config,
      }
    },
    UPDATE_CONFIG: (state, payload: PartialConfigDetail) => {
      const { key, ...rest } = payload

      return {
        ...state,
        config: {
          ...state.config,
          [key]: {
            ...state.config[key],
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
