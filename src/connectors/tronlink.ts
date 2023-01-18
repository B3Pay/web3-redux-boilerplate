import { TronLink } from "@b3pay/tronlink"
import { Actions } from "@web3-react/types"

const tronlink = (actions: Actions) =>
  new TronLink({
    actions,
  })

export default tronlink
