import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Skeleton from "@mui/material/Skeleton"
import { useIsInitialized } from "contexts/hooks/useChain"

interface ConnectorLoadingProps {
  children: React.ReactNode
}

const ConnectorLoading: React.FC<ConnectorLoadingProps> = ({ children }) => {
  const init = useIsInitialized()

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Box>
        {!init ? (
          <Skeleton
            width="100%"
            variant="rounded"
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
