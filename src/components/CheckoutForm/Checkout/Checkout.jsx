import React, { useState,useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import AddressForm from '../AddressForm'
import {commerce} from '../../../lib/commerce'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'
const steps = ['Shipping Address', 'Payment Details']





const Checkout = ({cart, onCaptureCheckout,order,error}) => {
    const [activeStep, setActivestep] = useState(0)
    const [CheckoutToken,setCheckoutToken]=useState(null)
    const [shippingData,setShippingData]=useState({})
    const classes = useStyles()
    useEffect(()=>{
        const generateToken=async()=>{
            try{
                const token=await commerce.checkout.generateToken(cart.id,{type:'cart'})
                
                
                setCheckoutToken(token)
                


            }catch(error){

            }

        }
        generateToken()

    },[cart])
    const nextstep=()=> setActivestep((prevactiveStep)=>prevactiveStep+1)
    const backstep=()=> setActivestep((prevactiveStep)=>prevactiveStep-1)
    const next=(data)=>{
        setShippingData(data)
        nextstep()

    }

    const Form=()=>
    <>
        <div>
          {activeStep==0?<AddressForm checkoutToken={CheckoutToken} next={next}/>
          :<PaymentForm checkoutToken={CheckoutToken} nextstep={nextstep}backstep={backstep} shippingData={shippingData} onCaptureCheckout={ onCaptureCheckout}/>}

        </div>
      
     </>   

        
          

       
     
    
  
        
    
    const Confirmation=()=> <div>
       Confirmation
    </div>
        
           
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>

                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep==steps.length?<Confirmation/>:CheckoutToken && <Form/>}
                </Paper>



            </main>




        </>


    )
}

export default Checkout 