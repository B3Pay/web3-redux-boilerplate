import { getIsActiveByChainName } from "contexts/functions/getChain"
import store from "contexts/store"
import { setConnectModal } from "./setSetting"

export function setChainNameFirst(chainName: string) {
  const isActive = getIsActiveByChainName(chainName)

  if (!isActive) return setConnectModal(true, chainName)

  store.dispatch.chain.sortChainOrder(chainName)
}
