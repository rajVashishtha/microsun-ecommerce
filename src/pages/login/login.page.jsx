import React from 'react';
import CustomAppBar from '../../component/appbar/appbar.component';
import {Grid,Typography,FormControl,Checkbox,FormControlLabel, TextField, FormLabel, Button, Snackbar, IconButton} from '@material-ui/core';
import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import {setCurrentUser} from '../../redux/user/user.action'
// import { CloseOutlined } from '@material-ui/icons';
// import {BASE_URL} from '../../constant/base_url'
import axios from 'axios';
import { CloseOutlined } from '@material-ui/icons';
import { BASE_URL } from '../../apis/apis';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.action';

class LoginPage extends React.Component{
    state={
        email:"",
        password:"",
        error:false,
        errorMessage:"",
        loading:false
    }
    handleChange = (event)=>{
        const {name,value} = event.target;
        this.setState({[name]:value})
    }
    closeError = ()=>{
        this.setState({
            error:false
        })
    }
    toggleLoading = ()=>{this.setState({loading:!this.state.loading})}
    handleSubmit = (event)=>{
        event.preventDefault();
        const url = "/user/login";
        let formdata = new FormData();
        formdata.append("email",this.state.email);
        formdata.append("password",this.state.password);
        this.toggleLoading();
        axios.post(BASE_URL+ url,formdata).then(res=>{
            const {setCurrentUser,history,location} = this.props;
            console.log(res.data.message[0])
            this.toggleLoading();
            setCurrentUser(res.data.message[0]);
            if(location.state && location.state.from){
                history.push(location.state.from);
            }else{
                history.push("/");
            }
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
            this.setState({errorMessage:message,error:true})
        })
    }
    render(){
        const {history} = this.props;
        return(
            <div> 
                <CustomAppBar />
                <Grid container spacing={2} sm={12} md={10} item xs={12} style={{marginLeft:"auto",padding:"0px 20px",marginRight:'auto',marginTop:"20px"}}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Grid container style={{background:"#fefefe"}}>
                            <Grid item style={{background:"#efefef",padding:"10px 20px",width:"100%"}}>
                                Login to McAfee
                            </Grid>
                            <Grid item style={{padding:"30px 20px",width:"100%",background:"transparent"}}>
                                <Typography>Welcome back! Login to continue</Typography>
                                <form style={{marginTop:"30px"}} onSubmit={this.handleSubmit}>
                                <FormControl style={{marginBottom:"20px"}}>
                                    <FormLabel style={{paddingBottom:"5px"}}>Email Address:</FormLabel>
                                    <TextField required name="email" value={this.state.email} onChange={this.handleChange} style={{width:"300px"}} type="email" variant="outlined" error={false} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel style={{paddingBottom:"5px"}}>Password:</FormLabel>
                                    <TextField required name="password" value={this.state.password} onChange={this.handleChange} style={{width:"300px"}} type="password" variant="outlined" error={false} />
                                </FormControl>
                                <div>
                                    <FormControlLabel
                                        value="Remember me"
                                        control={<Checkbox color="primary" />}
                                        label="Remember me"
                                        style={{color:"#787878"}}
                                        labelPlacement="end"   
                                    />
                                </div>
                                <FormControl>
                                    <Button color="primary" disabled={this.state.loading} variant="outlined" style={{width:"120px"}} type="submit">{this.state.loading?("Loading..."):("Login")}</Button>
                                </FormControl>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} style={{border:"1px solid #ababab"}}>
                        <Grid container>
                            <Grid item style={{background:"#efefef",padding:"10px 20px",width:"100%"}}>
                                Are You a new User
                            </Grid>
                            <Grid item style={{padding:"30px 10px",width:"100%",background:"transparent"}}>
                                <Typography>Don't have a McAfee account?</Typography>
                                <Typography style={{fontSize:"15px",marginTop:"20px"}}>Create one today and join the ranks of those who are protected from spam, viruses,
                                 identity theft, and other online threats!</Typography>
                                 <Button color="primary" variant="outlined" style={{marginTop:"30px"}} onClick={()=>{
                                     console.log("hello")
                                     history.push({
                                         pathname:"/signup",
                                         state:{from:"/login"}
                                     })
                                 }}>Register Now</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        open={this.error}
                        autoHideDuration={6000}
                        onClose={this.closeError}
                        message={this.state.errorMessage}
                        action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeError}>
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
    currentUser : state.user.currentUser
})

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginPage));