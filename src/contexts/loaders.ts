import { useEffect } from "react"
import { ConnectorName } from "utils/types"
import store from "./store"
import { ChainConfig, InitialConfig } from "./types/chain"
import { ColorKeys, ThemeMode } from "./types/setting"

type ConnectorLoaderProps = {
  connectorConfig: InitialConfig
}

export function ConnectorLoader({ connectorConfig }: ConnectorLoaderProps) {
  useEffect(() => {
    const uniqueConnectors = Object.values(connectorConfig).reduce(
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

    const config = Object.entries(connectorConfig).reduce(
      (acc, [key, value]) => {
        if (!value?.chainIds?.length) {
          throw new Error(`chainIds is empty in ${key}`)
        }
        if (!value?.connectors?.length) {
          throw new Error(`connectors is empty in ${key}`)
        }
        if (
          value?.connectors.some(
            (connector) => !uniqueConnectors.includes(connector)
          )
        ) {
          throw new Error(`connectors is invalid in ${key}`)
        }

        acc[key] = {
          key,
          ...value,
        }
        return acc
      },
      {} as ChainConfig
    )

    store.dispatch.chain.ADD_CONFIG(config)
    store.dispatch.connection.initializeConnectors(uniqueConnectors)
  }, [])

  return null
}

export function LocalStorageLoader() {
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode")
    const savedColor = localStorage.getItem("themeColor")

    if (savedMode) {
      store.dispatch.setting.SET_THEME_MODE(savedMode as ThemeMode)
    }
    if (savedColor) {
      store.dispatch.setting.SET_THEME_COLOR(savedColor as ColorKeys)
    }
  }, [])

  return null
}
