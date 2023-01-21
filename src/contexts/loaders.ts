import { useEffect } from "react"
import { ConnectorName } from "utils/types"
import { ChainList } from "./models/chain"
import store from "./store"
import { ColorKeys } from "./types/setting"

export function ConnectorLoader({
  configurations,
}: {
  configurations: ChainList
}) {
  useEffect(() => {
    const uniqueConnectors = Object.values(configurations).reduce(
      (acc, { connectors }) => {
        connectors.forEach((connector) => {
          if (!acc.includes(connector)) {
            acc.unshift(connector)
          }
        })
        return acc
      },
      [] as ConnectorName[]
    )

    store.dispatch.chain.UPDATE_CHAIN_LIST(configurations)
    store.dispatch.connector.initializeConnectors(uniqueConnectors)
  }, [])

  return null
}

export function LocalStorageLoader() {
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode")
    const savedColor = localStorage.getItem("themeColor")

    if (savedMode) {
      store.dispatch.setting.SET_THEME_MODE(
        savedMode as "dark" | "light" | "system"
      )
    }
    if (savedColor) {
      store.dispatch.setting.SET_THEME_COLOR(savedColor as ColorKeys)
    }
  }, [])

  return null
}
