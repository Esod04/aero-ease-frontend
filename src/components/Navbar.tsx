import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const pages = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Ruleset',
    url: '/ruleset'
  },
  {
    name: 'Flights',
    url: '/flights'
  }
];

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AeroEase
          </Typography>
          {pages.map((page) => (
            <Link to={page.url} key={page.name}>
              <Button color="inherit">{page.name}</Button>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
