import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Chip } from '@mui/material'

export default function Layout({user,logout}) {
    const {pathname} = useLocation();
  return (
    <>
       <div className='menu'>
        <div>
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Link to="/"><Button variant={pathname == "/" ? "outlined":"contained"}>Messages</Button></Link> 
            <Link to="/users"><Button variant={pathname == "/users" ? "outlined":"contained"}>Users</Button></Link> 
            <Link to="/about"><Button variant={pathname == "/about" ? "outlined":"contained"}>About</Button></Link> 
        </ButtonGroup>
        </div>
        <div className='login'>
            {user ? 
            <>
            <Chip label={user.email} variant="outlined" />
              <Button  variant='contained' onClick={logout}>Logout</Button>
            </> 
        :<Link to="/login"><Button variant={pathname == "/login" ? "outlined":"contained"}>Login</Button></Link> 
        }
        </div>
       </div>
      <div className='page'>
          <Outlet/>
      </div>
    </>
  )
}
