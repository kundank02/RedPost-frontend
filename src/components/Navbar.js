import {
  IconButton,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import 'react-icons/ai';
import 'react-icons/ri';
import {
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logoutUser } from '../helpers/authHelper';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';
import './Navbar.css';
import logo from '../logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState('');
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate('/login');
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search?' + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  return (
    <Stack mb={2}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack>
          <a href='/'>
          <img src={logo} alt='logo'  
            width={120}
            height={50}
          />
          </a>
        </HorizontalStack>

        {!navbarWidth && (
          <Box component='form' onSubmit={handleSubmit}>
            <div className='group'>
              <svg className='icon' aria-hidden='true' viewBox='0 0 24 24'>
                <g>
                  <path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
                </g>
              </svg>
              <input placeholder='Search' type='search' className='input' />
            </div>
          </Box>
        )}

        <HorizontalStack>
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          )}

          <IconButton component={Link} to={'/'}>
            <AiFillHome />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={'/messenger'}>
                <AiFillMessage />
              </IconButton>
              <IconButton component={Link} to={'/users/' + username}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              <Button onClick={handleLogout} color='secondary'>Logout</Button>
            </>
          ) : (
            <>
              <Button variant='text' sx={{ minWidth: 80 }} href='/signup' color='secondary'>
                Sign Up
              </Button>
              <Button variant='text' sx={{ minWidth: 65 }} href='/login' color='secondary'>
                Login
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component='form' onSubmit={handleSubmit} mt={2} color='secondary'>
          <TextField
            size='small'
            label='Search for posts...'
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
