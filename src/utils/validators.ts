import { getAddress } from "@ethersproject/address"

export const MAX_SAFE_CHAIN_ID = 4503599627370476

export function validateChainId(chains: number[], chainId?: number) {
  if (chainId && isValidChainId(chainId) && chains.includes(chainId)) {
    return chainId
  }

  return chains[0]
}

export function isValidChainId(chainId: number): boolean {
  return (
    Number.isInteger(chainId) && chainId > 0 && chainId <= MAX_SAFE_CHAIN_ID
  )
}

export function validateAccount(account: string): string {
  return getAddress(account)
}
