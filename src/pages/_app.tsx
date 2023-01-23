import ConnectorLoading from "components/ConnectorLoading"
import { ConnectorLoader, LocalStorageLoader } from "contexts/loaders"
import store from "contexts/store"
import { InitialConfig } from "contexts/types/chain"
import Header from "layouts/Header"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import ThemeProvider from "theme"
import "theme/global.css"

const CONFIG: InitialConfig = {
  ethereum: {
    name: "Ethereum",
    connectors: ["injected", "walletconnect", "coinbase"],
    chainIds: [1, 42161, 80001, 31337],
  },
  binance: {
    name: "Binance",
    connectors: ["injected", "walletconnect", "coinbase"],
    chainIds: [56],
  },
  avalanche: {
    name: "Avalanche",
    connectors: ["injected", "walletconnect", "coinbase"],
    chainIds: [43114],
  },
  tron: {
    name: "Tron",
    connectors: ["tronlink"],
    chainIds: [1000000000],
  },
  default: {
    name: "default",
    connectors: ["network"],
    chainIds: [1, 42, 56, 97, 100, 80001, 31337, 43114, 42220],
  },
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <LocalStorageLoader />
      <ConnectorLoader connectorConfig={CONFIG} />
      <ThemeProvider>
        <Header />
        <ConnectorLoading>
          <Component {...pageProps} />
        </ConnectorLoading>
      </ThemeProvider>
    </Provider>
  )
}

export default App
