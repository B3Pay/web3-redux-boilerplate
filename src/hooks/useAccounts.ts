import {
  useAllConnectorStateArray,
  usePriorityConnector,
} from "contexts/hooks/useConnector"
import { useMemo } from "react"

export function useAccounts(): string[] | undefined {
  const web3 = usePriorityConnector()
  return web3?.accounts
}

export function useAccount(): string | undefined {
  return useAccounts()?.[0]
}

export function useAllAccounts() {
  const connectors = useAllConnectorStateArray()

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
