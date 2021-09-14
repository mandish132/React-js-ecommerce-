import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../../lib/commerce'
import FormInput from './CustomTextField'
import {Link} from 'react-router-dom'
const AddressForm = ({ checkoutToken,next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm()
    const country = Object.entries(shippingCountries).map(([labeled, names]) => ({ id: labeled, label: names }))
    const divisions = Object.entries(shippingSubdivisions).map(([labeled, names]) => ({ id: labeled, label: names }))
    const options = shippingOptions.map((so) => ({ id: so.id, label: `${so.description}-(${so.price.formatted_with_symbol})` }))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
       


    }
    const fetchSubdivisions = async (countrycode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countrycode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])

    }

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    
        setShippingOptions(options);
        setShippingOption(options[0].id);
        console.log(options)
      };
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)


    }, [])
    useEffect(() => {
        { shippingCountry && fetchSubdivisions(shippingCountry) }


    }, [shippingCountry])
    useEffect(() => {
        shippingSubdivision && fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)

    }, [shippingSubdivision])


  
    return (
        <div>
            <Typography variant="h6" gutterBottom>Shipping Adress</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput  name='firstName' label='First name' />
                        <FormInput  name="lastName" label="Last name" />
                        <FormInput  name="address1" label="Address line 1" />
                        <FormInput  name="email" label="Email" />
                        <FormInput  name="city" label="City" />
                        <FormInput  name="zip" label="Zip / Postal code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {country.map(mapped => (
                                    <MenuItem key={mapped.id} value={mapped.id}>
                                        {mapped.label}
                                    </MenuItem>


                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Divisions</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {divisions.map(mapped => (
                                    <MenuItem key={mapped.id} value={mapped.id}>
                                        {mapped.label}
                                    </MenuItem>


                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>


                                ))}

                            </Select>
                        </Grid>


                    </Grid>
                    <br/>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Button component={Link} to='/cart' variant="outlined" >Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary" >Next</Button>
                    </div>


                </form>

            </FormProvider>
        </div>
    )
}

export default AddressForm
