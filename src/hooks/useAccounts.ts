import {
  useConnectionStateList,
  usePriorityConnection,
} from "contexts/hooks/useConnection"
import { useMemo } from "react"

export function useAccounts(): string[] | undefined {
  const web3 = usePriorityConnection()
  return web3?.accounts
}

export function useAccount(): string | undefined {
  return useAccounts()?.[0]
}

export function useAllAccounts() {
  const connectors = useConnectionStateList()

  return useMemo(
    () =>
      connectors.reduce((acc, { chain, accounts }) => {
        if (accounts?.length && chain) {
          accounts.forEach((account) => {
            acc.push({
              chain,
              account,
            })
          })
        }
        return acc
      }, [] as { chain: string; account: string }[]),
    [connectors]
  )
}
