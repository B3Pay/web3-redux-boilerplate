import { getChainIsActive } from "contexts/helpers/getChain"
import store from "contexts/store"
import { setConnectModal } from "./setSetting"

export function setChainFirstOrder(chain: string) {
  const isActive = getChainIsActive(chain)

  if (!isActive) return setConnectModal(true, chain)

  store.dispatch.chain.sortChainOrder(chain)
}
