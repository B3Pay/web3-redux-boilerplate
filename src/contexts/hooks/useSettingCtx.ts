import { RootState } from "contexts/store"
import { useSelector } from "react-redux"

export default function useSetting() {
  return useSelector((state: RootState) => state.setting)
}

export function useConnectModal() {
  return useSelector((state: RootState) => state.setting.connectModal)
}
