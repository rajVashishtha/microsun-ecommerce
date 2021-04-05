import React from 'react';
import CustomAppBar from '../../component/appbar/appbar.component';
import {Grid, Typography, Button} from '@material-ui/core';
import { withRouter } from 'react-router';
import background from '../../constants/background.jpg';
import div1 from '../../constants/div1.jpg';
import { Link } from 'react-router-dom';
import HomeCard from '../../component/homecard/homecard.component';
import wallpaper1 from '../../constants/wallpaper-1.jpg';
import wallpaper2 from '../../constants/wallpaper-2.jpg'
import Footer from '../../component/footer/footer.component';
import axios from 'axios';
import { BASE_URL } from '../../apis/apis';


class HomePage extends React.Component{
    state={
        results:[]
    }
    componentDidMount(){
        axios.get(BASE_URL+"/allproducts").then(res=>{
            console.log(res.data.message)
            let temp = res.data.message.map(item=>item.products);
            temp = [].concat(...temp);
            this.setState({
                results:temp.slice(0,6)
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    render(){
        const {history} = this.props;
        return (
        <div>
            <CustomAppBar />
            <div style={{
                position: "relative"
            }} >
                {/* <img src="https://picsum.photos/200/300" alt="Background" style={{
                    width:"100%",height:"auto"
                }}/> */}
                <Grid container item xs={12} justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} style={{textAlign:"center", padding:"20px 20px"}}>
                        <Grid container justify="center" alignItems="center" direction="column">
                            <Grid item style={{marginBottom:"30px"}}>
                                <Typography variant="h3" style={{paddingBottom:"10px", borderBottom:"2px solid black"}}>Protect What Matters</Typography>
                            </Grid>
                            <Grid item style={{paddingTop:"20px"}} justify="center" alignItems="center" wrap>
                                <Typography style={{width:"400px",fontSize:"20px"}} variant="body1" align="left" >McAfee® Total Protection provides antivirus,
                                 identity and privacy protection. With VPN & ID theft protection.**</Typography>
                                 <Typography variant="h4" style={{paddingTop:"20px"}}>$29.99 per year*</Typography>
                                 <Typography variant="body2" style={{paddingTop:"5px"}}>*Today pay $59.99 for a 2yr intro offer. See offer details below.</Typography>
                            </Grid>
                            <Grid item style={{marginTop:"100px"}}>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Button style={{width:"30ch", borderRadius:"20px"}} color="primary" variant="outlined" onClick={()=>{
                                            history.push("/product");
                                        }}>Buy Now</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" style={{width:"30ch", borderRadius:"20px"}} onClick={()=>{
                                            history.push("/product");
                                        }}>Pick Plan</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{position:"relative",padding:"60px 10px",backgroundColor:"rgba(0,0,0,0.1)",backgroundImage:`url(${background})`}}>
                        <Grid item xs={12}>
                            <Typography variant="h3" style={{color:"white"}} align="center">Securing the world's peace of mind</Typography>
                        </Grid>
                        <Grid item xs={12} container spacing={4} style={{marginTop:"80px"}}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h3" style={{color:"white"}} align="center">600 million+</Typography>
                                <Typography variant="h4" style={{color:"white"}} align="center">protected devices</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h3" style={{color:"white"}} align="center">67.2 Billion</Typography>
                                <Typography variant="h4" style={{color:"white"}} align="center">daily realtime thread queries</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h3" style={{color:"white"}} align="center">375 threads</Typography>
                                <Typography variant="h4" style={{color:"white"}} align="center">discovered every minute</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} style={{padding:"60px 10px"}}>   
                        <Grid item xs={12} >
                            <Typography variant="h4" color="textSecondary" align="center">Beyond antivirus - this is personal protection</Typography>
                            <Link style={{color:"#676767",textAlign:"center",display:"block",marginTop:"10px"}}>Learn more about McAfee Total Protection</Link>
                        </Grid>
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

                    {
                        this.state.results.map((item, index)=>(
                            <Grid item container xs={12} style={{marginTop:"50px"}} direction={(parseInt(index)&1)?"row-reverse":"row"}>
                                <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5} >
                                    <Grid item xs={12} md={8}>
                                        {
                                            // eslint-disable-next-line
                                            item.category_id == 1?(
                                                <Typography variant="h4">Try {item.product_name} Total Protection for free</Typography>
                                            ):(
                                                <Typography variant="h4">Try {item.product_name} storage</Typography>
                                            )
                                        }
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                    {
                                        // eslint-disable-next-line
                                        item.category_id == 1?(
                                            <Typography variant="h6">Defend yourself and your family against the latest malware, virus, ransomware and spyware threats with a full-featured 30 day trial of our flagship McAfee Total Protection.</Typography>
                                        ):(
                                            <Typography variant="h6">Try out new fast and flasgship standard flashdrive with emergency eject enabled.</Typography>
                                        )
                                    }
                                        
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        
                                        <Button color="primary" variant="contained" onClick={()=>{
                                            history.push("/product");
                                        }}>{
                                        // eslint-disable-next-line
                                        item.category_id == 1?"Get your free trail now":"Get now"}</Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <img src={item.product_photo} alt={item.product_name} style={{maxWidth:"100%",height:"auto"}} />
                                </Grid>
                            </Grid>
                        ))
                    }

                    <Grid item container xs={12} style={{marginTop:"50px"}}>
                        <Grid container item xs={12} md={8} justify="center" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4">Try McAfee Total Protection for free</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">Defend yourself and your family against the latest malware, virus, ransomware and spyware threats with a full-featured 30 day trial of our flagship McAfee Total Protection.</Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Button color="primary" variant="contained" onClick={()=>{
                                    history.push("/product");
                                }}>Get your free trail now</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={div1} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
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
                            <Grid item xs={12} md={8}>
                                <Button color="primary" variant="contained" onClick={()=>{
                                    history.push("/product");
                                }}>Get Android security</Button>
                                <Button color="primary" variant="outlined" style={{marginLeft:"10px"}} >Get IOS security</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={div1} alt="div1" style={{maxWidth:"100%",height:"auto"}} />
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} spacing={5} style={{maxHeight:"60ch",marginTop:"30px"}} justify="center" alignItems="center">
                        <Grid container item xs={6}>
                            <Grid item xs={12}>
                                <img src={wallpaper1} style={{maxWidth:"100%",height:"auto"}} alt="paper1" />
                            </Grid>
                            <Grid item xs={12} style={{backgroundColor:"#343434",marginTop:"-5px",padding:'15px 5px',height:"9ch"}}>
                                <Typography style={{color:"white"}} >New Year, New Digital You: Consumer Security Findings from McAfee’s Latest Report</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                <img src={wallpaper2} style={{maxWidth:"100%",height:"auto"}} alt="paper1" />
                            </Grid>
                            <Grid item xs={12} style={{backgroundColor:"#343434",marginTop:"-5px",padding:'15px 5px',height:"9ch"}}>
                                <Typography style={{color:"white"}}>Ten Tips for Protecting Your Personally Identifiable Information</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer />

            </div>
        </div>
        );
        }
}

export default withRouter(HomePage);