import Header from "layouts/Header"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import ThemeProvider from "Theme"
import store from "../contexts/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
