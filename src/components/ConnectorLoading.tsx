import Container from "@mui/material/Container"
import Skeleton from "@mui/material/Skeleton"
import { Box } from "@mui/system"
import { useInitialized } from "contexts/hooks/useChain"

interface ConnectorLoadingProps {
  children: React.ReactNode
}

const ConnectorLoading: React.FC<ConnectorLoadingProps> = ({ children }) => {
  const init = useInitialized()

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Box>
        {!init ? (
          <Skeleton
            width="100%"
            height={300}
            sx={{
              transform: "none",
              marginTop: 0,
            }}
          />
        ) : (
          children
        )}
      </Box>
    </Container>
  )
}

export default ConnectorLoading
