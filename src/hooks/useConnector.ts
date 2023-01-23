import { getConnectionIsActive } from "contexts/functions/getConnection"
import {
  useChainActiveConnectorName,
  useSelectedChainOrder,
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
  const selectedChain = useSelectedChainOrder()
  const connectorName = useChainActiveConnectorName(selectedChain)

  if (connectorName) {
    return connectorName
  }

  return connectors.find(getConnectionIsActive) as ConnectorName
}

export function useActiveConnectorNameByChainName(chainName: string) {
  const connectors = useConnectionNameList()
  const connectorName = useChainActiveConnectorName(chainName)

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
