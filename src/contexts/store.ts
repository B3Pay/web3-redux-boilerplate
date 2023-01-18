import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core"
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading"
import chain from "./models/chain"
import connector from "./models/connector"
import contract from "./models/contract"
import setting from "./models/setting"
import wallet from "./models/wallet"

export type Store = typeof store

type FullModel = ExtraModelsFromLoading<RootModel>

export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>

export interface RootModel extends Models<RootModel> {
  chain: typeof chain
  wallet: typeof wallet
  setting: typeof setting
  contract: typeof contract
  connector: typeof connector
}

export const models: RootModel = {
  chain,
  wallet,
  setting,
  contract,
  connector,
}

const store = init<RootModel, FullModel>({ models, plugins: [loadingPlugin()] })

export default store
