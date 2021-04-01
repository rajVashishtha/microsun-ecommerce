import React from 'react'
import CustomAppBar from '../../component/appbar/appbar.component'
import {Button, Input, FormControl, Grid, InputLabel, Typography, FormControlLabel, Checkbox, IconButton, Snackbar} from '@material-ui/core'
import one from '../../constants/1.svg';
import { withRouter } from 'react-router'
import { CloseOutlined } from '@material-ui/icons';
import CartObjectCard from '../../component/cartobject/cartobject.component'
import { connect } from 'react-redux';
import axios from 'axios'
import moment from 'moment';
import { BASE_URL } from '../../apis/apis';
import { setCartItem } from '../../redux/cart/cart.action';


class PaymentPage extends React.Component{
    state={
        cardNumber:"",
        checked:false,
        firstName:"",lastName:"",
        expiryDate:"",cvv:"",
        billingZipcode:"",state:"",
        city:"",country:"",address:"",
        cart:[],
        subtotal:0,
        tax:0,
        total:0,
        error:false,
        errorMessage:"Error Occured",
        paying:false
    }
    togglePaying = ()=>{this.setState({paying:!this.state.paying})}
    handleSubmit = (event)=>{
        event.preventDefault();
        // console.log(moment().valueOf())
        const {currentUser,history,setCartItem,cart} = this.props;
        let formdata = new FormData();
        formdata.append("product_id",cart.product_id)
        this.togglePaying();
        axios.post(BASE_URL+"/cart",formdata,{
            headers:{
                'authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        }).then(res=>{
            let formdata = new FormData();
            formdata.append("transaction_id",moment().valueOf());
            formdata.append("mode","online");
            formdata.append("status","SUCCESS");
            formdata.append("state",this.state.state);
            formdata.append("address",this.state.address);
            formdata.append("city",this.state.city);
            formdata.append("country",this.state.country);
            formdata.append("pin_code",this.state.billingZipcode);
            
            axios.post(BASE_URL+"/orders",formdata,{headers:{
                'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }}).then(res=>{
                setCartItem(null);
                this.togglePaying();
                if (window.confirm("Payment Successful!")) {
                    history.push("/")
                } else {
                    history.push("/")
                }
            }).catch(err=>{
                this.togglePaying();
                console.log(err)
            })

        }).catch(err=>{
            this.togglePaying();
        })
        
        
    }
    toggleError = ()=>{this.setState({error:!this.state.error})}
    handleChange = (event)=>{
        const {name, value} = event.target;
        console.log(name, value)
        this.setState({[name]:value})
    }
    handleCheckedChange = ()=>{
        this.setState({checked:!this.state.checked})
    }
    componentDidMount(){
        const { cart} = this.props;
        console.log([cart]);
        if(cart)
        this.setState({cart:[cart],total:cart.price,subtotal:cart.price});
        else{
            this.setState({cart:[],total:0,subtotal:0});
        }
    }
    render(){
        const {history} = this.props;
        let currentUser = {id:1};
        return(
            <div>
                <CustomAppBar />
                <div style={{marginTop:"50px",padding:"5px 20px"}}>
                    <form onSubmit={this.handleSubmit}>
                    <Grid container item xs={12} spacing={2} justify="space-between" direction="row">
                    <Grid item md={6} xs={12} container direction="column" spacing={3} justify="flex-end" style={{paddingLeft:"20px"}}>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{display:"inline"}} component="p" color="textSecondary">1. Email </Typography>
                                <Typography  component="p" style={{display:"inline"}} >{currentUser.email}</Typography>
                            </Grid>
                            <Grid item xs={12} container direction="column">
                                <img alt="alt" src={one}  />
                                <Typography variant="h5" color="textSecondary">2. Payment</Typography>
                                
                                <Grid item xs={12} container style={{marginTop:"20px"}} justify="space-between">
                                    <Button color="secondary" variant="outlined" style={{padding:"10px 20px"}}>
                                        Credit or debit card
                                    </Button>
                                    <Button color="secondary" variant="outlined" style={{padding:"10px 20px",width:"220px"}}>
                                        PayPal
                                    </Button>
                                </Grid>
                                <Grid item xs={12} container style={{marginTop:"20px"}} direction="row">
                                    <div style={{width:"100%"}}>
                                        
                                        <FormControl fullWidth variant="filled">
                                            <InputLabel htmlFor="card-number">Card Number</InputLabel>
                                            <Input
                                                type="number"
                                                id="card-number"
                                                value={this.state.cardNumber}
                                                name="cardNumber"
                                                onChange={this.handleChange}
                                                required
                                                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </FormControl>
                                    </div>

                                    <div style={{display:"flex",flexDirection:"row",marginTop:"20px",justifyContent:"space-between",width:"100%"}}>
                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="first-name">First Name</InputLabel>
                                                <Input
                                                    id="first-name"
                                                    name="firstName"
                                                    value={this.state.firstName}
                                                    onChange={this.handleChange}  
                                                    required                                              
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                                                <Input
                                                    id="last-name"
                                                    name="lastName"
                                                    value={this.state.lastName}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div style={{display:"flex",flexDirection:"row",marginTop:"20px",justifyContent:"space-between",width:"100%"}}>
                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="expiry-date">Expiry date</InputLabel>
                                                <Input
                                                    id="expiry-date"
                                                    value={this.state.expiryDate}
                                                    name="expiryDate"
                                                    onChange={this.handleChange}  
                                                    required                                              
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="cvv">CVV</InputLabel>
                                                <Input
                                                    id="cvv"
                                                    value={this.state.cvv}
                                                    name="cvv"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div style={{display:"flex",flexDirection:"row",marginTop:"20px",justifyContent:"space-between",width:"100%"}}>
                                        
                                        <FormControl fullWidth variant="filled">
                                            <InputLabel htmlFor="address">Address</InputLabel>
                                            <Input
                                                type="text"
                                                id="address"
                                                value={this.state.address}
                                                name="address"
                                                onChange={this.handleChange}
                                                required
                                                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </FormControl>
                                    </div>

                                    <div style={{display:"flex",flexDirection:"row",marginTop:"20px",justifyContent:"space-between",width:"100%"}}>
                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="billing-zipcode">Billing Zipcode</InputLabel>
                                                <Input
                                                    id="billing-zipcode"
                                                    name="billingZipcode"
                                                    value={this.state.billingZipcode}
                                                    onChange={this.handleChange}   
                                                    required                                             
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="state">State</InputLabel>
                                                <Input
                                                    id="state"
                                                    name="state"
                                                    value={this.state.state}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </FormControl>
                                        </div>
                                    </div>

                                    <div style={{display:"flex",flexDirection:"row",marginTop:"20px",justifyContent:"space-between",width:"100%"}}>
                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="city">City</InputLabel>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    value={this.state.city}
                                                    onChange={this.handleChange}  
                                                    required                                              
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{width:"45%"}}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="country">Country</InputLabel>
                                                <Input
                                                    id="country"
                                                    name="country"
                                                    value={this.state.country}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div style={{marginTop:"30px",padding:"5px 20px",}}>
                                        <FormControlLabel
                                            control={<Checkbox color="primary" checked={this.state.checked} onChange={this.handleCheckedChange} name="checked" />}
                                            label="By clicking Place Order, I accept the License Agreement, Auto-Renewal Policy and Privacy Notice."
                                            color="textSecondary"
                                        />
                                    </div>



                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={5} xs={12} container alignItems="space-between" direction="row" spacing={1} style={{background:"#ffefef"}} >
                        {
                            this.state.cart.length !== 0?(
                                <React.Fragment>
                                {
                                    this.state.cart.map((item,index)=>(
                                        <Grid item xs={12}>
                                            <CartObjectCard name={item.product_name} price={item.price} expiry={item.expiry} details={item.product_description} />
                                        </Grid>
                                    
                                    ))
                                }
                                    <Grid item xs={12} style={{  borderBottom:"1px solid #888888"}}>
                                        <Typography variant="h6" color="textPrimary">Subtotal : {this.state.subtotal}</Typography>
                                        <Typography style={{marginTop:"10px"}}>Tax : {this.state.tax}</Typography>
                                        <Typography variant="h6" style={{marginTop:"20px"}}>Total : {parseInt(this.state.subtotal)+parseInt(this.state.tax)}</Typography>
                                        <Button style={{marginTop:"30px",width:"99%"}} disabled={this.state.paying} color="primary" variant="outlined" type="submit">
                                        {
                                            this.state.paying?("Processing"):("Make Payment")
                                        }
                                        </Button>
                                        
                                    </Grid>
                                </React.Fragment>
                            ):(
                                <Grid item xs={12}> 
                                    <Typography align="center" variant="h5" color="textSecondary" >No item in cart</Typography>
                                    <Button onClick={()=>{
                                        history.push("/subscription")
                                    }} color="primary" style={{width:"100%",marginTop:"30px"}} variant="outlined">Add item</Button>
                                </Grid>
                            )
                        }
                        <img src={one} alt="payments_m" />
                        </Grid>
                    </Grid>
                </form>
                </div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.error}
                    autoHideDuration={6000}
                    onClose={this.toggleError}
                    message={this.state.errorMessage}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.toggleError}>
                            <CloseOutlined fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
                
            </div>
        )
    }
}

const mapStateToProps = state =>({
    cart:state.cart.cart,
    currentUser:state.user.currentUser
})

const mapDispatchToProps = dispatch =>({
    setCartItem : item => dispatch(setCartItem(item))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PaymentPage));