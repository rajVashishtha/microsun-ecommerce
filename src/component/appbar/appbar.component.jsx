import { AppBar, IconButton, Toolbar, Typography,List,ListItem,ListItemText, Button,Menu,MenuItem ,Divider,ListItemIcon} from '@material-ui/core';
import React from 'react';
import {BookmarkBorderOutlined, CloseOutlined, ContactSupportOutlined, MenuOutlined, SecurityOutlined,MoneyOutlined} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import clsx from  'clsx';
import HttpsIcon from '@material-ui/icons/Https';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.action';

const myStyles = (theme) => ({
root:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingRight:theme.spacing(5)
},
drawerList:{
    width:"100vw",
    [theme.breakpoints.up('sm')]:{
        width:240
    }
},
listContainer :{
    display: 'flex',
    flexDirection: 'row',
    padding: 2,
    marginLeft:theme.spacing(5),
    fontWeight:"bolder",
    cursor:"pointer"
},
grow: {
    flexGrow: 1,
    flexDiection:"row",
},
menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]:{
        display:"none"
    }
},
title: {
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
},
sectionDesktop: {
    display: 'none',
    justifyContent:"center",
    alignItems:"center",
    [theme.breakpoints.up('md')]: {
    display: 'flex',
    },
},
sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
    display: 'none',
    },
},
toolbar: theme.mixins.toolbar,
})


class CustomAppBar extends React.Component{
    state={
        list:["Protection","Antivirus","VPN","About","Support","Investors" ],
        links:[null,null,null,null,"/site-support",null],
        listIcons:[<HttpsIcon />,<BlurOnIcon />,<SecurityOutlined />,<BookmarkBorderOutlined />,<ContactSupportOutlined />,<MoneyOutlined /> ],
        anchor:null,
        drawer:false
    }
    handleOpen = (event) => {
        console.log("working")
        this.setState({anchor:(event.currentTarget)})
    };
    
    handleClose = () => {
        this.setState({anchor:null})
    };
    toggleDrawer = ()=>{
        this.setState({
            drawer:!this.state.drawer
        })
    }
    logout = ()=>{
        const {setCurrentUser} = this.props;
        setCurrentUser(null);
    }
    render(){
        const {classes,theme, currentUser,history} = this.props;
        return(
            <div className={classes.grow}>
                <AppBar className={classes.root} position="sticky">
                    <Toolbar>
                            <IconButton className={classes.menuButton} onClick={this.toggleDrawer}>
                                <MenuOutlined />
                            </IconButton>
                            <Typography  variant="h6" noWrap style={{cursor:"pointer"}} onClick={()=>{
                                history.push("/")
                            }}>Ecommerce</Typography>
                            <List className={clsx(classes.listContainer, classes.title)}>
                            {
                                this.state.list.map((item,index)=><ListItem button onClick={()=>{
                                    history.push(this.state.links[index])
                                }} key={item}><ListItemText primary={<Typography style={{fontWeight:600}}>{item}</Typography>} /></ListItem>)
                            }
                            </List>
                    </Toolbar>
                    <div className={classes.sectionDesktop} >
                        <Typography style={{marginRight:"15px",cursor:"pointer"}} onClick={()=>{
                            history.push("/payment")
                        }}>My Cart</Typography>
                        {
                            currentUser?(<Button variant="outlined" onClick={this.logout} >Logout</Button>):(<Link style={{textDecoration:"none"}} to="/login"><Button variant="outlined" >LOGIN</Button></Link>)
                        } 
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-controls="login-menu" aria-haspopup="true" onClick={this.handleOpen}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="login-menu"
                            anchorEl={this.state.anchor}
                            keepMounted
                            open={Boolean(this.state.anchor)}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={()=>{
                                this.handleClose();
                                history.push("/payment");   
                            }}>My Cart</MenuItem>
                            {
                                currentUser?(<MenuItem onClick={this.logout}>Logout</MenuItem>):(<Link style={{textDecoration:"none",color:"black"}} to="/login"><MenuItem onClick={this.handleClose}>LOGIN</MenuItem></Link>)
                            }
                        </Menu>
                    </div>
                    <SwipeableDrawer
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.drawer}
                        onClose={this.toggleDrawer}
                        onOpen={this.toggleDrawer}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <div className={classes.toolbar}>
                            <div style={{
                                display:"flex",flexDirection:"row-reverse",width:"100%",
                                alignItems:"center",height:"100%"
                            }}>
                                <IconButton onClick={this.toggleDrawer}>
                                    <CloseOutlined />
                                </IconButton>
                            </div>
                        </div>
                        <Divider />
                        <List>
                        {
                            this.state.list.map((item, index)=>(
                                <ListItem button key={item} className={classes.drawerList}>
                                    <ListItemIcon>{this.state.listIcons[index]}</ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))
                        }
                        </List>
                    </SwipeableDrawer>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    currentUser:state.user.currentUser
})

const mapDispatchToProps = dispatch=>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(myStyles, {withTheme:true})(withRouter(CustomAppBar)))


