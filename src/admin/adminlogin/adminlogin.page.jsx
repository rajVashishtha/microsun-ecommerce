import React from 'react'
import CustomAppBar from '../../component/appbar/appbar.component'
import {Button, Grid,IconButton,Snackbar,TextField, Typography} from '@material-ui/core'
import axios from 'axios'
import { setCurrentUser } from '../../redux/user/user.action'
import { connect } from 'react-redux'
import { BASE_URL } from '../../apis/apis'
import { CloseOutlined } from '@material-ui/icons'

class AdminLoginPage extends React.Component{
    state={
        email:"",
        password:"",
        error:false,
        errorMessage:"Error Occured",
        loading:false
    }
    componentDidMount(){
        const {currentUser, history} = this.props;
        console.log(currentUser);
        // eslint-disable-next-line
        if(currentUser && (currentUser.user_type == "1" || currentUser.user_type == true)){
            history.push("/admin/dashboard");
        }
    }
    handleChange = (event)=>{
        const {name, value} = event.target;
        this.setState({[name]:value});
    }
    toggleError = ()=>{this.setState({error:!this.state.error})}
    toggleLoading = ()=>{this.setState({loading:!this.state.loading})}
    handleSubmit = (event)=>{
        event.preventDefault();
        const {setCurrentUser,history} = this.props;
        let formdata = new FormData();
        formdata.append("email",this.state.email);
        formdata.append("password",this.state.password);
        this.toggleLoading();
        axios.post(BASE_URL+"/admin/login",formdata).then(res=>{
            setCurrentUser(res.data.message[0]);
            this.toggleLoading();
            history.push("/admin/dashboard");
            
        }).catch(error=>{
            let message="";
            if (error.response) {
                message = error.response.data.message;
            } else if (error.request) {
                console.log(error.request);
            } else {
                message=error.message;
            }
            this.setState({errorMessage:message},()=>{
                this.toggleError();
                this.toggleLoading();
            })
        })
    }
    render(){
        return(
            <div>
                <CustomAppBar />
                <div>
                    <form style={{width:"100%",marginTop:"30px"}} onSubmit={this.handleSubmit}>
                        <Grid container item xs={12} justify="center" alignItems="center" direction="column" >
                            <Grid item container md={4} sm={6} xs={12} justify="center" alignItems="center" style={{marginBottom:"20px"}}>
                                <Typography variant="h5" color="textSecondary">Admin login</Typography>
                            </Grid>
                            <Grid item container md={4} sm={6} xs={12} spacing={4} justify="center" alignItems="center">
                                <Grid item xs={12}>
                                    <Typography color="textSecondary">Enter Email :</Typography>
                                    <TextField style={{marginTop:"10px"}} fullWidth variant="outlined" onChange={this.handleChange} label="Email" type="email" required value={this.state.email} name="email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color="textSecondary">Enter password :</Typography>
                                    <TextField style={{marginTop:"10px"}} fullWidth variant="outlined" onChange={this.handleChange} label="Password" type="password" required value={this.state.password} name="password" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" disabled={this.state.loading}>{this.state.loading?"Loading...":"Login"}</Button>
                                </Grid>
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
const mapStateToProps = (state)=>({
    currentUser : state.user.currentUser
})
const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(AdminLoginPage);