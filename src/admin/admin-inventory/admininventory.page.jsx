import axios from "axios";
import React from "react";
import {withRouter} from 'react-router-dom'
import CustomAppBar from '../../component/appbar/appbar.component'
import { BASE_URL } from "../../apis/apis";
import {Grid, Typography,Paper, Modal, TextField,Input ,Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, CardMedia} from '@material-ui/core'
import Loader from 'react-loader-spinner'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { connect } from "react-redux";
import moment from 'moment'

class AdminInventoryPage  extends React.Component{
    state={
        items:[],
        loading:true,
        speedDail:false,
        openAddCategory:false,
        openAddProduct:false,
        categoryName:"",
        categoryDesc:"",
        submitting:false,
        productName:"",
        productDescription:"",
        productExpiry:"",
        categories:[],
        file:null
    }
    componentDidMount(){
        axios.get(BASE_URL+"/allproducts").then(res=>{
            console.log(res.data.message);
            this.setState({items:res.data.message,loading:false})
        }).catch(err=>{
            console.log(err);
            this.setState({
                loading:false
            })
        })

        axios.get(BASE_URL+"/category").then(res=>{
            this.setState({
                categories:res.data.message
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    toggleAddCategory = ()=>{
        this.setState({
            openAddCategory:!this.state.openAddCategory
        })
    }
    toggleAddProduct=()=>{this.setState({openAddProduct:!this.state.openAddProduct})};
    submitAddCategory = (event)=>{
        event.preventDefault();
        const {currentAdmin} = this.props;
        let formdata = new FormData();
        formdata.append("name",this.state.categoryName)
        formdata.append("description",this.state.categoryDesc)
        this.setState({
            submitting:true
        })
        axios.post(BASE_URL+"/category",formdata,{
            headers:{
                'authorization':`${currentAdmin.token_type} ${currentAdmin.access_token}`
            }
        }).then(res=>{
            this.setState({
                submitting:false,
                openAddCategory:false
            })
        }).catch(err=>{
            console.log(err);
            this.setState({
                submitting:false
            })
        })
    }
    handleFileChange = (event)=>{
        this.setState({
            file:event.target.value
        })
    }
    openSpeedDail = ()=>{this.setState({speedDail:true})};
    closeSpeedDail = ()=>{this.setState({speedDail:false})};
    handleChange = (event)=>{this.setState({[event.target.name]:event.target.value})};
    submitAddProduct = (event)=>{
        event.preventDefault();
        const {currentAdmin} = this.props;
        let formdata = new FormData();
        formdata.append("category_id",this.state.categoryName)
        formdata.append("name",this.state.productName);
        formdata.append("description",this.state.productDescription)
        formdata.append("expirary",moment(this.state.productExpiry).format("YY-MM"))
        formdata.append("photo",this.state.file);
        this.setState({
            submitting:true
        })
        axios.post(BASE_URL+"/product",formdata,{
            headers:{
                'authorization':`${currentAdmin.token_type} ${currentAdmin.access_token}`
            }
        }).then(res=>{
            this.setState({
                submitting:false,
                openAddProduct:false
            })
        }).catch(err=>{
            this.setState({
                submitting:false
            })
        })
    }
    render(){
        return(
            <div>
                <CustomAppBar />
                <Loader
                    type="TailSpin"
                    color="#888888"
                    height={100}
                    width={100}
                    visible={this.state.loading}
                    style={{marginTop:"20%",textAlign:"center"}}
                />
                <Grid xs={12} container item justify="center" alignItems="center" spacing={4} style={{marginTop:"20px"}}>
                {
                    this.state.items.map((item,index)=>(
                        <Grid item xs={12} md={10} container key={index} spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="textSecondary" >{item.categorie_name}</Typography>
                            </Grid>
                            <Grid item xs={12} container spacing={3}>
                            {
                                item.products.map((obj,ind)=>(
                                    <Grid item key={`${index}-${ind}`} xs={12} sm={4}>
                                        <Paper elevation={2} style={{padding:"10px 15px"}}>
                                            <CardMedia src={obj.image} />
                                            <Typography variant='h6' color="textPrimary">{obj.product_name}</Typography>
                                            <Typography color="textSecondary" style={{marginTop:"10px"}}>Description</Typography>
                                            <Typography variant="subtitle1">{obj.product_description}</Typography>
                                        </Paper>
                                    </Grid>
                                ))
                            }
                            </Grid>
                        </Grid>
                    ))
                }
                </Grid>
                <SpeedDial
                    ariaLabel="Manage Inventory"
                    icon={<SpeedDialIcon />}
                    onClose={this.closeSpeedDail}
                    onOpen={this.openSpeedDail}
                    open={this.state.speedDail}
                    direction={'up'}
                    >
                        <SpeedDialAction
                            icon={ <PlusOneIcon />}
                            tooltipTitle={"Add category"}
                            onClick={this.toggleAddCategory}
                        />
                        <SpeedDialAction
                            icon={<AddShoppingCartIcon />}
                            tooltipTitle={"Add Item"}
                            onClick={this.toggleAddProduct}
                        />
                </SpeedDial>
                <Modal
                    open={this.state.openAddCategory}
                    onClose={this.toggleAddCategory}
                    >
                    <Paper elevation={3} style={{marginTop:"10rem",padding:"10px",width:"40rem",marginLeft:"auto",marginRight:"auto"}}>
                        <form onSubmit={this.submitAddCategory}>
                        <Typography align="center" varint="h5" color="textSecondary">Add Category</Typography>
                        <Grid conatiner item xs={12} justify="center" alignItems="center" direction="column" spacing={4}>
                            <Grid item xs={6} style={{marginLeft:"auto",marginRight:"auto",marginTop:"10px"}}>
                                <TextField required fullWidth={true} type="text" value={this.state.categoryName} onChange={this.handleChange} name="categoryName" label="Category Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={6} style={{marginTop:"20px", marginLeft:"auto",marginRight:"auto"}}>
                                <TextField required fullWidth={true} value={this.state.categoryDesc} onChange={this.handleChange} name="categoryDesc" type="text" label="Category Description" variant="outlined" />
                            </Grid>
                            <Grid item xs={6} style={{marginTop:"20px", marginLeft:"auto",marginRight:"auto"}}>
                                <Button variant="outlined" disabled={this.state.submitting} fullWidth color="primary" type="submit">{
                                    this.state.submitting?("Loading..."):("Submit")
                                }</Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Paper>
                </Modal>


                <Modal
                    open={this.state.openAddProduct}
                    onClose={this.toggleAddProduct}
                    style={{outline:"none"}}
                    >
                    <Paper elevation={3} style={{marginTop:"10rem",padding:"10px",width:"40rem",marginLeft:"auto",marginRight:"auto"}}>
                        <form onSubmit={this.submitAddProduct}>
                        <Typography align="center" varint="h5" color="textSecondary">Add Product</Typography>
                        <Grid conatiner item xs={12} justify="center" alignItems="center" direction="column" spacing={4}>
                            <Grid item xs={6} style={{marginLeft:"auto",marginRight:"auto",marginTop:"10px"}}>
                                
                                <FormControl fullWidth required>
                                    <InputLabel id="select-category">Category</InputLabel>
                                    <Select
                                    labelId="select-category"
                                    id="select"
                                    name="categoryName"
                                    value={this.state.categoryName}
                                    onChange={this.handleChange}
                                    
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            this.state.categories.map((item,index)=>(
                                                <MenuItem value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                            
                                        }
                                    </Select>
                                </FormControl>


                            </Grid>
                            <Grid item xs={6} style={{marginTop:"20px", marginLeft:"auto",marginRight:"auto"}}>
                                <TextField required fullWidth={true} value={this.state.productName} onChange={this.handleChange} name="productName" type="text" label="Product Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={6} style={{marginTop:"20px", marginLeft:"auto",marginRight:"auto"}}>
                                <TextField required fullWidth={true} value={this.state.productDescription} onChange={this.handleChange} name="productDescription" type="text" label="Product Description" variant="outlined" />
                            </Grid>
                            <Grid item xs={6} style={{marginTop:"20px", marginLeft:"auto",marginRight:"auto"}}>
                                <TextField required fullWidth={true} value={this.state.productExpiry} onChange={this.handleChange} name="productExpiry" type="number" label="Product Expiry in months" variant="outlined" />
                            </Grid>
                            <Grid item xs={6} style={{marginTop:"20px", marginLeft:"auto",marginRight:"auto"}}>
                                <FormControl variant="outlined" >
                                    <Input id="file-change" type="file" onChange={this.handleFileChange} value={this.state.file} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} style={{marginTop:"20px", marginLeft:"auto",marginRight:"auto"}}>
                                <Button variant="outlined" disabled={this.state.submitting} fullWidth color="primary" type="submit">{
                                    this.state.submitting?("Loading..."):("Submit")
                                }</Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Paper>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    currentAdmin:state.user.currentUser
})


export default connect(mapStateToProps)(withRouter(AdminInventoryPage));