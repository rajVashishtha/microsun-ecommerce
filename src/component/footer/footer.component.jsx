import React from 'react'
import {Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core'
import { AddOutlined } from '@material-ui/icons';
import twitter from '../../constants/twitter.png';
import facebook from '../../constants/facebook.png';
import linkedin from '../../constants/linkedin.png';
import youtube from '../../constants/youtube.png';
import blog from '../../constants/blog.png';
import { Link } from 'react-router-dom';

class Footer extends React.Component{
    render(){
        return(
            <Grid container style={{padding:"30px 15ch"}} xs={12} item  direction="column" justify="center" spacing={3} >
                <Grid item xs={12} md={8}>
                    <Typography>*Important Terms and Offer Details:</Typography>
                    <List component="ul">
                        <ListItem component="li">
                            <ListItemIcon>
                                <AddOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Subscription, Pricing, and Automatic Renewal Terms" />
                        </ListItem>
                        <ListItem component="li">
                            <ListItemIcon>
                                <AddOutlined />
                            </ListItemIcon>
                            <ListItemText primary="‡Additional Terms Specific to Identity Theft Protection" />
                        </ListItem>
                        <ListItem component="li">
                            <ListItemIcon>
                                <AddOutlined />
                            </ListItemIcon>
                            <ListItemText primary="**Free Benefits With Auto-Renewal" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item container xs={12} justify="space-between" style={{borderBottom:"1px solid #888888"}}>
                    <Grid item>
                        <Typography>For Home / For Enterprise</Typography>
                    </Grid>
                    <Grid item>
                        <img src={twitter} alt="twitter" style={{marginLeft:"5px"}} />
                         <img src={facebook} alt="facebook" style={{marginLeft:"5px"}} />
                          <img src={linkedin} alt="linkedin" style={{marginLeft:"5px"}} />
                           <img src={youtube} alt="youtube" style={{marginLeft:"5px"}} />
                            <img src={blog} alt="blog" style={{marginLeft:"5px"}} />
                    </Grid>
                </Grid>

                <Grid item container xs={12}>
                    <Grid item xs={12} md={6} container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" color="textSecondary">McAfee</Typography>
                            <Typography variant="subtitle2">
                                Corporate Headquarters
                                6220 America Center Drive
                                San Jose, CA 95002 USA
                            </Typography>
                            <div style={{marginTop:"10px"}}>
                                <Link to="/admin/login" style={{
                                    textDecoration:"none",
                                    color:"black"
                                }}><Typography variant="h6">Admin</Typography></Link>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="center" color="textSecondary">Product</Typography>
                            <div style={{marginTop:"20px",paddingLeft:"20px"}} >
                                <Typography>McAfee® Total Protection
                                    McAfee® Gamer Security
                                    McAfee® Identity Theft Protection
                                    McAfee® Safe Connect
                                    McAfee® Safe Family
                                    McAfee® Security Scan Plus
                                    McAfee® WebAdvisor
                                    McAfee® Mobile Security
                                    McAfee® Techmaster Concierge
                                    McAfee® Virus Removal Service
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={6}>
                        <Grid item x={12} md={4}>
                            <Typography variant="h6" align="center" color="textSecondary">Resources</Typography>
                            <List component="ul" style={{paddingLeft:"20px"}}>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Identity theft" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Parental control" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Malware" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Firewall" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Blogs" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Active Retails" />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item x={12} md={4}>
                            <Typography variant="h6" align="center" color="textSecondary">Support</Typography>
                            <List component="ul" style={{paddingLeft:"20px"}}>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Consumer support" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="FAQs" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Renewals" />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item x={12} md={4}>
                            <Typography variant="h6" align="center" color="textSecondary">About</Typography>
                            <List component="ul" style={{paddingLeft:"20px"}}>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="About MCafee" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Carrers" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Contact us" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Press Release" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Investors" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Privacy & Legal" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="System" />
                                </ListItem>
                                <ListItem component="li" style={{padding:"0px 5px"}}>
                                    <ListItemText primary="Requirments" />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        )
    }
}

export default Footer;