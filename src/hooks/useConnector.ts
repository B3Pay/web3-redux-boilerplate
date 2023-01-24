import { getConnectionIsActive } from "contexts/helpers/getConnection"
import {
  useChainActiveConnectorName,
  useSelectedChain,
} from "contexts/hooks/useChain"
import {
  useConnection,
  useConnectionNameList,
} from "contexts/hooks/useConnection"
import { connectorCache } from "contexts/models/connection"
import { Web3ContextType } from "contexts/types/connection"
import { ConnectionType, ConnectorName } from "utils/types"
import { useProvider } from "./useProvider"

export const getConnector = (key: ConnectorName) => {
  return connectorCache[key] as ConnectionType
}

export const useConnectorByName = (
  key: ConnectorName
): Partial<Web3ContextType> => {
  const connector = getConnector(key)

  const states = useConnection(key)

  const provider = useProvider(key, !!states?.accounts?.length)

  const signer = provider?.getSigner()

  return { connector, signer, provider, ...states }
}

export function useActiveConnectorName() {
  const connectors = useConnectionNameList()
  const selectedChain = useSelectedChain()
  const connectorName = useChainActiveConnectorName(selectedChain)

  if (connectorName) {
    return connectorName
  }

  return connectors.find(getConnectionIsActive) as ConnectorName
}

export function useActiveConnectorNameByChainName(chain: string) {
  const connectors = useConnectionNameList()
  const connectorName = useChainActiveConnectorName(chain)

  if (connectorName) {
    return connectorName
  }

  return connectors.find(getConnectionIsActive) as ConnectorName
}

const useConnector = () => {
  const name = useActiveConnectorName()
  return useConnectorByName(name)
}

export default useConnector
