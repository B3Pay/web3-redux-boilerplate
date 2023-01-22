import { getChainNameIsActive } from "contexts/functions/getChain"
import store from "contexts/store"
import { setConnectModal } from "./setSetting"

export function setChainNameFirst(chainName: string) {
  const isActive = getChainNameIsActive(chainName)

  if (!isActive) return setConnectModal(true, chainName)

  store.dispatch.chain.sortChainOrder(chainName)
}
