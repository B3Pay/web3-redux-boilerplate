import type { BigNumber } from "@ethersproject/bignumber"
import { useEffect, useState } from "react"
import { useProviderByChainName } from "./useProvider"

function useBalances(
  chain: string,
  accounts?: string[]
): BigNumber[] | number[] | undefined {
  const provider = useProviderByChainName(chain)

  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (stale) return
        setBalances(balances)
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

export default useBalances
