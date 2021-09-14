import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import logo from '../../assets/react.png'
import { Link } from 'react-router-dom'


const Navbar = ({ totalItems }) => {

  const classes = useStyles()
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h5" className={classes.title} color="inherit">
            <Link to="/" className={classes.link}>
              <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> 
           </Link>
           Commerce
          </Typography>
          <div className={classes.grow} />

          <div className={classes.button} >
            <Link to="./cart" className={classes.link}>
              <IconButton aria-label="Show cart items" color="inherit">



                <Badge badgeContent={totalItems} color="secondary" >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
          </div>

        </Toolbar>
      </AppBar>

    </>
  )
}

export default Navbar
