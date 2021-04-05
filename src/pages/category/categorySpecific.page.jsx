import React from 'react'
import { withRouter } from 'react-router'
import CustomAppBar from '../../component/appbar/appbar.component'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import { BASE_URL } from '../../apis/apis'
import {Grid, Typography,Paper,CardMedia} from '@material-ui/core'
import Footer from '../../component/footer/footer.component'

class CategorySpecificPage extends React.Component{
    state={
        loading:true,
        items:[]
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get(BASE_URL+"/product/category/"+id).then(res=>{
            console.log(res);
            this.setState({
                items:[res.data.message],
                loading:false
            });
        }).catch(err=>{
            this.setState({loading:false});
            console.log("error- >",err);
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.setState({loading:true});
            axios.get(BASE_URL+"/product/category/"+this.props.match.params.id).then(res=>{
                console.log(res);
                this.setState({
                    items:[res.data.message],
                    loading:false
                });
            }).catch(err=>{
                this.setState({loading:false});
                console.log("error- >",err);
            })
        }
    }
    render(){
        const {history} = this.props;
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
                                <Typography variant="h5" color="textSecondary" >{item.category_name}</Typography>
                            </Grid>
                            <Grid item xs={12} container spacing={3}>
                            {
                                item.products.map((obj,ind)=>(
                                    <Grid item key={`${index}-${ind}`} xs={12} sm={4}>
                                        <Paper elevation={2} style={{padding:"10px 15px"}} onClick={()=>{
                                            history.push("/product/"+obj.product_id);
                                        }}>
                                            <CardMedia image={obj.photo} style={{
                                                    height: 0,
                                                    paddingTop: '56.25%', // 16:9
                                            }} title={obj.name} />
                                            <Typography variant='h6' color="textPrimary">{obj.name}</Typography>
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

export default withRouter(CategorySpecificPage);