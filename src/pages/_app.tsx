import { ConnectorLoader, LocalStorageLoader } from "contexts/loaders"
import { ChainList } from "contexts/models/chain"
import store from "contexts/store"
import Header from "layouts/Header"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import ThemeProvider from "Theme"

const CHAIN_CONFIGURATIONS: ChainList = {
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LocalStorageLoader />
      <ConnectorLoader configurations={CHAIN_CONFIGURATIONS} />
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
