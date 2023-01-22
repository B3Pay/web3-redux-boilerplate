import { getIsActive } from "contexts/functions/getConnector"
import {
  useChainActiveConnectorName,
  useSelectedChainName,
} from "contexts/hooks/useChain"
import {
  useAllConnectorNamesArray,
  useConnectorStates,
} from "contexts/hooks/useConnector"
import { connectorCache } from "contexts/models/connector"
import { Web3ContextType } from "contexts/types/connector"
import { ConnectorName, ConnectorType } from "utils/types"
import { useProvider } from "./useProvider"

export const getConnector = (key: ConnectorName) => {
  return connectorCache[key] as ConnectorType
}

export const useConnectorByName = (
  key: ConnectorName
): Partial<Web3ContextType> => {
  const connector = getConnector(key)

  const states = useConnectorStates(key)

  const provider = useProvider(key, !!states?.accounts?.length)

  const signer = provider?.getSigner()

  return { connector, signer, provider, ...states }
}

export function useActiveConnectorName() {
  const connectors = useAllConnectorNamesArray()
  const selectedChain = useSelectedChainName()
  const connectorName = useChainActiveConnectorName(selectedChain)

  if (connectorName) {
    return connectorName
  }

  return connectors.find(getIsActive) as ConnectorName
}

export function useActiveConnectorNameByChainName(chainName: string) {
  const connectors = useAllConnectorNamesArray()
  const connectorName = useChainActiveConnectorName(chainName)

  if (connectorName) {
    return connectorName
  }

  return connectors.find(getIsActive) as ConnectorName
}

const useConnector = () => {
  const name = useActiveConnectorName()
  return useConnectorByName(name)
}

export default useConnector
