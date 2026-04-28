import { Container, Typography, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h6">
        <Skeleton width="60%" />
      </Typography>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} height={200} sx={{ my: 2 }} />
      ))}
    </Container>
  );
}
