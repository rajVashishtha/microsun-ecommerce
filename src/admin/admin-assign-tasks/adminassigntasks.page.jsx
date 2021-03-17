import React from 'react'
import CustomAppBar from '../../component/appbar/appbar.component'
import { withRouter } from 'react-router'
import { Grid,Table,TableCell,TableContainer,TableRow,TableHead,Paper,TableBody, Typography} from '@material-ui/core'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import {BASE_URL} from '../../apis/apis'
import { setCurrentUser } from '../../redux/user/user.action'
import { connect } from 'react-redux'

class AdminOrders extends React.Component{
    state={
        rows:[],
        filter:false,
        loading:true
    }
    componentDidMount(){
        const {currentUser} = this.props;
        axios.get(BASE_URL+"/orders",{
            headers:{
                'authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        }).then(res=>{
            console.log(res.data.data);
            this.setState({rows:res.data.data,loading:false});
        }).catch(err=>{
            if(err.response.status === 401){
                setCurrentUser(null);
            }
            console.log(err);
            this.setState({loading:false});
        })
    }
    toggleFilter = ()=>{
        this.setState({
            filter:!this.state.filter
        })
    }
    render(){
        return(
            <div>
                <CustomAppBar />
                <div>
                    <Grid container item xs={12} justify="center" alignItems="center" style={{marginTop:"30px"}} spacing={3}>
                        <Grid item xs={12} sm={10} md={10}>
                            <Typography variant="h6" align="center" color="textSecondary">Pending tasks</Typography>
                        </Grid>
                        <Grid item xs={12} sm={10} md={10}>
                            <TableContainer component={Paper}>
                                <Table style={{width:"100%"}} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Order id</TableCell>
                                        <TableCell align="right">Username</TableCell>
                                        <TableCell align="right">Product</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Date Ordered</TableCell>
                                        <TableCell align="right">Shipping Address</TableCell>
                                        <TableCell align="right">Transaction id</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.rows.map((row,index) => (
                                        <TableRow key={index}>
                                            <TableCell align="right">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.username}</TableCell>
                                            <TableCell align="right">{row.product_name}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.added_on}</TableCell>
                                            <TableCell align="right">{row.shipping_address}</TableCell>
                                            <TableCell align="right">{row.transaction_id}</TableCell>
                                            <TableCell align="right">{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                    {
                                        this.state.rows.length === 0 && !this.state.loading && (
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <div style={{padding:"20px 5px",width:"100%"}}>
                                                        <Typography color="textSecondary" align="center" variant="h6">No data</Typography>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    {
                                        this.state.loading && (
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <Loader
                                                        type="TailSpin"
                                                        color="#888888"
                                                        height={100}
                                                        width={100}
                                                        visible={this.state.loading}
                                                        style={{textAlign:"center"}}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    currentUser:state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AdminOrders));