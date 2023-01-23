import { getIsActiveByChainIds } from "contexts/functions/getConnector"
import { RootState } from "contexts/store"
import { useSelector } from "react-redux"

export default function useChain() {
  return useSelector((state: RootState) => state.chain)
}

export function useChainListObject() {
  return useSelector((state: RootState) => state.chain.list)
}

export function useChainListItem(key: string) {
  const list = useSelector((state: RootState) => state.chain.list[key])
  return (
    list ?? {
      chainIds: [],
      connectors: [],
      chainName: "",
    }
  )
}

export function useInitialized() {
  return useSelector((state: RootState) => state.chain.initialized)
}

export function useChainOrder(withDefault?: boolean) {
  const order = useSelector((state: RootState) => state.chain.order)
  return withDefault ? order : order.filter((item) => item !== "default")
}

export function useChainOrderByIndex(index = 0) {
  return useChainOrder()[index]
}

export function useChainList(withDefault?: boolean) {
  const order = useChainOrder(withDefault)
  const list = useChainListObject()
  return order.map((key) => list[key])
}

export function useSelectedChainName() {
  return useChainOrderByIndex(0)
}

export function useSelectedChainInfo() {
  const selectedChain = useSelectedChainName()
  return useSelector((state: RootState) => state.chain.list[selectedChain])
}

export function useChainActiveConnectorName(key: string) {
  const { chainIds, connectors } = useChainListItem(key)

  return connectors.find((connector) =>
    getIsActiveByChainIds(connector, chainIds)
  )
}

export function useChainNames(withDefault?: boolean) {
  return useChainOrder(withDefault)
}

export function useChainIds(name: string) {
  const chainList = useChainListItem(name)
  return chainList?.chainIds ?? []
}
