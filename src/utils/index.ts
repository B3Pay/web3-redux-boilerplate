import { CHAIN_LIST } from "connectors"
import { BigNumber } from "ethers"
import { formatEther, formatUnits } from "ethers/lib/utils"
import { CHAINS } from "./chains"
import { ConnectorName } from "./types"

export function getEllipsis(str?: string, s = 4, e = 4) {
  if (!str) return ""
  return str.slice(0, s) + "..." + str.slice(-e)
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function findChainName(connectorName: ConnectorName, chainId: number) {
  let chainName: string | undefined

  if (CHAIN_LIST.default.connectors.includes(connectorName)) {
    return "default"
  }

  chainName = Object.keys(CHAIN_LIST).find((key) =>
    CHAIN_LIST[key].chainIds.includes(chainId)
  )

  if (chainName === undefined) throw new Error("Chain not found")

  return chainName
}

export function getChainName(chainId?: number) {
  if (chainId === undefined) return null
  return CHAINS[chainId]?.name || chainId
}

export function formatBalance(connectorName: string, value?: BigNumber) {
  if (!value) return `0.00`
  if (connectorName === "tronlink") return `₮${formatUnits(value, 6)}`
  // fixed to 4 decimal places
  return `Ξ${
    value.isZero()
      ? "0.00"
      : value.lt(1000000)
      ? "LOW"
      : formatEther(value).slice(0, 7)
  }`
}
