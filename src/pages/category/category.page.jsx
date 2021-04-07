import axios from "axios";
import React from "react";
import {withRouter,Link} from 'react-router-dom'
import CustomAppBar from '../../component/appbar/appbar.component'
import { BASE_URL } from "../../apis/apis";
import {Grid, Typography,Paper,CardMedia} from '@material-ui/core'
import Loader from 'react-loader-spinner'
import { connect } from "react-redux";
import Footer from "../../component/footer/footer.component";

class CategoryPage  extends React.Component{
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
        price:"",
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
    
    render(){
        const {history}  = this.props;
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
                                <Link style={{textDecoration:"none"}} to={"/category/"+item.id}><Typography variant="h5" color="textSecondary" >{item.categorie_name}</Typography></Link>
                            </Grid>
                            <Grid item xs={12} container spacing={3}>
                            {
                                item.products.slice(0,2).map((obj,ind)=>(
                                    <Grid item key={`${index}-${ind}`} xs={12} sm={4}>
                                        <Paper elevation={2} style={{padding:"10px 15px"}} onClick={()=>{
                                            history.push("/product/"+obj.product_id);
                                        }}>
                                            <CardMedia image={obj.product_photo} title={obj.product_name} style={{
                                                
                                                    height: 0,
                                                    paddingTop: '56.25%', // 16:9
                                            }} />
                                            <Typography variant='h6' color="textPrimary" style={{marginTop:"10px"}}>{obj.product_name}</Typography>
                                        </Paper>
                                    </Grid>
                                ))
                            }
                            
                            </Grid>
                        </Grid>
                    ))
                }
                </Grid>   
                <Footer />             
            </div>
        )
    }
}

const mapStateToProps = state=>({
    currentAdmin:state.user.currentUser
})


export default connect(mapStateToProps)(withRouter(CategoryPage));