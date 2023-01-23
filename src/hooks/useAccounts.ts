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
      connectors.reduce((acc, { chainName, accounts }) => {
        if (accounts?.length && chainName) {
          accounts.forEach((account) => {
            acc.push({
              chainName,
              account,
            })
          })
        }
        return acc
      }, [] as { chainName: string; account: string }[]),
    [connectors]
  )
}
