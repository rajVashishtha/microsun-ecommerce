import React from 'react';
import CustomAppBar from '../../component/appbar/appbar.component'
import {Grid, Typography,FormControl,FormLabel,TextField,Button,Snackbar, IconButton} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import { BASE_URL } from '../../apis/apis';
import axios from 'axios'
import { CloseOutlined } from '@material-ui/icons';
import {setCurrentUser} from '../../redux/user/user.action'
import { connect } from 'react-redux';

class SignUpPage extends React.Component{
    state={
        name:"",
        email:"",
        mobile:"",
        password:"",
        confirmPassword:"",
        errorMessage:"",
        error:false,
        loading:false
    }
    toggleError=()=>{
        this.setState({error:!this.state.error})
    }
    toggleLoading = ()=>{this.setState({loading:!this.state.loading})}
    handleSubmit = (event)=>{
        event.preventDefault();
        this.toggleLoading();
        const url = BASE_URL+"/user/registration";
        if(this.state.confirmPassword.trim() !== this.state.password.trim()){
            this.setState({
                errorMessage:"Passwords mismatch!"
            },()=>{this.toggleError()})
            return;
        }
        const {location,history,setCurrentUser} = this.props;
        const data={
            name:this.state.name,
            password:this.state.password,
            email:this.state.email,
            mobile:this.state.mobile
        }
        let formdata = new FormData();
        Object.keys(data).forEach(function(key,index) {
            // console.log(key,data[key]);
            formdata.append(key,data[key]);
        });
        axios.post(url,formdata).then(res=>{
            this.toggleLoading();
            setCurrentUser(res.data.data);
            if(location.state && location.state.from){

                if(location.state.from === "/payment"){
                    history.push("/payment")
                }else{
                    history.push("/product");
                }
            }
            history.push("/product")
            // console.log(res);
        }).catch(error=>{
            this.toggleLoading();
            let message="";
            if (error.response) {
                // console.log(error.response.data);
                message = error.response.data.message;
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                message=error.message;
                // console.log('Error', error.message);
            }
            this.setState({errorMessage:message},()=>{this.toggleError()})
        })
    }
    handleChange = (event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        return(
            <div>
                <CustomAppBar />
                <form onSubmit={this.handleSubmit}>
                <Grid container xs={6} style={{padding:"10px 20px" ,marginLeft:"auto",marginRight:"auto",marginTop:"20px"}}>
                    <Typography variant="h4" style={{fontWeight:100,color:"#202020"}} >Create Account</Typography>

                    <Typography style={{
                        marginTop:"30px",color:"#202020"
                    }} >If you're a new user, complete our customer profile form below (all fields are required).</Typography>

                    <Typography style={{
                        marginTop:"20px",color:"#202020"
                    }} >Once you have created an account, McAfee remembers your information to help simplify any future orders.
                     Click the I Agree button below to create your account now and to continue with your order. 
                     You will have an opportunity to review and confirm your order before your credit card is processed. 
                     <Link style={{textDecoration:"none",color:"orange"}} >Need help with your purchase?</Link></Typography>

                     <Typography style={{
                        marginTop:"20px",color:"#202020"
                    }} >If you already have an account, please<Link style={{textDecoration:"none",color:"orange"}} to="/login" > log in now</Link> to continue.</Typography>

                    <div style={{marginTop:"20px",padding:"20px 10px",borderTop:"1.5px solid #888888",borderBottom:"1.5px solid #888888",width:"100%",display:"flex",flexDirection:"column"}} id="register_form">
                        <FormControl style={{marginBottom:"20px"}}>
                            <FormLabel style={{paddingBottom:"5px"}}>Full Name:</FormLabel>
                            <TextField value={this.state.name} name="name" onChange={this.handleChange} style={{width:"300px"}} required type="text" variant="outlined" error={false} />
                        </FormControl>

                        <FormControl style={{marginBottom:"20px"}}>
                            <FormLabel style={{paddingBottom:"5px"}}>Email Address:</FormLabel>
                            <TextField value={this.state.email} name="email" onChange={this.handleChange}  style={{width:"300px"}} required type="email" variant="outlined" error={false} />
                        </FormControl>

                        <FormControl style={{marginBottom:"20px"}}>
                            <FormLabel style={{paddingBottom:"5px"}}>Email Mobile:</FormLabel>
                            <TextField value={this.state.mobile} name="mobile" onChange={this.handleChange}  style={{width:"300px"}} required type="number" variant="outlined" inputProps={{"min":0}} error={false} />
                        </FormControl>

                        <FormControl style={{marginBottom:"20px"}}>
                            <FormLabel style={{paddingBottom:"5px"}}>Password:</FormLabel>
                            <TextField value={this.state.password} name="password" onChange={this.handleChange}  style={{width:"300px"}} required type="password" variant="outlined" error={false} />
                        </FormControl>

                        <FormControl style={{marginBottom:"20px"}}>
                            <FormLabel style={{paddingBottom:"5px"}}>Confirm Password:</FormLabel>
                            <TextField value={this.state.confirmPassword} name="confirmPassword" onChange={this.handleChange}  style={{width:"300px"}} required type="password" variant="outlined" error={false} />
                        </FormControl>
                        <Typography style={{
                        marginTop:"20px",color:"#202020"
                    }} >We do not share your information with anyone without your consent. <Link style={{textDecoration:"none",color:"orange"}} to="/login" > Read our Privacy Policy</Link>.</Typography>
                    </div>
                    <Typography style={{
                        marginTop:"20px",color:"#202020"
                    }} >By clicking "I Agree" below, you are indicating that you have read and agree to the McAfee End User License Agreement</Typography>

                    <Button color="primary" variant="outlined" type="submit" disabled={this.state.loading}  style={{
                        marginTop:"20px"
                    }} >{this.state.loading?("Loading..."):("I Agree")}</Button>
                </Grid>
                </form>
                
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.error}
                    autoHideDuration={5000}
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

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})



export default connect(null,mapDispatchToProps)(withRouter(SignUpPage));