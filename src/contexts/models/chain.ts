import { createModel } from "@rematch/core"
import { getActiveChainList } from "contexts/helpers/getConnection"
import {
  ChainConfig,
  ConfigDetail,
  DefaultChainState,
} from "contexts/types/chain"
import { RootModel } from "../store"

const chainDetail: ConfigDetail = {
  chain: "ethereum",
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

      const chainList: string[] = [...order]
      const activeChainNames: string[] = getActiveChainList()

      order.forEach((chain) => {
        if (!activeChainNames.includes(chain)) {
          chainList.splice(chainList.indexOf(chain), 1)
          chainList.push(chain)
        }
      })

      if (firstItem) {
        chainList.splice(chainList.indexOf(firstItem), 1)
        chainList.unshift(firstItem)
      }

      dispatch.chain.UPDATE_ORDER(chainList)
    },
  }),
})

export default chain
