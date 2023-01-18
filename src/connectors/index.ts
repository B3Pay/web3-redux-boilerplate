import { TronLink } from "@b3pay/tronlink"
import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { EIP1193 } from "@web3-react/eip1193"
import { Empty } from "@web3-react/empty"
import { GnosisSafe } from "@web3-react/gnosis-safe"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { Url } from "@web3-react/url"
import { WalletConnect } from "@web3-react/walletconnect"
import { ChainList } from "contexts/models/chain"
// key should be the same as the file name
export type Web3Connectors = {
  url: Url
  empty: Empty
  eip1193: EIP1193
  network: Network
  injected: MetaMask
  tronlink: TronLink
  gnosisSafe: GnosisSafe
  coinbase: CoinbaseWallet
  walletconnect: WalletConnect
}

export const CHAIN_LIST: ChainList = {
  ethereum: {
    chainName: "ethereum",
    connectors: ["injected", "walletconnect", "coinbase"],
    chainIds: [1, 42161, 80001, 31337],
  },
  binance: {
    chainName: "binance",
    connectors: ["injected", "walletconnect", "coinbase"],
    chainIds: [56, 97],
  },
  avalanche: {
    chainName: "avalanche",
    connectors: ["injected", "walletconnect", "coinbase"],
    chainIds: [43114],
  },
  tron: {
    chainName: "tron",
    connectors: ["tronlink"],
    chainIds: [1000000000],
  },
  default: {
    chainName: "default",
    connectors: ["network"],
    chainIds: [1, 42, 56, 97, 100, 80001, 31337, 43114, 42220],
  },
}
