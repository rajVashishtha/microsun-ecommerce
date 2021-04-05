import React from 'react'
import CustomAppBar from '../../component/appbar/appbar.component'
import {Button, FormControl, Grid,InputLabel,MenuItem,Select,Typography} from '@material-ui/core';
import s_1 from '../../constants/1.svg'
import product_page_1 from '../../constants/product_page.webp'
import p_p_2 from '../../constants/p_p_2.png'
import p_p_3 from '../../constants/p_p_3.png'
import p_p_4 from '../../constants/p_p_4.png'
import p_p_5 from '../../constants/p_p_5.webp'
import p_p_6 from '../../constants/p_p_6.webp'
import p_p_7 from '../../constants/p_p_7.webp'
import p_p_8 from '../../constants/p_p_8.webp'
import p_p_9 from '../../constants/p_p_9.webp'
import p_p_10 from '../../constants/p_p_10.webp'
import HomeCard from '../../component/homecard/homecard.component';
import Footer from '../../component/footer/footer.component';
import axios from 'axios';
import {BASE_URL} from '../../apis/apis';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {setCartItem} from '../../redux/cart/cart.action'

class ProductPage extends React.Component{
    state = {
        product:null,
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get(BASE_URL+"/product/"+id).then(res=>{
            console.log(res.data);
            this.setState({
                product:res.data.message[0]
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    handleProductChange = (event)=>{
        const {setCartItem} = this.props;
        this.setState({price:event.target.value.price});
        setCartItem(event.target.value);
    }
    render(){
        const {history} = this.props;
        return(
            <div>
                <CustomAppBar />
                <div style={{marginTop:"20px"}}>
                    <Grid container item xs={12} direction="row">
                        <Grid item xs={12} md={5} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            padding:"10px 10px"
                        }}>
                            <img src={this.state.product?this.state.product.photo:null} alt={this.state.product?this.state.product.name:""} style={{
                                flexShrink: 0,
                                minWidth: "100%",
                                minHeight: "100%"
                            }} />
                        </Grid>
                        <Grid container item xs={12} md={6} spacing={2} style={{marginLeft:"100px"}}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h5" color="textSecondary">{this.state.product? this.state.product.name:""}</Typography>
                                
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h3" color="textSecondary">${this.state.product ? this.state.product.price:0} | per month</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Button color="primary" style={{padding:"10px 30px"}} variant="contained" onClick={()=>{
                                    history.push("/payment");
                                }}>
                                    Buy Now
                                </Button>
                                <Typography style={{marginTop:"5px"}} color="textSecondary">*See offer details below.</Typography>
                                <Typography color="textSecondary">Windows® | macOS® | Android™ | iOS®</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <img src={s_1} alt="1" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} style={{marginTop:"50px"}}>
                        <Grid container item xs={6} spacing={6} style={{paddingLeft:"140px"}}>
                            <Grid item >
                                <Typography variant="h4" color="textSecondary">
                                    Description
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">
                                    {this.state.product?this.state.product.description:"No Description"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} style={{paddingLeft:"30px"}}>
                            <img src={product_page_1} alt="product_page_1" />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} justify="center" alignItems="center" style={{marginTop:"50px"}}>
                        <Grid container item xs={10} direction="row" spacing={3}>
                            <Grid item xs={12} md={4}>
                                <img src={p_p_2} alt="p_p_2" style={{display:'block',marginLeft:"auto",marginRight:"auto"}} />
                                <Typography variant="h5" color="textSecondary" align="center" style={{marginTop:"20px",lineHeight:"2rem"}}>Protect your finances & personal info from potential fraud</Typography>
                                <Typography variant="body2" style={{marginTop:"40px"}}>Our multi-layered identity protection helps secure your accounts by alerting you if your info gets leaked online** and generating & storing complex passwords automatically</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <img src={p_p_3} alt="p_p_3" style={{display:'block',marginLeft:"auto",marginRight:"auto"}} />
                                
                                <Typography variant="h5" color="textSecondary" align="center" style={{marginTop:"20px",lineHeight:"2rem"}}>Bank, shop, and browse worry-free on Wi-Fi</Typography>
                                <Typography variant="body2" style={{marginTop:"40px"}}>Keep your credit card and personal info safe from prying eyes everywhere you go by turning unsecured networks into your own private connection with our secure VPN.**</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <img src={p_p_4} alt="p_p_4" style={{display:'block',marginLeft:"auto",marginRight:"auto"}} />
                                <Typography variant="h5" color="textSecondary" align="center" style={{marginTop:"20px",lineHeight:"2rem"}}>Click with confidence knowing which sites you can trust</Typography>
                                <Typography variant="body2" style={{marginTop:"40px"}}>Color-coded links expose dangerous and fraudulent sites on search results and social media pages—we’ll even steer you back to safety if you misclick.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} style={{marginTop:"50px"}}>
                        <Typography variant="h4" style={{marginLeft:'auto',marginRight:'auto'}} color="textSecondary" align="center">Find out which plan is right for you:</Typography>
                    </Grid>

                    <Grid item container xs={12} style={{padding:"10px 10px"}}>
                        <Grid item container spacing={4} xs={12} style={{marginTop:"40px"}} justify="center">
                            <Grid item xs={12} md={3} sm={6}>
                                <HomeCard name="Single Device" desc="1 Device / 2-Year Subscription Today pay $49.99 for a 2 yr. subscription*" price="24.99" />
                            </Grid>
                            <Grid item xs={12} md={3} sm={6}>
                                <HomeCard name="Individual" desc="Up to 5 Devices / 2-Year Subscription Today pay $59.99 for a 2 yr. subscription" price="29.99" />
                            </Grid>
                            <Grid item xs={12} md={3} sm={6}>
                                <HomeCard name="Family" desc="10 Device / 2-Year Subscription Today pay $59.99 for a 2 yr. subscription*" price="49.99" />
                            </Grid>
                            <Grid item xs={12} md={3} sm={6}>
                                <HomeCard name="Family" desc="10 Device / 1-Year Subscription Today pay $39.99 for a 2 yr. subscription*" price="34.99" />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} style={{marginTop:"50px"}} direction="row-reverse">
                        <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4">Protect your mobile life with Android and iOS security</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">These days much of your digital life is lived on your iPhone or Android phone. McAfee® Mobile Security provides malware and web protection and device security that helps you stay safe, particularly on-the-go.</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={p_p_5} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} style={{marginTop:"50px"}} direction="row">
                        <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4">Protect your mobile life with Android and iOS security</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">These days much of your digital life is lived on your iPhone or Android phone. McAfee® Mobile Security provides malware and web protection and device security that helps you stay safe, particularly on-the-go.</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={p_p_6} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} style={{marginTop:"50px"}} direction="row-reverse">
                        <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4">Protect your mobile life with Android and iOS security</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">These days much of your digital life is lived on your iPhone or Android phone. McAfee® Mobile Security provides malware and web protection and device security that helps you stay safe, particularly on-the-go.</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={p_p_7} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
                        </Grid>
                    </Grid>



                    <Grid item container xs={12} style={{marginTop:"50px"}} direction="row">
                        <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4">Protect your mobile life with Android and iOS security</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">These days much of your digital life is lived on your iPhone or Android phone. McAfee® Mobile Security provides malware and web protection and device security that helps you stay safe, particularly on-the-go.</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={p_p_8} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
                        </Grid>
                    </Grid>



                    <Grid item container xs={12} style={{marginTop:"50px"}} direction="row-reverse">
                        <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4">Protect your mobile life with Android and iOS security</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">These days much of your digital life is lived on your iPhone or Android phone. McAfee® Mobile Security provides malware and web protection and device security that helps you stay safe, particularly on-the-go.</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={p_p_9} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
                        </Grid>
                    </Grid>



                    <Grid item container xs={12} style={{marginTop:"50px"}} direction="row">
                        <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4">Protect your mobile life with Android and iOS security</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">These days much of your digital life is lived on your iPhone or Android phone. McAfee® Mobile Security provides malware and web protection and device security that helps you stay safe, particularly on-the-go.</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={p_p_10} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
                        </Grid>
                    </Grid>

                <hr style={{marginTop:"40px"}} />
                <Footer />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    setCartItem : item =>dispatch(setCartItem(item))
})

export default connect(null,mapDispatchToProps)(withRouter(ProductPage));