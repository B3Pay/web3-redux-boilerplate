import { usePriorityConnector } from "contexts/hooks"

export function useAccounts(): string[] | undefined {
  const web3 = usePriorityConnector()
  return web3?.accounts
}

export function useAccount(): string | undefined {
  return useAccounts()?.[0]
}
