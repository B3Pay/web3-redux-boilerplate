import { BigNumber } from "ethers"
import { formatEther, formatUnits } from "ethers/lib/utils"
import { CHAINS } from "./chains"

export function getEllipsis(str?: string, s = 4, e = 4) {
  if (!str) return ""
  return str.slice(0, s) + "..." + str.slice(-e)
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function getChainName(chainId?: number) {
  if (chainId === undefined) return null
  return CHAINS[chainId]?.name || chainId
}

export function formatBalance(value?: BigNumber | number) {
  if (!value) return "0.00"
  if (typeof value === "number") return formatUnits(value, 6)
  // fixed to 4 decimal places
  return value.isZero()
    ? "0.00"
    : value.lt(1000000)
    ? "LOW"
    : formatEther(value).slice(0, 7)
}
