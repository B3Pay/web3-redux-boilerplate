import { getChainNameIsAvtive } from "contexts/functions/getChain"
import store from "contexts/store"
import { setConnectModal } from "./setSetting"

export function setChainNameFirst(chainName: string) {
  const isActive = getChainNameIsAvtive(chainName)

  if (!isActive) return setConnectModal(true, chainName)

  store.dispatch.chain.sortChainOrder(chainName)
}
