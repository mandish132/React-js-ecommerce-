
import React,{useState,useEffect} from 'react'

import {Cart,Navbar,Products,Checkout} from './components'
import {commerce} from './lib/commerce'
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom'

const App=()=>{
    const [products, setProducts] = useState([])
    const [cart,setCart]=useState({})
    const [order,setOrder]=useState({})
    const [errorMesssade,setErrorMessage]=useState('')

    const fetchProducts=async()=>{
        const {data}=await commerce.products.list()
        setProducts(data)
       

    }
    const fetchCart=async()=>{
        setCart(await commerce.cart.retrieve())
        
    }
    const handleAddToCart=async(productId,quantity)=>{
        const response=await commerce.cart.add(productId,quantity)
        setCart(response.cart)
   }
    const handleUpdate=async(productId,quantity)=>{
        const {cart}=await commerce.cart.update(productId,{quantity})
        setCart(cart)
    }
    const handleRemovefromcart=async(productId)=>{
        const {cart}=await commerce.cart.remove(productId)
        setCart(cart)
    }
    const handleEmptyCart=async()=>{
        const {cart}=await commerce.cart.empty()
        setCart(cart)
    }
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
      };
    const handleCheckout=async(checkoutTokenId,newOrder)=>{

        try{
            const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder)
            setOrder(incomingOrder)
            refreshCart()
            console.log("confirmed")
            

        }catch(error){
            setErrorMessage(error.data.error.message)
            refreshCart()

        }
        console.log(checkoutTokenId)
        const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder)
        console.log(incomingOrder)
         
    }

    useEffect(()=>{
        fetchProducts()
        fetchCart()
       
         },[])
    
  
    return (
        
  
        <Router>
            <div>
                
            <Navbar totalItems={cart.total_items}></Navbar>
            <Switch>
                <Route exact path ='/'>
                    <Products products={products} onAddToCart={handleAddToCart}></Products>

                </Route>
                
                <Route exact path="/cart">
                    <Cart cart={cart} 
                        handleUpdate={handleUpdate}
                        handleRemovefromcart={handleRemovefromcart}
                        handleEmptyCar={handleEmptyCart}

                    
                    
                    ></Cart>
                </Route>
           
                    <Route exact path="/checkout">
                        <Checkout cart={cart} 
                        order={order}
                        onCaptureCheckout={handleCheckout}
                        error={errorMesssade}></Checkout>

                    </Route>

               
               
            </Switch>
            
            </div>
        </Router>
    )
}
export default App