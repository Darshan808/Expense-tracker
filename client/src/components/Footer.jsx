import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Footer() {
  return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 5,
          backgroundColor: '#1976d2',
          color: '#fff'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h6">
            Expense tracker
          </Typography>
          <Typography variant="subtitle1">
            An expense tracking app for your day-to-day life.
          </Typography>
        </Container>
      </Box>
  );
}