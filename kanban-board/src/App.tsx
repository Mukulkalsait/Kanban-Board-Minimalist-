import { CssBaseline, Container, Typography } from '@mui/material'; //G: only CssBaseline, Container, Typography out of all mui.

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Typography variant="h4" gutterBottom>
          Kanban Board
        </Typography>
      </Container>
    </>
  );
}
