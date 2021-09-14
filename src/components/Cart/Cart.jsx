import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import makeStyles from './styles'
import CartItem from './CarItem/CartItem';
import {Link} from 'react-router-dom'


const Cart = ({ cart, handleUpdate, handleRemovefromcart, handleEmptyCar }) => {
    const classes = makeStyles()


    const EmptyCart = () => (
        <Typography variant="subtitle1">You have to atleast add a single particular item
            <Link to="/" className={classes.link}>
                start adding some items
            </Link>
        </Typography>

    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid items xs={12} sm={4} keys={item.id}>
                        <CartItem item={item}
                            onhandleUpdate={handleUpdate}
                            onhandleRemovefromcart={handleRemovefromcart}>

                        </CartItem>
                    </Grid>


                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCar}>Empty cart</Button>
                    <Button component={Link} to="/checkout" to className={classes.checkoutButton} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>

        </>

    )

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4" gutterBottom >Your shopping cart</Typography>

            {!cart.total_items == 0 ? <FilledCart /> : <EmptyCart />}
        </Container>
    )
}

export default Cart

// const Cart = ({cart}) => {
//     return (
//         <div>

//             {console.log(cart)}


//         </div>
//     )
// }

// export default Cart
