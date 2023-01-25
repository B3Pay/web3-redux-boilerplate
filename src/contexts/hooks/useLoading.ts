import { useSelector } from "react-redux"
import { RootState } from "../store"

export function useGlobalLoading() {
  return useLoading().global
}

export function useModelsLoading(item: keyof RootState["loading"]["models"]) {
  return useLoading().models[item]
}

export function useEffectsLoading(item: keyof RootState["loading"]["effects"]) {
  return useLoading().effects[item]
}

export function useWeb3Loading() {
  const { connection, chain } = useLoading().models
  return connection || chain
}

function useLoading() {
  return useSelector((state: RootState) => state.loading)
}

export default useLoading
